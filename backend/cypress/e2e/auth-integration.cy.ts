describe('Authentication Integration Tests', () => {
  beforeEach(() => {
    cy.clearAuthData()
  })

  describe('User Registration Flow', () => {
    it('should register a new user with valid data using custom commands', () => {
      cy.generateTestUser().then((user) => {
        cy.register(user.pseudo, user.email, user.password)
        
        // Verify successful registration (adjust based on your app's behavior)
        cy.url().should('not.contain', '/auth')
      })
    })

    it('should use fixture data for registration tests', () => {
      cy.fixture('users').then((users) => {
        const user = users.validUser
        const timestamp = Date.now()
        
        // Make email unique to avoid conflicts
        const uniqueEmail = `${timestamp}_${user.email}`
        const uniquePseudo = `${timestamp}_${user.pseudo}`
        
        cy.register(uniquePseudo, uniqueEmail, user.password)
        cy.url().should('not.contain', '/auth')
      })
    })

    it('should handle invalid registration data from fixtures', () => {
      cy.fixture('users').then((users) => {
        cy.visitAuth()
        cy.contains('Inscrivez-vous').click()
        
        const invalidUser = users.invalidUsers.shortPseudo
        
        cy.get('input[placeholder="Choisissez votre pseudo"]').type(invalidUser.pseudo)
        cy.get('input[placeholder="votre@email.com"]').type(invalidUser.email)
        cy.get('input[placeholder="Minimum 6 caractères"]').type(invalidUser.password)
        
        // Try to submit
        cy.get('button[type="submit"]').click()
        
        // Should show validation error
        cy.contains('Le pseudo doit contenir au moins 3 caractères').should('be.visible')
      })
    })
  })

  describe('User Login Flow', () => {
    it('should login with existing user credentials using custom commands', () => {
      // First register a user
      cy.generateTestUser().then((user) => {
        cy.register(user.pseudo, user.email, user.password)
        
        // Then logout and login again
        cy.logout()
        cy.login(user.email, user.password)
        
        // Verify successful login
        cy.url().should('not.contain', '/auth')
      })
    })

    it('should handle login with invalid credentials', () => {
      cy.fixture('users').then((users) => {
        const user = users.validUser
        
        cy.visitAuth()
        cy.get('input[placeholder="votre@email.com"]').type('nonexistent@example.com')
        cy.get('input[placeholder="Votre mot de passe"]').type(user.password)
        cy.get('button[type="submit"]').click()
        
        // Should show error message
        cy.get('[class*="bg-red-500"]').should('be.visible')
      })
    })
  })

  describe('End-to-End Authentication Scenarios', () => {
    it('should complete full registration and login cycle', () => {
      cy.generateTestUser().then((user) => {
        // Step 1: Register new user
        cy.register(user.pseudo, user.email, user.password)
        
        // Step 2: Logout
        cy.logout()
        
        // Step 3: Login with same credentials
        cy.login(user.email, user.password)
        
        // Step 4: Verify we're logged in
        cy.url().should('not.contain', '/auth')
      })
    })

    it('should handle multiple user registrations', () => {
      // Register first user
      cy.generateTestUser().then((user1) => {
        cy.register(user1.pseudo, user1.email, user1.password)
        cy.logout()
        
        // Register second user
        cy.generateTestUser().then((user2) => {
          cy.register(user2.pseudo, user2.email, user2.password)
          cy.logout()
          
          // Login with first user
          cy.login(user1.email, user1.password)
          cy.url().should('not.contain', '/auth')
        })
      })
    })

    it('should prevent registration with duplicate email', () => {
      cy.generateTestUser().then((user) => {
        // Register first user
        cy.register(user.pseudo, user.email, user.password)
        cy.logout()
        
        // Try to register with same email but different pseudo
        cy.visitAuth()
        cy.contains('Inscrivez-vous').click()
        
        cy.get('input[placeholder="Choisissez votre pseudo"]').type(`different_${user.pseudo}`)
        cy.get('input[placeholder="votre@email.com"]').type(user.email)
        cy.get('input[placeholder="Minimum 6 caractères"]').type(user.password)
        cy.get('button[type="submit"]').click()
        
        // Should show error for duplicate email
        cy.get('[class*="bg-red-500"]').should('be.visible')
      })
    })
  })

  describe('Form Persistence and State', () => {
    it('should maintain form state during validation errors', () => {
      cy.fixture('users').then((users) => {
        const invalidUser = users.invalidUsers.invalidEmail
        
        cy.visitAuth()
        cy.contains('Inscrivez-vous').click()
        
        // Fill form with invalid email
        cy.get('input[placeholder="Choisissez votre pseudo"]').type(invalidUser.pseudo)
        cy.get('input[placeholder="votre@email.com"]').type(invalidUser.email)
        cy.get('input[placeholder="Minimum 6 caractères"]').type(invalidUser.password)
        
        // Submit to trigger validation
        cy.get('input[placeholder="Votre mot de passe"], input[placeholder="Minimum 6 caractères"]').click()
        
        // Check that other fields maintain their values
        cy.get('input[placeholder="Choisissez votre pseudo"]').should('have.value', invalidUser.pseudo)
        cy.get('input[placeholder="Minimum 6 caractères"]').should('have.value', invalidUser.password)
        
        // But invalid email should show error
        cy.contains('Format d\'email invalide').should('be.visible')
      })
    })

    it('should clear sensitive data on logout', () => {
      cy.generateTestUser().then((user) => {
        cy.register(user.pseudo, user.email, user.password)
        cy.logout()
        
        // Check that form fields are empty
        cy.get('input[placeholder="votre@email.com"]').should('have.value', '')
        cy.get('input[placeholder="Votre mot de passe"]').should('have.value', '')
      })
    })
  })

  describe('Responsive Design and Mobile Testing', () => {
    it('should work on mobile viewport', () => {
      cy.viewport('iphone-x')
      
      cy.generateTestUser().then((user) => {
        cy.register(user.pseudo, user.email, user.password)
        cy.url().should('not.contain', '/auth')
      })
    })

    it('should work on tablet viewport', () => {
      cy.viewport('ipad-2')
      
      cy.fixture('users').then((users) => {
        const user = users.validUser
        const timestamp = Date.now()
        
        cy.register(`${timestamp}_${user.pseudo}`, `${timestamp}_${user.email}`, user.password)
        cy.url().should('not.contain', '/auth')
      })
    })
  })
})