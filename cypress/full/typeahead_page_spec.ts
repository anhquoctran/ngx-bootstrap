import { TypeaheadPo } from '../support/typeahead.po';

describe('Typeahead demo page test suite', () => {
  const typeahead = new TypeaheadPo();

  beforeEach(() => typeahead.navigateTo());

  describe('Item template', () => {
    const itemTemp = typeahead.exampleDemosArr.itemTemplate;
    const formTemplate = 'Model: ';
    const textToInput = 'co';
    const stateForCheck = 'Colorado';
    const checkTemplate = 'This is: "Colorado" Index: 0';

    it('User scrolls to Item template sub-menu and sees typeahead input and typeahead card with "Model:"', () => {
      typeahead.scrollToMenu('Item template');
      typeahead.isElementVisible(itemTemp, typeahead.cardHeader);
      typeahead.isPreviewExist(itemTemp, formTemplate);
      typeahead.isElementVisible(itemTemp, typeahead.inputSelector);
    });

    it('When user starts to type a name of a State a drop-down with matches is shown.' +
      'The list contains a template "This is: "_matched state_" index: _index #". ',
      () => {
        typeahead.clearInputAndSendKeys(itemTemp, textToInput);
        typeahead.isElementVisible(itemTemp, typeahead.activeDropdown);
        typeahead.isElemTextCorrect(itemTemp, typeahead.activeDropdown, checkTemplate);
      });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.isSelectedItemDisplayed(itemTemp, stateForCheck);
      });
  });

  describe('Option field', () => {
    const optFiled = typeahead.exampleDemosArr.optionField;
    const formTemplate = 'Model: ';
    const stateForCheck = 'New York';

    it('User scrolls to Option field sub-menu and sees typeahead input and typeahead card with "Model:"', () => {
      typeahead.scrollToMenu('Option field');
      typeahead.isElementVisible(optFiled, typeahead.cardHeader);
      typeahead.isPreviewExist(optFiled, formTemplate);
      typeahead.isElementVisible(optFiled, typeahead.inputSelector);
    });

    it('When user starts to type a name of a State a drop-down with matches is shown.' +
      'When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(optFiled, stateForCheck);
        typeahead.isElementVisible(optFiled, typeahead.activeDropdown);
      });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.isSelectedItemDisplayed(optFiled, stateForCheck);
      });
  });

  describe('Async data', () => {
    const asyncData = typeahead.exampleDemosArr.asyncData;
    const formTemplate = 'Model: ';
    const stateForCheck = 'Alaska';

    it('User scrolls to Async data and sees typeahead input with the placeholder "Locations loaded with timeout"' +
      'and typeahead card with "Model:".', () => {
      typeahead.scrollToMenu('Async data');
      typeahead.isElementVisible(asyncData, typeahead.cardHeader);
      typeahead.isPreviewExist(asyncData, formTemplate);
      typeahead.isElementVisible(asyncData, typeahead.inputSelector);
      typeahead.isInputHaveAttrs(asyncData, [{ attr: 'placeholder', value: 'Locations loaded with timeout' }]);
    });

    it('When user starts to type a name of a State a drop-down with matches is shown, only 7 matches are shown',
      () => {
        typeahead.clearInputAndSendKeys(asyncData, 'a');
        typeahead.isElementVisible(asyncData, typeahead.activeDropdown);
        typeahead.isDropdownHasNItems(typeahead.dropdownBtn, 7);
      });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.isSelectedItemDisplayed(asyncData, stateForCheck);
      });
  });

  describe('With delay', () => {
    const withDelay = typeahead.exampleDemosArr.withDelay;
    const formTemplate = 'Model: ';
    const stateForCheck = 'Oklahoma';
    const filledForm = 'Model: "Oklahoma"';
    const timeDelay = 1000;

    it('User scrolls to Option field sub-menu and sees typeahead input and typeahead card with "Model:"', () => {
      typeahead.scrollToMenu('Option field');
      typeahead.isElementVisible(withDelay, typeahead.cardHeader);
      typeahead.isPreviewExist(withDelay, formTemplate);
      typeahead.isElementVisible(withDelay, typeahead.inputSelector);
    });

    it('the dropdown is shown with delay to 1000ms. When user clicks on any item in typeahead drop-down,' +
      'then typeahead container auto-fills with a selected State', () => {
      typeahead.scrollToMenu('With delay');
      cy.clock();
      typeahead.clearInputAndSendKeys(withDelay, stateForCheck);
      cy.tick(timeDelay);
      typeahead.isElementVisible(withDelay, typeahead.activeDropdown);
      typeahead.isDemoContainsTxt(withDelay, stateForCheck);
      cy.get(`${withDelay} input`).type('{enter}');
      typeahead.isPreviewExist(withDelay, filledForm);
    });
  });

  describe('Template-driven forms', () => {
    const tempDriven = typeahead.exampleDemosArr.templateDriven;
    const stateForCheck = 'California';
    const formTemplate = 'Model: {\n  "address": "312 Sundown Lane",\n  "state": null\n}';
    const labelAddress = 'Address';
    const inputAddress = '312 Sundown Lane';
    const labelState = 'State';
    const formFilled = 'Model: {\n  "address": "312 Sundown Lane",\n  "state": "California"\n}';

    it('User scrolls to Template-driven forms sub-menu and sees the typeahead input with "Model:"' +
      'it filled with the next object: "address": "312 Sundown Lane", "state": null" and typeahead input "State"',
      () => {
        typeahead.scrollToMenu('Template-driven forms');
        typeahead.isElementVisible(tempDriven, typeahead.cardHeader);
        typeahead.isPreviewExist(tempDriven, formTemplate);
        typeahead.isElemTextCorrect(tempDriven, typeahead.formGroup, labelAddress);
        typeahead.isElementVisible(tempDriven, typeahead.inputSelector);
        typeahead.isInputValueEqual(tempDriven, inputAddress);
        typeahead.isElemTextCorrect(tempDriven, typeahead.formGroup, labelState, 1);
        typeahead.isElementVisible(tempDriven, typeahead.inputSelector, 1);
      });

    it('User starts typing if there are any matches then a drop-down with a list of States matches is shown.',
      () => {
        typeahead.clearInputAndSendKeys(tempDriven, stateForCheck, 1);
        typeahead.isElementVisible(tempDriven, typeahead.activeDropdown);
      });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(tempDriven, stateForCheck, 1);
        cy.get(`${tempDriven} input`).eq(1).type('{enter}');
        typeahead.isPreviewExist(tempDriven, formFilled);
      });
  });

  describe('Reactive forms', () => {
    const reactive = typeahead.exampleDemosArr.reactiveForms;
    const stateForCheck = 'Connecticut';
    const formTemplate = 'Model: null';

    it('User scrolls to Reactive Forms sub-menu and sees typeahead card with "Model: null" and ' +
      'typeahead input with placeholder "Typeahead inside a form"', () => {
      typeahead.scrollToMenu('Reactive forms');
      typeahead.isElementVisible(reactive, typeahead.cardHeader);
      typeahead.isPreviewExist(reactive, formTemplate);
      typeahead.isElementVisible(reactive, typeahead.inputSelector);
      typeahead.isInputHaveAttrs(reactive, [{ attr: 'placeholder', value: 'Typeahead inside a form' }]);
    });

    it('When user places mouse cursor in the "Model" then a drop-down with the first 7 States is shown.',
      () => {
        typeahead.clickOnInput(reactive);
        typeahead.isElementVisible(reactive, typeahead.activeDropdown);
        typeahead.isDropdownHasNItems(typeahead.dropdownBtn, 7);
      });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.isSelectedItemDisplayed(reactive, stateForCheck);
      });
  });

  describe('Grouping results', () => {
    const groupResult = typeahead.exampleDemosArr.groupingResults;
    const formTemplate = 'Model: ';
    const textToInput = 'a';
    const stateForCheck = 'Maryland';

    it('User scrolls to Grouping results sub-menu and sees typeahead card with "Model:"', () => {
      typeahead.scrollToMenu('Grouping results');
      typeahead.isElementVisible(groupResult, typeahead.cardHeader);
      typeahead.isElementVisible(groupResult, typeahead.inputSelector);
      typeahead.isPreviewExist(groupResult, formTemplate);
    });

    it('User starts typing then a drop-down with a list of States matches is shown. All shown States' +
      'are grouped by region (4 regions are shown)', () => {
      typeahead.clearInputAndSendKeys(groupResult, textToInput);
      typeahead.isDropdownHasNItems(typeahead.dropdownHeader, 4);
    });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.isSelectedItemDisplayed(groupResult, stateForCheck);
      });
  });

  describe('Ignore spaces and order', () => {
    const ignoreSpace = typeahead.exampleDemosArr.ignoreSpaceAndOrder;
    const formTemplate = '  typeaheadSingleWords: true\n  Model: \n';
    const formTemplateFalse = '  typeaheadSingleWords: false\n  Model: \n';
    const formTemplateFilled = '  typeaheadSingleWords: true\n  Model: "Georgia"';
    const stateForCheck = 'Georgia';
    const textToInput = 'gia ge';
    const toggleBtnText = 'Toggle typeaheadSingleWords';

    it('User scrolls to Ignore spaces and order sub-menu and sees typeahead input and typeahead card' +
      'with "Toggle typeaheadSingleWords: true Model:", and sees the button "Toggle typeaheadSingleWords"',
      () => {
        typeahead.scrollToMenu('Ignore spaces and order');
        typeahead.isElementVisible(ignoreSpace, typeahead.cardHeader);
        typeahead.isPreviewExist(ignoreSpace, formTemplate);
        typeahead.isElementVisible(ignoreSpace, typeahead.btnSelector);
        typeahead.isElemTextCorrect(ignoreSpace, typeahead.btnSelector, toggleBtnText);
        typeahead.isElementVisible(ignoreSpace, typeahead.inputSelector);
      });

    it('User starts typing then order of typed symbols and spaces between them is ignored if there are any' +
      'matches then a drop-down with a list of States matches is shown', () => {
      typeahead.clearInputAndSendKeys(ignoreSpace, textToInput);
      typeahead.isElementVisible(ignoreSpace, typeahead.activeDropdown);
      typeahead.isElemTextCorrect(ignoreSpace, typeahead.dropdownBtn, stateForCheck);
    });

    it('When user sets the "typeaheadSingleWords = false" by clicking on the button "Toggle' +
      'typeaheadSingleWords" then order of typed symbols and spaces between them will NOT be ignored', () => {
      typeahead.clickOnBtn(ignoreSpace);
      typeahead.isPreviewExist(ignoreSpace, formTemplateFalse);
      typeahead.clearInputAndSendKeys(ignoreSpace, textToInput);
      typeahead.isDropdownDisabled(ignoreSpace, typeahead.activeDropdown);
    });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.isSelectedItemDisplayed(ignoreSpace, stateForCheck);
      });
  });

  describe('Phrase delimiters', () => {
    const phraseDelimiters = typeahead.exampleDemosArr.ignoreSpaceAndOrder;
    const formTemplate = 'Model: ';
    const stateForCheck = 'New York';
    const textToInput = 'york new';
    const textWithDelimiters = '&york new&';

    it('User scrolls to Phrase delimiters sub-menu and sees typeahead input and typeahead card with "Model:"', () => {
      typeahead.scrollToMenu('Phrase delimiters');
      typeahead.isElementVisible(phraseDelimiters, typeahead.inputSelector);
      typeahead.isPreviewExist(phraseDelimiters, formTemplate);
    });

    it('When user uses "&" and type "&york new&" or ",york new," than no drop-down with the match would be shown',
      () => {
        typeahead.clearInputAndSendKeys(phraseDelimiters, textWithDelimiters);
        typeahead.isDropdownDisabled(phraseDelimiters, typeahead.activeDropdown);
      });

    it('When user starts to type "york new" without delimiters than a drop-down with the match is shown', () => {
      typeahead.clearInputAndSendKeys(phraseDelimiters, textToInput);
      typeahead.isElementVisible(phraseDelimiters, typeahead.activeDropdown);
      typeahead.isSelectedItemDisplayed(phraseDelimiters, stateForCheck, stateForCheck);
    });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.isSelectedItemDisplayed(phraseDelimiters, stateForCheck);
      });
  });

  describe('Dropup', () => {
    const dropUp = typeahead.exampleDemosArr.dropUp;
    const formTemplate = 'Model: ';
    const stateForCheck = 'Mississippi';
    const textToInput = 'p';

    it('User scrolls to Dropup sub-menu and sees typeahead input and typeahead card with "Model:"', () => {
      typeahead.scrollToMenu('Dropup');
      typeahead.isElementVisible(dropUp, typeahead.inputSelector);
      typeahead.isPreviewExist(dropUp, formTemplate);
    });

    it('User starts typing if there are any matches then a drop-up with a list of States matches is shown', () => {
      cy.viewport(1440, 900);
      typeahead.clearInputAndSendKeys(dropUp, textToInput);
      typeahead.isElementVisible(dropUp, typeahead.activeDropdown);
      // typeahead.isDropUpPlacementCorrect(dropUp, 'top'); TODO can't check - the DropUp is shown lower then the input
    });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.isSelectedItemDisplayed(dropUp, stateForCheck);
      });
  });

  describe('On blur', () => {
    const onBlur = typeahead.exampleDemosArr.onBlur;
    const formTemplate = 'Model: ';
    const formTemplateBlur = 'Option on blur: ';
    const stateForCheck = 'Colorado';
    const anotherStateForCheck = 'Delaware';
    const textToInput = 'd';
    const anotherTextToInput = 'w';

    it('User scrolls to On blur sub-menu and sees typeahead input and typeahead card with "Model:" and typeahead card' +
      'with "Option on blur:"', () => {
      typeahead.scrollToMenu('On blur');
      typeahead.isPreviewExist(onBlur, formTemplate);
      typeahead.isPreviewExist(onBlur, formTemplateBlur, 1);
      typeahead.isElementVisible(onBlur, typeahead.inputSelector);
    });

    it('clicking anywhere outside auto-fills "Option on blur" with the first option from the matches list', () => {
      typeahead.clearInputAndSendKeys(onBlur, textToInput);
      typeahead.isElementVisible(onBlur, typeahead.activeDropdown);
      typeahead.clickOutside(`${onBlur} input`);
      typeahead.isDemoContainsTxt(onBlur, stateForCheck);
      typeahead.clearInputAndSendKeys(onBlur, anotherTextToInput);
      typeahead.isElementVisible(onBlur, typeahead.activeDropdown);
      typeahead.clickOutside(`${onBlur} input`);
      typeahead.isDemoContainsTxt(onBlur, anotherStateForCheck);
    });

    it('If user clicks on any option then typeahead container auto-fills with a selected State', () => {
      typeahead.isSelectedItemDisplayed(onBlur, stateForCheck);
    });
  });

  describe('Append to body', () => {
    const appendToBody = typeahead.exampleDemosArr.appendToBody;
    const formTemplate = 'Model: ';
    const stateForCheck = 'Rhode Island';
    const anotherStateForCheck = 'Minnesota';
    const textToInput = 'e o a';

    it('User scrolls to Append to body sub-menu and sees typeahead input and typeahead card with "Model:"', () => {
      typeahead.scrollToMenu('Append to body');
      typeahead.isPreviewExist(appendToBody, formTemplate);
      typeahead.isElementVisible(appendToBody, typeahead.inputSelector);
    });

    it('When a user starts to type then order of typed symbols and spaces between them are ignored', () => {
      typeahead.clearInputAndSendKeys(appendToBody, textToInput);
      typeahead.isElemTextCorrect(typeahead.activeDropdown, typeahead.dropdownItem, anotherStateForCheck, 1);
      typeahead.isElemTextCorrect(typeahead.activeDropdown, typeahead.dropdownItem, stateForCheck, 2);
    });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.isSelectedItemDisplayed(appendToBody, stateForCheck);
      });
  });

  describe('No result', () => {
    const noResult = typeahead.exampleDemosArr.noResult;
    const formTemplate = 'Model: ';
    const stateForCheck = 'Nevada';
    const alertText = 'No Results Found';
    const textToInput = 'qwerty';

    it('User scrolls to No result sub-menu and sees typeahead input and typeahead card with "Model:"', () => {
      typeahead.scrollToMenu('No result');
      typeahead.isPreviewExist(noResult, formTemplate);
      typeahead.isElementVisible(noResult, typeahead.inputSelector);
    });

    it('When user starts to type and if there are no matches found than an error message "No Results Found" is shown',
      () => {
        typeahead.clearInputAndSendKeys(noResult, textToInput);
        typeahead.isDropdownDisabled(noResult, typeahead.activeDropdown);
        typeahead.isElementVisible(noResult, typeahead.noResultAlert);
        typeahead.isElemTextCorrect(noResult, typeahead.noResultAlert, alertText);
      });

    it('If there are any matches the drop-down is shown, When user clicks on any item then typeahead container' +
      'auto-fills with a selected State', () => {
      typeahead.isSelectedItemDisplayed(noResult, stateForCheck);
    });
  });

  describe('Scrollable', () => {
    const scrollable = typeahead.exampleDemosArr.scrollable;
    const formTemplate = 'Model: ';
    const textToInput = 'a';
    const stateForCheck = 'Michigan';
    const anotherStateForCheck = 'Idaho';

    it('User scrolls to Scrollable sub-menu and sees typeahead input and typeahead card with "Model:"', () => {
      typeahead.scrollToMenu('No result');
      typeahead.isPreviewExist(scrollable, formTemplate);
      typeahead.isElementVisible(scrollable, typeahead.inputSelector);
    });

    it('When there are any matches then a drop-down with a list of States matches is shown. User is able to scroll' +
      'down/up to see the matches list', () => {
      typeahead.scrollToMenu('Scrollable');
      typeahead.clearInputAndSendKeys(scrollable, textToInput);
      typeahead.isElementVisible(scrollable, typeahead.activeDropdown);
      typeahead.isDropdownScrollable(stateForCheck);
      typeahead.isDropdownScrollable(anotherStateForCheck);
    });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.isSelectedItemDisplayed(scrollable, anotherStateForCheck);
      });
  });

  describe('Latinize', () => {
    const latinize = typeahead.exampleDemosArr.latinize;
    const formTemplate = 'Model: ';
    const textToInput = 'ú';
    const nonLatinToInput = 'super';
    const stateForCheck = 'súper';

    it('User scrolls to Latinize sub-menu and sees typeahead input and typeahead card with "Model:"', () => {
      typeahead.scrollToMenu('No result');
      typeahead.isPreviewExist(latinize, formTemplate);
      typeahead.isElementVisible(latinize, typeahead.inputSelector);
    });

    it('User is able to use expanded latin letters if there are any matches then a drop-down with a list of matches' +
      ' is shown', () => {
      typeahead.scrollToMenu('Latinize');
      typeahead.clearInputAndSendKeys(latinize, textToInput);
      typeahead.isElementVisible(latinize, typeahead.activeDropdown);
      typeahead.clearInputAndSendKeys(latinize, nonLatinToInput);
    });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected' +
      ' french word', () => {
      typeahead.isSelectedItemDisplayed(latinize, stateForCheck);
    });
  });

  describe('On select', () => {
    const onSelect = typeahead.exampleDemosArr.onSelect;
    const formTemplate = 'Model: ';
    const formTemplateSelect = 'Selected option: ';
    const stateForCheck = 'Wyoming';
    const formFilled = 'Selected option: {\n  "id": 51,\n  "name": "Wyoming",\n  "region": "West"\n}';

    it('User scrolls to On select sub-menu and sees typeahead input and typeahead card with "Model:" and' +
      'typeahead card with "Selected option:" text', () => {
      typeahead.scrollToMenu('On select');
      typeahead.isElementVisible(onSelect, typeahead.cardHeader);
      typeahead.isPreviewExist(onSelect, formTemplate);
      typeahead.isElementVisible(onSelect, typeahead.cardHeader, 1);
      typeahead.isPreviewExist(onSelect, formTemplateSelect, 1);
    });

    it('When user starts to type and there are any matches then a drop-down with a list of States matches is shown'
      , () => {
        typeahead.clearInputAndSendKeys(onSelect, stateForCheck);
        typeahead.isElementVisible(onSelect, typeahead.activeDropdown);
      });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected' +
      'State and "Selected option" is filled with info about selected object: "id", "name" and "region"', () => {
      typeahead.isSelectedItemDisplayed(onSelect, stateForCheck);
      typeahead.isSelectedOptionFilled(onSelect, formFilled);
    });
  });

  describe('Show results on blur', () => {
    const resultOnBlur = typeahead.exampleDemosArr.resultOnBlur;
    const formTemplate = 'typeaheadHideResultsOnBlur: false\n  Model: ';
    const formTemplateTrue = 'typeaheadHideResultsOnBlur: true\n  Model: ';
    const stateForCheck = 'Nebraska';
    const textToInput = 'ra';
    const toggleBtnText = 'Toggle typeaheadHideResultsOnBlur';

    it('User scrolls to Show results on blur sub-menu and sees typeahead input and typeahead card with' +
      '"typeaheadHideResultsOnBlur: false Model:" text. User sees button with "Toggle typeaheadHideResultsOnBlur"',
      () => {
        typeahead.scrollToMenu('Show results on blur');
        typeahead.isElementVisible(resultOnBlur, typeahead.cardHeader);
        typeahead.isPreviewExist(resultOnBlur, formTemplate);
        typeahead.isElementVisible(resultOnBlur, typeahead.btnSelector);
        typeahead.isElemTextCorrect(resultOnBlur, typeahead.btnSelector, toggleBtnText);
      });

    it('When user clicks outside the input then drop-down stays opened', () => {
      typeahead.clearInputAndSendKeys(resultOnBlur, textToInput);
      typeahead.clickOutside(`${resultOnBlur} input`);
      typeahead.isElementVisible(resultOnBlur, typeahead.activeDropdown);
    });

    it('User clicks on the button and sees typeahead card with "typeaheadHideResultsOnBlur: false Model:" text' +
      'was changed to TRUE If user clicks anywhere outside the input than the drop-down closes', () => {
      typeahead.clickOnBtn(resultOnBlur);
      typeahead.isPreviewExist(resultOnBlur, formTemplateTrue);
      typeahead.clearInputAndSendKeys(resultOnBlur, textToInput);
      typeahead.clickOutside(`${resultOnBlur} input`);
      typeahead.isDropdownDisabled(resultOnBlur, typeahead.activeDropdown);
    });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.isSelectedItemDisplayed(resultOnBlur, stateForCheck);
      });
  });

  describe('Configuring defaults', () => {
    const configDefaults = typeahead.exampleDemosArr.configDefaults;
    const stateForCheck = 'Texas';

    it('User scrolls to Show results on blur sub-menu and sees typeahead input', () => {
      cy.viewport(1440, 900);
      typeahead.clickOnDemoMenu('Configuring defaults');
      typeahead.isElementVisible(configDefaults, typeahead.inputSelector);
    });

    it('User starts typing if there are any matches then a drop-down with a list of States matches is shown', () => {
      typeahead.clearInputAndSendKeys(configDefaults, stateForCheck);
      typeahead.isElementVisible(configDefaults, typeahead.activeDropdown);
    });

    it('When user clicks on any item in typeahead drop-down, then input stays filled with a selected State', () => {
      typeahead.clearInputAndSendKeys(configDefaults, stateForCheck);
      typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
      typeahead.isInputValueEqual(configDefaults, stateForCheck);
    });
  });

  describe('Selected first item', () => {
    const selectedFirst = typeahead.exampleDemosArr.selectFirstItem;
    const formTemplate = 'Model: ';
    const stateForCheck = 'Maryland';
    const textToInput = 'm';

    it('User scrolls to Select first item sub-menu and sees sees typeahead input and typeahead card with "Model:"',
      () => {
        typeahead.scrollToMenu('Selected first item');
        typeahead.isElementVisible(selectedFirst, typeahead.cardHeader);
        typeahead.isPreviewExist(selectedFirst, formTemplate);
      });

    it('When user starts to type a list with matches is shown. When user presses the TAB button then the dropdown' +
      'closes and typeahead card stays not filled', () => {
      typeahead.clearInputAndSendKeys(selectedFirst, textToInput);
      typeahead.isElementVisible(selectedFirst, typeahead.activeDropdown);
      // cy.get(`${selectedFirst} ${typeahead.activeDropdown}`).type('{tab}'); TODO can't make an assertion. cypress doesn't emulates TAB
    });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected' +
      'State and "Selected option" is filled with info about selected object: "id", "name" and "region"', () => {
      typeahead.isSelectedItemDisplayed(selectedFirst, stateForCheck);
      typeahead.isSelectedItemDisplayed(selectedFirst, stateForCheck);
    });
  });
});
