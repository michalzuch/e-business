describe('Todo Completion', () => {
  it('test marking a todo as completed', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')

    cy.get('.new-todo').type('test{enter}')

    cy.get('.todo-list li').should('contain', 'test')
    cy.get('.todo-list li').should('not.have.class', 'completed')
    
    cy.get('.todo-list li .toggle').click()
    cy.get('.todo-list li').should('have.class', 'completed')
  })

  it('test unmarking a todo as completed', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')

    cy.get('.new-todo').type('test{enter}')
    cy.get('.todo-list li').should('contain', 'test')

    cy.get('.todo-list li .toggle').click()
    cy.get('.todo-list li').should('have.class', 'completed')

    cy.get('.todo-list li .toggle').click()
    cy.get('.todo-list li').should('not.have.class', 'completed')
  })

  it('test adding multiple todos and marking all as completed', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')

    cy.get('.new-todo').type('test1{enter}')
    cy.get('.new-todo').type('test2{enter}')
    cy.get('.new-todo').type('test3{enter}')

    cy.get('.todo-list li').should('have.length', 3)
    cy.get('.todo-list li').should('not.have.class', 'completed')

    cy.get('.todo-list li .toggle').click({ multiple: true })
    cy.get('.todo-list li').should('have.class', 'completed')
  })

  it('test adding multiple todos and marking all as completed and then unmarking all', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')
    
    cy.get('.new-todo').type('test1{enter}')
    cy.get('.new-todo').type('test2{enter}')
    cy.get('.new-todo').type('test3{enter}')

    cy.get('.todo-list li').should('have.length', 3)
    cy.get('.todo-list li').should('not.have.class', 'completed')

    cy.get('.todo-list li .toggle').click({ multiple: true })
    cy.get('.todo-list li').should('have.class', 'completed')

    cy.get('.todo-list li .toggle').click({ multiple: true })
    cy.get('.todo-list li').should('not.have.class', 'completed')
  })
})
