describe('', () => {
  const USER_EMAIL = 'test-user@sky.pro'
  const USER_PASSWORD = 'qwerty1234567'

  before(() => {
    cy.visit('login')

    cy.get('form').within(() => {
      cy.root()
        .find('input[name="email"]')
        .type(USER_EMAIL)
        .should('have.value', USER_EMAIL)

      cy.root()
        .find('input[name="password"]')
        .type(USER_PASSWORD)
        .should('have.value', USER_PASSWORD)

      cy.root().submit()
    })
  })

  it('should display the profile page for current user', () => {
    cy.location('pathname').should('eq', '/profile')

    cy.get('h4').contains('Мой профиль').should('exist')
    cy.get('p').contains(USER_EMAIL).should('exist')
  })

  it('display the added courses', () => {
    cy.get('h4').contains('Мои курсы').should('exist').as('Courses')
  })
})
