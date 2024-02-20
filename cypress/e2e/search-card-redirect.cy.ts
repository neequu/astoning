describe('card suggestions and card entity page', () => {
  it('goes to searched cards page', () => {
    cy.visit(Cypress.config().baseUrl!)
    cy.get('input').should('exist').type('kanon')

    cy.get('[data-testid="suggestions"]').should('be.visible')
    cy.get('[data-testid="suggestions"] a').first().then(($suggestLink) => {
      const cardAttribute = $suggestLink.attr('data-testid')

      const cardId = cardAttribute?.split('-')[2]

      cy.wrap($suggestLink).click()
      cy.url().should('include', `/anime/${cardId}`)
    })
    cy.get('[data-testid="anime-card"]').should('be.visible')
    cy.get('[data-testid="anime-card"] h1').should('be.visible')
  })
})
