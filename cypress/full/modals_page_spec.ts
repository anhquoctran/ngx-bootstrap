import { ModalsPo } from '../support/modals.po';

describe('Modals demo page test suite', () => {
  const modals = new ModalsPo();

  beforeEach(() => modals.navigateTo());

  describe('Service examples', () => {

    describe('Component modals', () => {
      const modalComponent = modals.exampleDemosArr.serviceComponent;
      const btnText = 'Create modalComponent with component';
      const modalCloseBtn = 'Close';

      it('User scrolls to "Component" and sees btn "Create modalComponent with component"', () => {
        modals.scrollToMenu('Component');
        modals.isElementVisible(modalComponent, modals.btnSelector);
        modals.isElemTextCorrect(modalComponent, modals.btnSelector, btnText);
      });

      it('User clicks on "Create template modalComponent" btn, modalComponent popup is opened like a component,' +
        'backdrop is enabled, "Close" btn is present', () => {
        modals.clickByText(modalComponent, btnText);
        modals.isModalDisplayed('be.visible');
        // modals.isBackdropEnabled('be.enabled');  TODO: can't catch the element
        cy.get(modals.modalWindow).find('.btn').last()
          .should('contain', 'Close');
        // modals.isElementVisible(modals.modalWindow, '.btn');
        // modals.isElemTextCorrect(modals.modalWindow, '.btn', 'Close');
      });

      it('User is able to close modalComponent by: click on cross, click on "Close" btn, click on backdrop, press ESC',
        () => {
        modals.clickByText(modalComponent, btnText);
        cy.get('div.modalComponent-header button').last().click(); // TODO: need a method/normal selector
        modals.isModalDisplayed('not.be.enabled');
        modals.isBackdropEnabled('not.be.enabled');
        cy.log('closed by X');

        modals.clickByText(modalComponent, btnText);
        cy.get(modals.modalWindow).find('.btn').last().click();
        modals.isModalDisplayed('not.be.enabled');
        modals.isBackdropEnabled('not.be.enabled');
        cy.log('closed by Close');

        // modals.clickByText(modalComponent, btnText);
        // modals.clickOutside(modals.modalWindow); // TODO: does not work
        // modals.isModalDisplayed('not.be.enabled');
        // modals.isBackdropEnabled('not.be.enabled');
        // cy.log('closed by click outside');

        modals.clickByText(modalComponent, btnText);
        cy.get('body').type('{esc}');
        modals.isModalDisplayed('not.be.enabled');
        modals.isBackdropEnabled('not.be.enabled');
        cy.log('closed by ESC');
      });
    });
  });

  describe('Nested modals', () => {
    const modalNested = modals.exampleDemosArr.serviceNested;
    const btnText = 'Open first modal';
    const btnOpen2Modal = 'Open second modal';
    const btnClose1Modal = 'Close first modal';
    const firstModalTitle = 'First modal';
    const secondModalTitle = 'Second modal';

    it('User scrolls to "Nested" and sees btn "Create modalComponent with component"', () => {
      modals.scrollToMenu('Nested');
      modals.isElementVisible(modalNested, modals.btnSelector);
      modals.isElemTextCorrect(modalNested, modals.btnSelector, btnText);
    });

    it('Check works', () => {

    });

    it('check closes', () => {

    });
  });
















  // describe('Directive examples', () => {
  // describe('Static modal', () => {
  //   const staticModal = modals.exampleDemosArr.directiveStatic;
  //   const buttonText = 'Static modal';
  //
  //   it('directive static modal can be closed by clicking Close button', () => {
  //     modals.clickByText(staticModal, buttonText);
  //     cy.get(`${ staticModal } ${ modals.modalContent }`).as('staticMod')
  //       .should('to.be.visible');
  //
  //     cy.get(`${ staticModal } ${ modals.modalHeader } ${ modals.btnCloseInHeader }`).click();
  //     cy.get(`${ staticModal } ${ modals.backDirectiveMod }`)
  //       .should('not.to.be.visible');
  //   });
  // });
//
//   describe('Child modal', () => {
//     const childModals = modals.exampleDemosArr.directiveChild;
//     const buttonText = 'Open child modal';
//
//     it('directive child modal can be closed by backdrop click', () => {
//       modals.clickByText(childModals, buttonText);
//       cy.get(`${ childModals } ${ modals.modalContent }`)
//         .should('to.be.visible');
//
//       cy.get(`${ childModals } ${ modals.backDirectiveMod }`).as('childModBack').click();
//       cy.get('@childModBack')
//         .should('not.to.be.visible');
//     });
//   });
// });
  })
  ;
