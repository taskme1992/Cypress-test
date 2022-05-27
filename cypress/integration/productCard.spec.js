import "cypress-localstorage-commands";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})


const appUrl = Cypress.env('host');


describe('Check general elements of the product card', function() {
    beforeEach( function () {
        cy.fixture('apple_Ipad_11Pro').then((data) => {
            this.data = data
        })  
    })
    before( function () {
        //Hide Region Confirmation popup
        cy.setLocalStorage("hideRegionConfirmation", "1");
        cy.visit(`${appUrl}/cat/detail/planshet-apple-ipad-pro-11-wi-fi-256gb-space-grey-mhqu3ru-a/`)    
    })

    it('Check title', function() {
        cy.xpath('//*[@id="productTopPanel"]//*[@itemprop="name"]')
        .should('have.text', this.data.name)
    })

    it('Check navigation breadcrumbs', function() {
        cy.xpath('//*[@class="container pl16"]//*[@typeOf="BreadcrumbList"]//*[@typeOf="ListItem"]')
        .then(($el) => Cypress._.map($el, 'innerText'))
        .should('deep.equal', this.data.breadcrumbs)     
    })

    it('Check price', function() {
        cy.xpath('//*[@class="priceContainerInner"]//*[@class="product-box-price__active"]')
        .invoke('text').then(text => {
            expect(text.replace(/\u00a0/g, ' ')).equal(this.data.price)
        })
    })

    it('Check credit price', function() {
        cy.xpath('//*[@class="priceContainerInner"]//*[contains(@class, "dy-custom-price-shield")]')
        .should('have.text', this.data.creditPrice)
    })

    it('Check desciption(should be opened by default)', function() {
        cy.xpath('//*[contains(@class, "q-tabs-navigation ")]//*[@data-tab="description"]/..').should('have.class', 'active')
        cy.xpath('//*[@id="cont_description"]//*[contains(@class, "goodDescriptionText")]')
        .invoke('text').then(text => {
            expect(text.replace(/(\r\n|\n|\r)/gm, ' ').trim()).equal(this.data.description)
        })
    })

    it('Check subscription button', ()=> {
        cy.xpath('//*[@class="priceContainerInner"]//*[contains(@class, "item_subscription")]')
        .should('be.visible')
    })

    it('Check infromation tabs', function() {
        cy.xpath('//*[contains(@class,"q-tabs-navigation")]//li')
        .then(($el) => Cypress._.map($el, 'innerText'))
        .should('deep.equal', this.data.infoTabs)
    })

    it('Check Promo block', function() {
        cy.xpath('//*[@class="product-promo-shield__list"]//*[@class="product-promo-shield__elem    "]')
        .then(($el) => Cypress._.map($el, 'innerText'))
        .should('deep.equal', this.data.promo)    
    })
})

describe('Check information tabs > click and observe' , () => {

    beforeEach( function () {
        cy.setLocalStorage("hideRegionConfirmation", "1");
    })

    before( () => {
        //Hide Region Confirmation popup
        cy.setLocalStorage("hideRegionConfirmation", "1");
        cy.visit(`${appUrl}/cat/detail/planshet-apple-ipad-pro-11-wi-fi-256gb-space-grey-mhqu3ru-a/`)    
    })

    it('Click > specification tab activates', () => {
        cy.xpath('//*[contains(@class, "q-tabs-navigation ")]//*[@data-tab="properties"]').click()
        cy.xpath('//*[contains(@class, "q-tabs-navigation ")]//*[@data-tab="properties"]/..')
        .should('have.class', 'active')
    })

    it('Click > reviews tab activates', () => {
        cy.xpath('//*[contains(@class, "q-tabs-navigation ")]//*[@data-tab="response"]').click()
        cy.xpath('//*[contains(@class, "q-tabs-navigation ")]//*[@data-tab="response"]/..')
        .should('have.class', 'active')
    })

    it('Click > accesoures tab activates', () => {
        cy.xpath('//*[contains(@class, "q-tabs-navigation ")]//*[@data-tab="accesoures"]').click()
        cy.xpath('//*[contains(@class, "q-tabs-navigation ")]//*[@data-tab="accesoures"]/..')
        .should('have.class', 'active')
    })

    it('Click > services tab activates', () => {
        cy.xpath('//*[contains(@class, "q-tabs-navigation ")]//*[@data-tab="services"]').click()
        cy.xpath('//*[contains(@class, "q-tabs-navigation ")]//*[@data-tab="services"]/..')
        .should('have.class', 'active')
    })

    it('Click > instruction tab activates', () => {
        cy.xpath('//*[contains(@class, "q-tabs-navigation ")]//*[@data-tab="instruction"]').click()
        cy.xpath('//*[contains(@class, "q-tabs-navigation ")]//*[@data-tab="instruction"]/..')
        .should('have.class', 'active')
    })

    it('Click > description tab activates', () => {
        cy.xpath('//*[contains(@class, "q-tabs-navigation ")]//*[@data-tab="description"]').click()
        cy.xpath('//*[contains(@class, "q-tabs-navigation ")]//*[@data-tab="description"]/..')
        .should('have.class', 'active')
    })
})

describe('Check subscription button', () => {
   
    before(() => {
        //Hide Region Confirmation popup
        cy.setLocalStorage("hideRegionConfirmation", "1");
        cy.visit(`${appUrl}/cat/detail/planshet-apple-ipad-pro-11-wi-fi-256gb-space-grey-mhqu3ru-a/`)    
    })
    it('click > observe popup', () => {
        cy.xpath('//*[@class="priceContainerInner"]//*[contains(@class, "item_subscription_link")]').click()
        cy.xpath('//*[@id="popupContainer"]//*[@class="gs-avail-popup gs-avail-form-popup"]').should('be.visible')

    })
})