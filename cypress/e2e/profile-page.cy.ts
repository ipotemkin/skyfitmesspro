describe('The profile page', () => {
  const USER_EMAIL = 'test-user@sky.pro'
  const USER_NEW_EMAIL = 'new-test-user@sky.pro'
  const USER_PASSWORD = 'qwerty1234567'

  const COURSE_NUMBER = 0
  const WORKOUT_NUMBER = 1

  before(() => {
    cy.login(USER_EMAIL, USER_PASSWORD)
  })

  it('should display the profile page for current user', () => {
    cy.location('pathname').should('eq', '/profile')

    cy.get('h4').contains('Мой профиль').should('exist')
    cy.get('p').contains(USER_EMAIL).should('exist')
  })

  it('should display the password/email change buttons and should change email', () => {
    cy.get('[data-cy="edit-data-user"]').should('exist').as('BlockEdit')
    cy.get('@BlockEdit')
      .find('button')
      .should('have.length', '2')
      .as('ButtonsEdit')
    cy.get('@ButtonsEdit')
      .first()
      .should('have.text', 'Редактировать e-mail')
      .as('EditEmail')
    cy.get('@ButtonsEdit').last().should('have.text', 'Редактировать пароль')

    cy.get('@EditEmail').click()
    cy.get('h3').contains('Новый e-mail:').should('exist')
    cy.get('input[name="email"]').should('exist').as('InputEmail')
    cy.get('@InputEmail').clear().type(USER_NEW_EMAIL)
    cy.get('button').contains('Сохранить').click()

    cy.get('div[data-cy="name-user"]').should('have.text', USER_NEW_EMAIL)

    cy.get('@EditEmail').click()
    cy.get('@InputEmail').clear().type(USER_EMAIL)
    cy.get('button').contains('Сохранить').click()

    cy.get('div[data-cy="name-user"]').should('have.text', USER_EMAIL)
  })

  it('should display the added courses and should open modal-page', () => {
    cy.displayCoursesAndOpenModalPage(COURSE_NUMBER, WORKOUT_NUMBER)
  })
})
