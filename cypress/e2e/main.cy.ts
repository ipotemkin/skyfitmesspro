describe('The main page of the application', () => {
  const COURSE = 'Йога'
  const NUMBER_OF_COURSES = 5

  before(() => {
    cy.visit('/')
  })

  it('should display of available courses', () => {
    cy.get('h1')
      .contains('Начните заниматься спортом и улучшите качество жизни')
      .should('exist')

    cy.get('[data-cy="gallery-courses"]').as('Gallery')

    cy.get('@Gallery').children().should('have.length', NUMBER_OF_COURSES)
  })

  it('should go to the course page', () => {
    cy.get('[data-cy="gallery-courses"]').as('Gallery')

    cy.get('@Gallery').find('a').contains(COURSE).click()

    cy.get('h1').should('have.text', COURSE)
  })
})
