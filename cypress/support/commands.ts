declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<void>
    displayProgressButtonAndOpenModalWindow(): Chainable<void>
    displayModalWindowAndSendData(data: number, max: number): Chainable<void>
    displaySuccessModalWindow(): Chainable<void>
    displayCoursesAndOpenModalPage(
      course: number,
      workout: number
    ): Chainable<void>
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('login')

  cy.get('form').within(() => {
    cy.root()
      .find('input[name="email"]')
      .type(email)
      .should('have.value', email)

    cy.root()
      .find('input[name="password"]')
      .type(password)
      .should('have.value', password)

    cy.root().submit()
  })
})

Cypress.Commands.add('displayCoursesAndOpenModalPage', (course, workout) => {
  cy.get('h4').contains('Мои курсы').should('exist')
  cy.get('[data-cy="gallery-course"]').should('exist').as('GalleryCourses')

  cy.get('@GalleryCourses').children().eq(course).click()

  cy.get('div[data-cy="modal"]').as('Modal')

  cy.get('@Modal').find('h2').should('have.text', 'Выберите тренировку')
  cy.get('@Modal')
    .find('ul')
    .should('exist')
    .children()
    .eq(workout - 1)
    .click()

  cy.location('pathname').should('include', `/workouts/${workout}`)
})

Cypress.Commands.add('displayProgressButtonAndOpenModalWindow', () => {
  cy.get('button')
    .should('have.text', 'Заполнить свой прогресс')
    .as('ProgressButton')
  cy.get('@ProgressButton').click()
  cy.get('div[data-cy="progress-modal"]').should('exist')
})

Cypress.Commands.add('displayModalWindowAndSendData', (data, max) => {
  const value = data > 0 ? max.toString() : ''

  cy.get('div[data-cy="progress-modal"]').should('exist').as('ProgressModal')
  cy.get('@ProgressModal').within(() => {
    cy.get('h2').contains('Мой прогресс').should('exist')
    cy.root().find('input').as('Inputs')
    cy.get('@Inputs')
      .first()
      .clear()
      .type(data.toString())
      .should('have.value', value)
      .blur()

    cy.get('button').contains('Отправить').click()
  })

  Cypress.Commands.add('displaySuccessModalWindow', () => {
    cy.get('div[data-cy="success-modal"]').should('exist').as('SuccessModal')
    cy.get('@SuccessModal').contains('Ваш прогресс засчитан!')
  })
})
