describe('card suggestions and card entity page for w/o auth', () => {
  it('goes to searched cards page', () => {
    // go to main and type query
    cy.visit(Cypress.config().baseUrl!)
    cy.get('input').should('exist').type('kanon')
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
  })
})
