describe('Todo Deletion', () => {
  it('test deleting a todo', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')
    
    cy.get('.new-todo').type('test{enter}')
    cy.get('.todo-list li').should('contain', 'test')

    cy.get('.todo-list li .destroy').click({ force: true })
    cy.get('.todo-list li').should('not.exist')
  })

  it('test clearing completed todos', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')

    cy.get('.new-todo').type('test{enter}')

    cy.get('.todo-list li').should('contain', 'test')
    cy.get('.todo-list li').should('not.have.class', 'completed')
    cy.get('.todo-list li .toggle').click()
    cy.get('.todo-list li').should('have.class', 'completed')

    cy.get('.clear-completed').click()
    cy.get('.todo-list li').should('not.exist')
  })
})
