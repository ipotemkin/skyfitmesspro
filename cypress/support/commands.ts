declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<void>
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
  cy.get('[data-cy="gallery-courses"]').should('exist').as('GalleryCourses')

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
