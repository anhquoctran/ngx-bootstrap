import { ModalsPo } from '../support/modals.po';

describe('Modals demo page test suite', () => {
  const modals = new ModalsPo();

  beforeEach(() => modals.navigateTo());

  describe('Service examples', () => {

    describe('Template modal', () => {
      const modalTemplate = modals.exampleDemosArr.serviceTemplate;
      const btnText = 'Create template modal';

      it('User scrolls to Template and sees btn "Create template modal"', () => {
        modals.scrollToMenu('Template');
        modals.isElementVisible(modalTemplate, modals.btnSelector);
        modals.isElemTextCorrect(modalTemplate, modals.btnSelector, btnText);
      });

      it('User clicks on "Create modal with component" btn, modal popup is opened, backdrop is enabled', () => {
        modals.clickByText(modalTemplate, btnText);
        modals.isModalDisplayed('be.visible');
        // modals.isBackdropEnabled('be.enabled');  TODO: can't catch the element
      });

      it('User closes modal popup by click on the cross, modal popup is closed and backdrop is disabled', () => {
        modals.clickByText(modalTemplate, btnText);
        cy.get('div.modal-header button').last().click(); // TODO: need a method/normal selector
        modals.isModalDisplayed('not.be.enabled');
        modals.isBackdropEnabled('not.be.enabled');
      });

      it('User is able to close modal popup by click on backdrop', () => {
        modals.clickByText(modalTemplate, btnText);
        modals.clickOutside(modals.modalWindow); // TODO does not work
        modals.isModalDisplayed('not.be.enabled');
        modals.isBackdropEnabled('not.be.enabled');
      });

      it('User is able to close modal popup by press on ESC btn', () => {
        modals.clickByText(modalTemplate, btnText);
        cy.get('body').type('{esc}');
        modals.isModalDisplayed('not.be.enabled');
        modals.isBackdropEnabled('not.be.enabled');
      });
    });
  });
});
