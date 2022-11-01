describe('', () => {
  const USER_EMAIL = 'test-user@sky.pro'
  const USER_NEW_EMAIL = 'new-test-user@sky.pro'
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
  })

  it('should display the added courses and should open modal-page', () => {
    cy.get('h4').contains('Мои курсы').should('exist')
    cy.get('[data-cy="gallery-courses"]').should('exist').as('GallaryCourses')

    cy.get('@GallaryCourses').children().first().click()

    cy.get('div[data-cy="modal"]').as('Modal')

    cy.get('@Modal').find('h2').should('have.text', 'Выберите тренировку')
    cy.get('@Modal').find('ul').should('exist').children().first().click()

    cy.location('pathname').should('include', '/workouts/1')
  })
})
