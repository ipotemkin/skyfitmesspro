describe('The main page of the application', () => {
  before(() => {
    cy.visit('/')
  })

  it('should display of available courses', () => {
    cy.get('h1')
      .contains('Начните заниматься спортом и улучшите качество жизни')
      .should('exist')

    cy.get('[data-cy="gallery-courses"]').as('Gallery')

    cy.get('@Gallery').children().should('have.length', '5')
  })

  it('should go to the course page', () => {
    cy.get('[data-cy="gallery-courses"]').as('Gallery')
    
    cy.get('@Gallery').find('a').contains('Йога').click()

    cy.get('h1').should('have.text', 'Йога')
  })
})


