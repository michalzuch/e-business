describe('Todo Filters', () => {
  it('test all filter', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')

    for (let i = 1; i <= 10; i++) {
      cy.get('.new-todo').type(`test${i}{enter}`)
      if (i % 2 !== 0) {
        cy.get('.todo-list li')
          .eq(i - 1)
          .find('.toggle')
          .click()
      }
    }
    cy.get('.todo-list li').should('have.length', 10)

    cy.get('.filters li').contains('All').click()
    cy.get('.todo-list li').should('have.length', 10)
  })

  it('test active filter', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')

    for (let i = 1; i <= 10; i++) {
      cy.get('.new-todo').type(`test${i}{enter}`)
      if (i % 2 !== 0) {
        cy.get('.todo-list li')
          .eq(i - 1)
          .find('.toggle')
          .click()
      }
    }
    cy.get('.todo-list li').should('have.length', 10)

    cy.get('.filters li').contains('Active').click()
    cy.get('.todo-list li').should('have.length', 5)

    for (let i = 1; i <= 5; i++) {
      cy.get('.todo-list li')
        .eq(i - 1)
        .should('not.have.class', 'completed')
    }
  })

  it('test completed filter', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')

    for (let i = 1; i <= 10; i++) {
      cy.get('.new-todo').type(`test${i}{enter}`)
      if (i % 2 !== 0) {
        cy.get('.todo-list li')
          .eq(i - 1)
          .find('.toggle')
          .click()
      }
    }
    cy.get('.todo-list li').should('have.length', 10)

    cy.get('.filters li').contains('Completed').click()
    cy.get('.todo-list li').should('have.length', 5)

    for (let i = 1; i <= 5; i++) {
      cy.get('.todo-list li')
        .eq(i - 1)
        .should('have.class', 'completed')
    }
  })
})
