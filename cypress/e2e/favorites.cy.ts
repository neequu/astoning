describe('card suggestions and card entity page w/ auth', () => {
  beforeEach(() => {
    // register before each test
    // if using supabase - change to login
    cy.visit('/register')
    cy.get('[data-testid="email"]').type('nn@nn.nn')
    cy.get('[data-testid="password"]').type('nnnnnn')
    cy.get('[data-testid="submit"]').click()

    // wait for the register process to complete
    cy.url().should('not.include', '/register')
  })

  it('should add, view, and remove a card from favorites', () => {
    // go to main and type query
    cy.visit(Cypress.config().baseUrl!)
    cy.get('input').should('exist').type('monster')
    // suggestions should appear
    cy.get('[data-testid="suggestions"]').should('be.visible')
    cy.get('[data-testid="suggestions"] a').first().then(($suggestLink) => {
      // get the id of card
      const cardAttribute = $suggestLink.attr('data-testid')
      const cardId = cardAttribute?.split('-')[2]

      // check that id is the same in the url
      cy.wrap($suggestLink).click()
      cy.url().should('include', `/anime/${cardId}`)
    })
    // check content on the page to be visible
    cy.get('[data-testid="anime-card"]').should('be.visible')
    cy.get('[data-testid="anime-card"] h1').should('be.visible')
    // like the card
    cy.get('[data-testid="anime-card"] [data-testid="like-button"]').should('exist').click()

    cy.get('[data-testid="anime-card"] [data-testid="like-button"]', { timeout: 20000 }).should('have.attr', 'data-liked', 'true')
    // go to the likes url
    cy.visit('/favorites')
    // check that clicking the buttons removes it
    cy.get('[data-testid="media-card"]', { timeout: 20000 }).should('exist')
    cy.get('[data-testid="media-card"] [data-testid="like-button"]').should('be.visible', { timeout: 20000 })
    cy.get('[data-testid="media-card"] [data-testid="like-button"]', { timeout: 20000 }).should('have.attr', 'data-liked', 'true')
    cy.get('[data-testid="media-card"] [data-testid="like-button"]').click()
    cy.get('[data-testid="media-card"] [data-testid="like-button"]', { timeout: 20000 }).should('have.attr', 'data-liked', 'false')
    cy.get('[data-testid="media-card"]').should('not.exist')
  })
})
