describe('The workout page', () => {
  const USER_EMAIL = 'test-user@sky.pro'
  const USER_PASSWORD = 'qwerty1234567'

  const COURSE_NUMBER = 0
  const COURSE_NAME = 'Стретчинг'

  const WORKOUT_NUMBER = 2
  const WORKOUT_NAME = 'Разогрев мышц'

  const MAX_REPEATS_COUNT = 15

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
    cy.displayProgressButtonAndOpenModalWindow()
  })

  it('should display the modal window and send data: 0', () => {
    cy.displayModalWindowAndSendData(0, 0)
  })

  it('should display the success modal window', () => {
    cy.displaySuccessModalWindow()
  })

  it('should display the progress bar with 0%', () => {
    cy.get('div[data-cy="progress-bars"]').should('exist').as('ProgressBars')
    cy.get('@ProgressBars').first().contains('0%')
  })

  it('should display the progress button and should open the modal window', () => {
    cy.displayProgressButtonAndOpenModalWindow()
  })

  it('should display the modal window and send data: 99', () => {
    cy.displayModalWindowAndSendData(99, MAX_REPEATS_COUNT)
  })

  it('should display the success modal window', () => {
    cy.displaySuccessModalWindow()
  })

  it('should display the progress bar with 100%', () => {
    cy.get('div[data-cy="progress-bars"]').should('exist').as('ProgressBars')
    cy.get('@ProgressBars').first().contains('100%')
  })

  it('should display the progress button and should open the modal window', () => {
    cy.displayProgressButtonAndOpenModalWindow()
  })

  it('should display the modal window and send data: 0', () => {
    cy.displayModalWindowAndSendData(0, 0)
  })

  it('should display the success modal window', () => {
    cy.displaySuccessModalWindow()
  })

  it('should display the progress bar with 0%', () => {
    cy.get('div[data-cy="progress-bars"]').should('exist').as('ProgressBars')
    cy.get('@ProgressBars').first().contains('0%')
  })
})
