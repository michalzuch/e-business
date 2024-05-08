describe('Website Availability and UI Elements Visibility', () => {
  it('test website availability', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')
  })

  it('test header visibility', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')
    cy.get('.todoapp').should('be.visible')

    const header = cy.get('header')
    header.should('be.visible')
    header.should('have.class', 'header')
  })

  it('test title visibility', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')
    cy.get('.todoapp').should('be.visible')

    const header = cy.get('header')
    header.should('be.visible')
    header.should('have.class', 'header')

    const title = cy.get('h1')
    title.should('be.visible')
    title.should('have.text', 'todos')
  })

  it('test input container visibility', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')
    const inputContainer = cy.get('.header input')
    inputContainer.should('be.visible')
    inputContainer.should('have.attr', 'placeholder', 'What needs to be done?')
  })

  it('test todo list visibility when empty', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')
    cy.get('.todo-list').should('not.be.visible')
  })

  it('test footer visibility', () => {
    cy.visit('https://todomvc.com/examples/react/dist/')
    const footer = cy.get('footer')
    footer.should('be.visible')
    footer.should('have.class', 'info')
    const footerText1 = 'Double-click to edit a todo'
    const footerText2 = 'Created by the TodoMVC Team'
    const footerText3 = 'Part of TodoMVC'
    footer.should('contain', footerText1 + footerText2 + footerText3)
  })
})
