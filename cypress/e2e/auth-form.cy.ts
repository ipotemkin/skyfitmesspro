describe('Test registration', () => {
  const USER_EMAIL = 'test-user@sky.pro'
  const USER_PASSWORD = 'qwerty1234567'

  const ERROR_EMAIL = 'test-user.sky.pro'
  const ERROR_PASSWORD = '12345'

  before(() => {
    cy.visit('/')
  })

  it('should direct to the page "Login"', () => {
    cy.get('button').contains('Войти').should('exist').as('Button')
    cy.get('@Button').click()

    cy.location('pathname').should('eq', '/login')
  })

  it('should display the input form for the user', () => {
    cy.get('form').should('exist')

    cy.get('form').within(() => {
      cy.root().find('input').should('have.length', 2)
      cy.root().find('button').should('have.length', 2)
    })
  })

  it('should output errors when the user enters incorrect data', () => {
    cy.get('form').within(() => {
      cy.root()
        .find('input[name="email"]')
        .type(ERROR_EMAIL)
        .should('have.value', ERROR_EMAIL)
        .blur()
      cy.root().contains('Введите корректный e-mail').should('exist')

      cy.root()
        .find('input[name="password"]')
        .type(ERROR_PASSWORD)
        .should('have.value', ERROR_PASSWORD)
        .blur()

      cy.root()
        .contains('Пароль должен быть не менее 6 символов')
        .should('exist')
    })
  })

  it('should successfully submit the form', () => {
    cy.get('form').within(() => {
      cy.root()
        .find('input[name="email"]')
        .clear()
        .type(USER_EMAIL)
        .should('have.value', USER_EMAIL)
      cy.root().contains('Введите корректный e-mail').should('not.exist')

      cy.root()
        .find('input[name="password"]')
        .clear()
        .type(USER_PASSWORD)
        .should('have.value', USER_PASSWORD)
      cy.root()
        .contains('Пароль должен быть не менее 6 символов')
        .should('not.exist')

      cy.root().submit()
      cy.location('pathname').should('eq', '/profile')
    })
  })
})
