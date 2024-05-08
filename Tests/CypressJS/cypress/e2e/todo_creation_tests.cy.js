describe('Todo Creation', () => {
  it('test adding a todo', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')

    cy.get('.new-todo').type('test{enter}')
    cy.get('.todo-list').should('be.visible')

    cy.get('.todo-list li').should('have.length', 1)
    cy.get('.todo-list li').should('contain', 'test')
  })
  it('test adding multiple todos', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')

    cy.get('.new-todo').type('test1{enter}')
    cy.get('.new-todo').type('test2{enter}')
    cy.get('.new-todo').type('test3{enter}')
    
    cy.get('.todo-list li').should('have.length', 3)
    cy.get('.todo-list li').should('contain', 'test1')
    cy.get('.todo-list li').should('contain', 'test2')
    cy.get('.todo-list li').should('contain', 'test3')
  })

  it('test adding todo with just one character', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')
    cy.get('.new-todo').type('t{enter}')
    cy.get('.todo-list li').should('not.exist')
    cy.get('.new-todo').should('have.value', 't')
  })

  it('test adding todo with 100 characters', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')
    cy.get('.new-todo').type('t'.repeat(100) + '{enter}')
    cy.get('.todo-list li').should('have.length', 1)
    cy.get('.todo-list li').should('contain', 't'.repeat(100))
  })
})
