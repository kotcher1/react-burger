describe('constructor page works correctly', function() {

  it('should open product popup', function() {
    cy.visit('http://localhost:3000');
    cy.get('[class^=product_card__]').first().as('card');
    cy.get('@card').click();
    cy.get('[class^=modal-overlay_modal__]').as('modal');
    cy.get('@modal').contains('Детали ингредиента')
    cy.get('[class^=modal_button__').as('button').click();
    cy.get('#react-modals').should('not.include.text', 'Детали ингредиента')
  });

  it('should dragndrop component', function() {
    cy.visit('http://localhost:3000');
    cy.get('[class^=product_link__]').first().as('card');
    cy.get('[class^=burger-ingredients_productSection__]:first-child [class^=product_link__]:nth-child(2)').as('card2');
    cy.get('[class^=burger-constructor_block__]').as('dropBlock')
    cy.get('@card').trigger('dragstart');
    cy.get('@dropBlock').trigger('drop');
    cy.get('.constructor-element_pos_top').as('firstBun');
    cy.get('.constructor-element_pos_bottom').as('secondBun')
    cy.get('[class^=product_card__]:first-child .counter').as('firstCounter');
    cy.get('@firstCounter').contains('2');
    cy.get('@card2').trigger('dragstart');
    cy.get('@dropBlock').trigger('drop');
    cy.get('[class^=burger-ingredients_productSection__]:nth-child(1) [class^=burger-ingredients_block__] [class^=product_link__]:nth-child(1) .counter').should('not.exist');
    cy.get('[class^=burger-constructor_priceNumber__]').contains('1976')

    cy.get('[class^=burger-ingredients_productSection__]:nth-child(2) [class^=product_link__]:nth-child(2)').as('card3');
    cy.get('[class^=burger-ingredients_productSection__]:nth-child(2) [class^=product_link__]:nth-child(3)').as('card4');
    cy.get('[class^=burger-ingredients_productSection__]:nth-child(2) [class^=product_link__]:nth-child(4)').as('card5');
    cy.get('@card3').trigger('dragstart');
    cy.get('@dropBlock').trigger('drop');
    cy.get('[class^=burger-constructor_ingredients__] [class^=sorted-element_line__] .constructor-element__action').as('closeButton')
    cy.get('@closeButton').click();
    cy.get('@card4').trigger('dragstart');
    cy.get('@dropBlock').trigger('drop');
    cy.get('@card5').trigger('dragstart');
    cy.get('@dropBlock').trigger('drop');
    cy.get('[class^=burger-constructor_ingredients__] [class^=sorted-element_line__]:nth-child(2)').contains('шипами')

    cy.get('[class^=burger-constructor_buttons__] .button').as('orderButton');
    cy.get('@orderButton').click()
    cy.url().should('eq', 'http://localhost:3000/login')
  });

  it('should login', function() {
    cy.visit('http://localhost:3000');
    cy.get('[class^=product_link__]').first().as('card');
    cy.get('[class^=burger-constructor_block__]').as('dropBlock')
    cy.get('@card').trigger('dragstart');
    cy.get('@dropBlock').trigger('drop');

    cy.get('[class^=burger-constructor_buttons__] .button').as('orderButton');
    cy.get('@orderButton').click()
    cy.url().should('eq', 'http://localhost:3000/login');
    cy.get('[name=email]').type('hanna@hanna.hanna');
    cy.get('[name=password]').type('123123');
    cy.get('[type=submit]').click();

    cy.get('@orderButton').click();
    cy.get('[class^=modal-overlay_modal__]').as('modal');
    cy.get('@modal').contains('Ваш заказ начали готовить');
    cy.get('[class^=modal_button__').as('button').click();
    cy.get('#react-modals').should('not.include.text', 'Ваш заказ начали готовить')
  });
})