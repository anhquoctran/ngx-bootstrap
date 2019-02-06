import { BaseComponent } from './base.component';

export class TypeaheadPo extends BaseComponent {
  pageUrl = '/typeahead';
  pageTitle = 'Typeahead';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/typeahead';

  inputSelector = 'input';
  cardHeader = '.card-header';
  activeDropdown = '.dropdown';
  dropdownBtn = '.dropdown button';
  dropdownItem = '.dropdown-item';
  formGroup = 'label';
  dropdownHeader = '.dropdown-header';
  btnSelector = '.btn';
  noResultAlert = '.alert-danger';

  exampleDemosArr = {
    basic: 'demo-typeahead-basic',
    itemTemplate: 'demo-typeahead-item-template',
    optionField: 'demo-typeahead-field',
    asyncData: 'demo-typeahead-async',
    withDelay: 'demo-typeahead-delay',
    templateDriven: 'demo-typeahead-form',
    reactiveForms: 'demo-typeahead-reactive-form',
    groupingResults: 'demo-typeahead-grouping',
    ignoreSpaceAndOrder: 'demo-typeahead-single-world',
    delimiters: 'demo-typeahead-phrase-delimiters',
    dropUp: 'demo-typeahead-dropup',
    onBlur: 'demo-typeahead-on-blur',
    appendToBody: 'demo-typeahead-container',
    noResult: 'demo-typeahead-no-result',
    scrollable: 'demo-typeahead-scrollable',
    latinize: 'demo-typeahead-latinize',
    onSelect: 'demo-typeahead-on-select',
    resultOnBlur: 'demo-typeahead-show-on-blur',
    configDefaults: 'demo-typeahead-config',
    selectFirstItem: 'demo-selected-first-item'
  };

  isSelectedItemDisplayed(baseSelector: string, inputtedText: string, resultToCheck?: string) {
    this.clearInputAndSendKeys(baseSelector, inputtedText);
    if (!resultToCheck) {
      this.clickByText(this.activeDropdown, inputtedText);
      this.isDemoContainsTxt(baseSelector, inputtedText);
    } else {
      this.clickByText(this.activeDropdown, inputtedText);
      this.isDemoContainsTxt(baseSelector, resultToCheck);
    }
  }

  isDropdownDisabled(baseSelector: string, dropdownSelector: string) {
    cy.get(`${baseSelector} ${dropdownSelector}`)
      .should('not.be.enabled');
  }

  isDropdownHasNItems(itemsToCount: string, shdBeQuantity: number) {
    cy.get(itemsToCount).should('have.length', shdBeQuantity);
  }

  isDropdownScrollable(stateMatch: string) {
    cy.get(this.activeDropdown).contains(stateMatch).scrollIntoView()
      .should('contain', stateMatch);
  }

  isSelectedOptionFilled(baseSelector: string, expectedTxt: string, expectedTxtOther?: string) {
    cy.get(`${baseSelector} .card-header`).eq(1).invoke('text')
      .should(blockTxt => {
        expect(blockTxt).to.contains(expectedTxt);
        expect(blockTxt).to.contains(expectedTxtOther ? expectedTxtOther : expectedTxt);
      });
  }
}
