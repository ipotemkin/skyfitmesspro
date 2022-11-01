describe('The workout page', () => {
  const USER_EMAIL = 'test-user@sky.pro'
  const USER_PASSWORD = 'qwerty1234567'

  const COURSE_NUMBER = 0
  const COURSE_NAME = 'Стретчинг'

  const WORKOUT_NUMBER = 2
  const WORKOUT_NAME = 'Разогрев мышц'

  const MAX_REPEATS_COUNT = '15'

  before(() => {
    cy.login(USER_EMAIL, USER_PASSWORD)
  })

  it('should display the added courses and should open modal-page', () => {
    cy.displayCoursesAndOpenModalPage(COURSE_NUMBER, WORKOUT_NUMBER)
  })

  it('should display the workout-page', () => {
    cy.get('h1').contains(COURSE_NAME).should('exist')
    cy.get('h2').contains(WORKOUT_NAME).should('exist')
    cy.get('div[data-cy="player"]').should('exist')
    cy.get('h2').contains('Упражнения').should('exist')
    cy.get('h2').contains('Мой прогресс по тренировке').should('exist')
  })

  it('should display the progress button and should open the modal window', () => {
    cy.get('button')
      .should('have.text', 'Заполнить свой прогресс')
      .as('ProgressButton')
    cy.get('@ProgressButton').click()
    cy.get('div[data-cy="progress-modal"]').should('exist')
  })

  it('should display the modal window and send data', () => {
    cy.get('div[data-cy="progress-modal"]').should('exist').as('ProgressModal')
    cy.get('@ProgressModal').within(() => {
      cy.get('h2').contains('Мой прогресс').should('exist')
      cy.root().find('input').as('Inputs')
      cy.get('@Inputs')
        .first()
        .type('99')
        .should('have.value', MAX_REPEATS_COUNT)
        .blur()

      cy.get('button').contains('Отправить').click()
    })
  })

  it('should display the success modal window', () => {
    cy.get('div[data-cy="success-modal"]').should('exist').as('SuccessModal')
    cy.get('@SuccessModal').contains('Ваш прогресс засчитан!')
  })

  it('should display the progress bar with 100%', () => {
    cy.get('div[data-cy="progress-bars"]').should('exist').as('ProgressBars')
    cy.get('@ProgressBars').first().contains('100%')
  })
})
