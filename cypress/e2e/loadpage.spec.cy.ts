describe('Bible tests', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('require is not defined')) {
        // we expected this error, so let's ignore it
        // and let the test continue
        return false;
    }
    return err
  })
  it('First access and Bible tests', () => {
    cy.log('Calibrate test and bible tests');
    cy.visit('http://localhost:4200');
    cy.get('[data-test="button-calibrate"]').contains('Calibrar');
    cy.get('[data-test="button-calibrate"]').click();
    for (let i = 1; i < 6; i++) {
      cy.get('[data-test="current-step"]').contains(i + '/6');
      cy.get('[data-test="current-step"]').type('{enter}');
    }
    cy.get('[data-test="current-step"]').contains('6/6');
    cy.get('[data-test="current-step"]').type('{enter}');
    cy.get('[data-test="current-step"]').type('{esc}');
    cy.get('[data-test="bible-text-content"]').contains('No princípio, criou Deus os céus e a terra.');
    
    cy.log('Change for menu');
    cy.get('[data-test="bible-logo"]').click();
    cy.wait(500);
    cy.get('[data-test="bible-book"]').select('Salmos');
    cy.wait(500);
    cy.get('[data-test="bible-menu-chapter"]').clear().type('121');
    cy.get('[data-test="bible-menu-verse"]').clear().type('1');
    cy.get('[data-test="bible-menu-button"]').click();
    cy.get('[data-test="bible-text-content"]').contains('Elevo os olhos para os montes: de onde me virá o socorro?');
    
    cy.log('Change for shortcut');
    cy.get('body').type('{enter}');
    cy.wait(500);
    cy.get('[data-test="bible-shotcut-input"]').clear().type('gn 1 1');
    cy.get('body').type('{enter}');
    cy.get('[data-test="bible-text-content"]').contains('No princípio, criou Deus os céus e a terra.');
  })
  it('Standby test', () => {
    cy.visit('http://localhost:4200/standby');
    cy.get('[data-test="standby-logo"]').should('be.visible');
  });
  it('Message test', () => {
    cy.visit('http://localhost:4200/mensagem');
    cy.get('[data-test="message-title"]').contains('escolha o título');
    cy.get('[data-test="message-text"]').contains('escolha o texto');
    cy.get('[data-test="message-logo"]').click();
    cy.wait(500);
    cy.get('[data-test="message-menu-title"]').clear().type("Change title");
    cy.get('[data-test="message-menu-text"]').clear().type("Change text");
    cy.get('[data-test="message-title"]').contains('Change title');
    cy.get('[data-test="message-text"]').contains('Change text');
    cy.get('body').type('{esc}');
    cy.get('body').type('{enter}');
    cy.get('[data-test="message-shotcut-input"]').clear().type('sl 121 1');
    cy.get('body').type('{enter}');
    cy.get('[data-test="bible-text-content"]').contains('Elevo os olhos para os montes: de onde me virá o socorro?');
  });
  it('Praise test', () => {
    cy.visit('http://localhost:4200/louvor');
    cy.get('[data-test="general-menu-show"]').click();
    cy.wait(500);
    cy.get('[data-test="general-menu-api-token"]').clear().type("c0d5c8b8530eeec7328de716d59f08fc");
    cy.get('[data-test="general-menu-button"]').click();
    cy.wait(500);
    cy.visit('http://localhost:4200/louvor');
    cy.get('[data-test="praise-logo"]').click();
    cy.wait(500);
    cy.get('[data-test="praise-menu-search-input"]').clear().type("Cria em mim");
    cy.wait(500);
    cy.get('[data-test="praise-menu-search-button-vagalume"]').click();
    cy.wait(2000);
    cy.get('[data-test="praise-menu-search-vagalume-music"]')
      .contains('Comunidade de Nilópolis - Cria Em Mim');
    cy.get('[data-test="praise-menu-search-vagalume-music"]')
      .contains('Comunidade de Nilópolis - Cria Em Mim')
      .siblings('.fa-cloud-download-alt')
      .click();
    cy.wait(2000);
    cy.get('[data-test="praise-menu-edit-save"]')
      .click();
    cy.get('[data-test="praise-menu-close"]')
      .click();
    cy.get('[data-test="praise-text"]')
    .should('have.text', 'Cria em mim ó Deus, cria em mim ó DeusUm coração puroE renova, e renova um espírito inabalávelNão retires de nós o teu espíritoNão retires de nós o teu espírito');
  });
})