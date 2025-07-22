/// <reference types="cypress" />

// Custom commands for authentication testing
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Login with email and password
       * @param email - User email
       * @param password - User password
       */
      login(email: string, password: string): Chainable<void>
      
      /**
       * Register a new user
       * @param pseudo - User pseudo
       * @param email - User email  
       * @param password - User password
       */
      register(pseudo: string, email: string, password: string): Chainable<void>
      
      /**
       * Logout current user
       */
      logout(): Chainable<void>
      
      /**
       * Navigate to auth page
       */
      visitAuth(): Chainable<void>
      
      /**
       * Generate random test user data
       */
      generateTestUser(): Chainable<{pseudo: string, email: string, password: string}>
      
      /**
       * Clear all auth data and localStorage
       */
      clearAuthData(): Chainable<void>
    }
  }
}

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visitAuth()
  
  // Ensure we're on login form
  if (cy.get('body').contains('Inscrivez-vous')) {
    cy.contains('Connectez-vous').click()
  }
  
  cy.get('input[placeholder="votre@email.com"]').clear().type(email)
  cy.get('input[placeholder="Votre mot de passe"]').clear().type(password)
  cy.get('button[type="submit"]').contains('Se connecter').click()
  
  // Wait for potential redirect or success
  cy.url().should('not.contain', '/auth', { timeout: 10000 })
})

// Register command
Cypress.Commands.add('register', (pseudo: string, email: string, password: string) => {
  cy.visitAuth()
  
  // Switch to registration form
  cy.contains('Inscrivez-vous').click()
  
  cy.get('input[placeholder="Choisissez votre pseudo"]').clear().type(pseudo)
  cy.get('input[placeholder="votre@email.com"]').clear().type(email)
  cy.get('input[placeholder="Minimum 6 caractères"]').clear().type(password)
  cy.get('button[type="submit"]').contains('Créer mon compte').click()
  
  // Wait for potential redirect or success
  cy.url().should('not.contain', '/auth', { timeout: 10000 })
})

// Logout command
Cypress.Commands.add('logout', () => {
  // This will depend on how logout is implemented in your app
  // For now, clear storage and navigate to auth
  cy.clearAuthData()
  cy.visitAuth()
})

// Visit auth page command
Cypress.Commands.add('visitAuth', () => {
  cy.visit('http://localhost:3000')
})

// Generate test user command
Cypress.Commands.add('generateTestUser', () => {
  const timestamp = Date.now()
  const randomNum = Math.floor(Math.random() * 1000)
  
  const testUser = {
    pseudo: `testuser${timestamp}${randomNum}`,
    email: `testuser${timestamp}${randomNum}@example.com`,
    password: 'Test123!'
  }
  
  cy.wrap(testUser)
})

// Clear auth data command
Cypress.Commands.add('clearAuthData', () => {
  cy.clearLocalStorage()
  cy.clearCookies()
  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
})

// Prevent TypeScript errors
export {}