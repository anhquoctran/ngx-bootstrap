import { BaseComponent } from './base.component';

export class ModalsPo extends BaseComponent {
  pageUrl = '/modals';
  pageTitle = 'Modals';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/modal';

  btnSelector = '.btn';
  btnCross = 'button span';
  modalWindow = '.modal-content';
  backdropSelector = 'modal-backdrop fade';
  backServiceMod = 'modal-container';
  backDirectiveMod = '[bsmodal]';
  modalHeader = '.modal-header';
  btnCloseInHeader = '.close';

  exampleDemosArr = {
    serviceTemplate: 'demo-modal-service-static',
    serviceComponent: 'demo-modal-service-component',
    serviceNested: 'demo-modal-service-nested',
    serviceScroll: 'demo-modal-scrolling-long-content',
    serviceEvents: 'demo-modal-service-events',
    serviceConfirm: 'demo-modal-service-confirm-window',
    serviceOptions: 'demo-modal-service-options',
    directiveStatic: 'demo-modal-static',
    directiveSizes: 'demo-modal-sizes',
    directiveChild: 'demo-modal-child',
    directiveNested: 'demo-modal-nested',
    directiveEvents: 'demo-modal-events',
    directiveAutoShow: 'demo-modal-auto-shown'
  };

  isElementVisible(baseSelector: string, elementToFind: string, rowNum = 0) {
    cy.get(`${ baseSelector } ${elementToFind}`).eq(rowNum).should('be.visible');
  }

  isElemTextCorrect(baseSelector: string, itemSel: string, expectedText: string, rowNum = 0) {
    cy.get(baseSelector).find(itemSel).eq(rowNum).invoke('text')
      .should('contain', expectedText);
  }

  isModalDisplayed(mdState: string) {
    cy.get(this.modalWindow).last()
      .should(mdState);
  }

  isBackdropEnabled(bdState: string) {
    cy.get(this.backServiceMod).should(bdState);
  }

}
