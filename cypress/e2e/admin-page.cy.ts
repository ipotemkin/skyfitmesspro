describe('The admin page', () => {
  const USER_EMAIL = 'test-user@sky.pro'
  const USER_PASSWORD = 'qwerty1234567'

  before(() => {
    cy.login(USER_EMAIL, USER_PASSWORD)
  })

  it('should display the profile page for current user', () => {
    cy.location('pathname').should('eq', '/profile')

    cy.get('h4').contains('Мой профиль').should('exist')
    cy.get('div').contains(USER_EMAIL).should('exist')
    cy.get('div').contains(USER_EMAIL).click()

    cy.get('div').contains('Профиль').should('exist')
    cy.get('div').contains('Добавить/удалить курс').should('exist')
    cy.get('div').contains('Выйти').should('exist')
  })

  it('should display the admin page for current user', () => {
    cy.get('div').contains('Добавить/удалить курс').click()
    cy.location('pathname').should('eq', '/admin')

    cy.get('h1').contains('Управление курсами').should('exist')
    cy.get('div').contains('Курс').should('exist')
    cy.get('div').contains('Действие').should('exist')
  })
})
