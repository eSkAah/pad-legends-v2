describe('Authentication E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('User Registration', () => {
    it('should successfully register a new user', () => {
      // Ensure we're on the registration form
      cy.contains('Inscrivez-vous').click()
      
      // Fill in registration form
      cy.get('input[placeholder="Choisissez votre pseudo"]').type('testuser123')
      cy.get('input[placeholder="votre@email.com"]').type('testuser@example.com')
      cy.get('input[placeholder="Minimum 6 caractères"]').type('Test123!')
      
      // Submit form
      cy.get('button[type="submit"]').should('contain', 'Créer mon compte').click()
      
      // Verify loading state
      cy.get('button[type="submit"]').should('contain', 'Création...')
      
      // Should redirect or show success (depending on implementation)
      cy.url().should('not.contain', '/auth')
    })

    it('should show validation errors for invalid registration data', () => {
      cy.contains('Inscrivez-vous').click()
      
      // Try to submit empty form
      cy.get('button[type="submit"]').click()
      
      // Check for validation errors
      cy.contains('Le pseudo doit contenir au moins 3 caractères').should('be.visible')
      cy.contains('L\'email est requis').should('be.visible')
      cy.contains('Le mot de passe doit contenir au moins 6 caractères').should('be.visible')
    })

    it('should validate pseudo format', () => {
      cy.contains('Inscrivez-vous').click()
      
      // Test invalid pseudo
      cy.get('input[placeholder="Choisissez votre pseudo"]').type('a!')
      cy.get('input[placeholder="votre@email.com"]').click()
      
      cy.contains('Le pseudo ne peut contenir que des lettres, chiffres, tirets et underscores')
        .should('be.visible')
    })

    it('should validate email format', () => {
      cy.contains('Inscrivez-vous').click()
      
      // Test invalid email
      cy.get('input[placeholder="votre@email.com"]').type('invalid-email')
      cy.get('input[placeholder="Minimum 6 caractères"]').click()
      
      cy.contains('Format d\'email invalide').should('be.visible')
    })

    it('should validate password strength', () => {
      cy.contains('Inscrivez-vous').click()
      
      // Test weak password
      cy.get('input[placeholder="Minimum 6 caractères"]').type('123456')
      cy.get('input[placeholder="votre@email.com"]').click()
      
      cy.contains('Le mot de passe doit contenir au moins 2 des éléments suivants')
        .should('be.visible')
    })

    it('should toggle password visibility', () => {
      cy.contains('Inscrivez-vous').click()
      
      // Password should be hidden by default
      cy.get('input[placeholder="Minimum 6 caractères"]').should('have.attr', 'type', 'password')
      
      // Click eye icon to show password
      cy.get('[data-testid="password-toggle"], .input-icon-right').click()
      cy.get('input[placeholder="Minimum 6 caractères"]').should('have.attr', 'type', 'text')
      
      // Click eye icon to hide password
      cy.get('[data-testid="password-toggle"], .input-icon-right').click()
      cy.get('input[placeholder="Minimum 6 caractères"]').should('have.attr', 'type', 'password')
    })
  })

  describe('User Login', () => {
    it('should successfully login with valid credentials', () => {
      // Ensure we're on the login form (default)
      cy.contains('Se connecter').should('be.visible')
      
      // Fill in login form
      cy.get('input[placeholder="votre@email.com"]').type('test@example.com')
      cy.get('input[placeholder="Votre mot de passe"]').type('Test123!')
      
      // Submit form
      cy.get('button[type="submit"]').should('contain', 'Se connecter').click()
      
      // Verify loading state
      cy.get('button[type="submit"]').should('contain', 'Connexion...')
      
      // Should redirect or show success (depending on implementation)
      cy.url().should('not.contain', '/auth')
    })

    it('should show validation errors for empty login form', () => {
      // Try to submit empty form
      cy.get('button[type="submit"]').click()
      
      // Check for validation errors
      cy.contains('L\'email est requis').should('be.visible')
      cy.contains('Le mot de passe est requis').should('be.visible')
    })

    it('should validate email format in login', () => {
      // Test invalid email
      cy.get('input[placeholder="votre@email.com"]').type('invalid-email')
      cy.get('input[placeholder="Votre mot de passe"]').click()
      
      cy.contains('Format d\'email invalide').should('be.visible')
    })

    it('should show error for invalid credentials', () => {
      // Fill in form with invalid credentials
      cy.get('input[placeholder="votre@email.com"]').type('nonexistent@example.com')
      cy.get('input[placeholder="Votre mot de passe"]').type('wrongpassword')
      
      // Submit form
      cy.get('button[type="submit"]').click()
      
      // Should show error message
      cy.get('[class*="bg-red-500"]').should('be.visible')
    })

    it('should toggle password visibility in login form', () => {
      // Password should be hidden by default
      cy.get('input[placeholder="Votre mot de passe"]').should('have.attr', 'type', 'password')
      
      // Click eye icon to show password
      cy.get('[data-testid="password-toggle"], .input-icon-right').click()
      cy.get('input[placeholder="Votre mot de passe"]').should('have.attr', 'type', 'text')
      
      // Click eye icon to hide password
      cy.get('[data-testid="password-toggle"], .input-icon-right').click()
      cy.get('input[placeholder="Votre mot de passe"]').should('have.attr', 'type', 'password')
    })
  })

  describe('Form Switching', () => {
    it('should switch between login and registration forms', () => {
      // Should start on login form
      cy.contains('Se connecter').should('be.visible')
      cy.contains('Bon retour !').should('be.visible')
      
      // Switch to registration
      cy.contains('Inscrivez-vous').click()
      cy.contains('Créer mon compte').should('be.visible')
      cy.contains('Rejoignez-nous').should('be.visible')
      cy.get('input[placeholder="Choisissez votre pseudo"]').should('be.visible')
      
      // Switch back to login
      cy.contains('Connectez-vous').click()
      cy.contains('Se connecter').should('be.visible')
      cy.contains('Bon retour !').should('be.visible')
      cy.get('input[placeholder="Choisissez votre pseudo"]').should('not.exist')
    })

    it('should clear form data when switching modes', () => {
      // Fill login form
      cy.get('input[placeholder="votre@email.com"]').type('test@example.com')
      cy.get('input[placeholder="Votre mot de passe"]').type('password123')
      
      // Switch to registration
      cy.contains('Inscrivez-vous').click()
      
      // Check that fields are empty
      cy.get('input[placeholder="votre@email.com"]').should('have.value', '')
      cy.get('input[placeholder="Minimum 6 caractères"]').should('have.value', '')
      
      // Fill registration form
      cy.get('input[placeholder="Choisissez votre pseudo"]').type('testuser')
      cy.get('input[placeholder="votre@email.com"]').type('test@example.com')
      
      // Switch back to login
      cy.contains('Connectez-vous').click()
      
      // Check that fields are empty
      cy.get('input[placeholder="votre@email.com"]').should('have.value', '')
      cy.get('input[placeholder="Votre mot de passe"]').should('have.value', '')
    })

    it('should clear error messages when switching modes', () => {
      // Try to submit empty login form to generate errors
      cy.get('button[type="submit"]').click()
      cy.contains('L\'email est requis').should('be.visible')
      
      // Switch to registration
      cy.contains('Inscrivez-vous').click()
      
      // Error should be cleared
      cy.contains('L\'email est requis').should('not.exist')
    })
  })

  describe('Form Accessibility and UI', () => {
    it('should disable form submission when loading', () => {
      cy.get('input[placeholder="votre@email.com"]').type('test@example.com')
      cy.get('input[placeholder="Votre mot de passe"]').type('Test123!')
      
      // Submit form and immediately check if button is disabled
      cy.get('button[type="submit"]').click()
      cy.get('button[type="submit"]').should('be.disabled')
    })

    it('should show loading spinner during form submission', () => {
      cy.get('input[placeholder="votre@email.com"]').type('test@example.com')
      cy.get('input[placeholder="Votre mot de passe"]').type('Test123!')
      
      cy.get('button[type="submit"]').click()
      
      // Should show loading spinner
      cy.get('[class*="animate-spin"]').should('be.visible')
    })

    it('should have proper form labels and accessibility', () => {
      // Check for proper labels
      cy.contains('Email *').should('be.visible')
      cy.contains('Mot de passe *').should('be.visible')
      
      // Switch to registration to check pseudo label
      cy.contains('Inscrivez-vous').click()
      cy.contains('Pseudo *').should('be.visible')
    })

    it('should display proper placeholder text', () => {
      cy.get('input[placeholder="votre@email.com"]').should('be.visible')
      cy.get('input[placeholder="Votre mot de passe"]').should('be.visible')
      
      cy.contains('Inscrivez-vous').click()
      cy.get('input[placeholder="Choisissez votre pseudo"]').should('be.visible')
      cy.get('input[placeholder="Minimum 6 caractères"]').should('be.visible')
    })
  })
})