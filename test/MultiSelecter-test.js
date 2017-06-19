import {expect} from 'chai';
let beautify_html = require('js-beautify').html;
let JSDOM = require('jsdom').JSDOM;
let jsdom = new JSDOM();

let MultiSelector = require('../src/app/components/MultiSelector').default;
let plainSelect;
let placeholderSelect;
let multipleSelect;
let multipleSelectNoPlaceholder;
let multipleSelectWithOptgroups;

beforeEach(function() {
  global.document = jsdom.window.document;
  _createPlainSelect();
  _createSelectWithPlaceholder();
  _createSelectMultiple();
  _createSelectMultipleNoPlaceholder();
  _createSelectWithOptgroups();

});

describe('MultiSelector', function() {
  it('shoud exist select in jsdom', function() {
    expect(plainSelect.tagName).to.equal('SELECT');
  });

  it('should hide native element', function() {
    new MultiSelector({
      el: plainSelect
    });
    expect(plainSelect.style.display).to.equal('none');
  });


  it('should have four li items', function() {
    let selectorInstance = new MultiSelector({
      el: plainSelect
    });
    expect(selectorInstance.msItems[0].tagName).to.equal('LI');
    expect(selectorInstance.msItems.length).to.equal(4);
  })

  it('shoud have placeholder', function() {
    let selectorInstance = new MultiSelector({
      el: placeholderSelect
    });
    let placeholder = selectorInstance.ui.msPlaceholder[0].innerHTML;
    expect(placeholder).to.equal('Select your turtle');
  })

  it('shoud change title while select item', function(done) {
    let selectorInstance = new MultiSelector({
      el: placeholderSelect
    });

    selectorInstance.msTitle.click();
    selectorInstance.msItems[0].click();
    setTimeout(() => {
      let title = selectorInstance.msTitleText.innerHTML;
      expect(title).to.equal('Leonardo');
      done();
    }, 300);
  });

  it('shoud change select value', function(done) {
    let selectorInstance = new MultiSelector({
      el: placeholderSelect
    });

    selectorInstance.msTitle.click();
    selectorInstance.msItems[0].click();
    setTimeout(() => {
      let expected = ['leonardo'];
      let actual = selectorInstance.getValue();
      expect(expected).to.deep.equal(actual);
      done();
    }, 300);
  });

  it('shoud select multiple items', function(done) {
    let selectorInstance = new MultiSelector({
      el: multipleSelect
    });
     selectorInstance.msItems[0].click();
     selectorInstance.msItems[1].click();
    setTimeout(() => {
      let expected = ['leonardo', 'donatello'];
      let actual = selectorInstance.getValue();
      expect(expected).to.deep.equal(actual);
      done();
    }, 300);
  })

  it('shoud return empty array on first load', function() {
    let selectorInstance = new MultiSelector({
      el: placeholderSelect
    });
    let expected = [];
    let actual = selectorInstance.getValue();
    expect(expected).to.deep.equal(actual);

  });

  it('shoud have select all button', function() {
    let selectorInstance = new MultiSelector({
      el: multipleSelect,
      settings: {
        selectAll: true
      }
    });
    let selectAllBtn = selectorInstance.msSelectAll;
    let expected = 'LI';
    let actual = selectAllBtn.tagName;
    expect(expected).to.equal(actual);
  })

  it('shoud select all items by button', function() {
    let selectorInstance = new MultiSelector({
      el: multipleSelect,
      settings: {
        selectAll: true
      }
    });
    let selectAllBtn = selectorInstance.msSelectAll;
    selectAllBtn.click();
    let expected = ['leonardo', 'donatello', 'michelangelo', 'raphael'];
    let actual = selectorInstance.getValue();
    expect(expected).to.deep.equal(actual);
  })

  it('shoud add disabled class to select all button.', function() {
    let selectorInstance = new MultiSelector({
      el: multipleSelect,
      settings: {
        selectAll: true
      }
    });
    let selectAllBtn = selectorInstance.msSelectAll;
    selectAllBtn.click();
    let expected = true;
    let actual = selectAllBtn.classList.contains('ms-dropdown__select-all_active');
    expect(expected).to.equal(actual);
  })

  it('shoud remove disabled class from select all button after deselect one of items.', function() {
    let selectorInstance = new MultiSelector({
      el: multipleSelect,
      settings: {
        selectAll: true
      }
    });
    let selectAllBtn = selectorInstance.msSelectAll;
    let firstOption = selectorInstance.msItems[0];
    selectAllBtn.click();
    firstOption.click();
    let expected = false;
    let actual = selectAllBtn.classList.contains('ms-dropdown__select-all_active');
    expect(expected).to.equal(actual);
  })

  it('shoud set disabled class on select all button after select all items.', function(done) {
    let selectorInstance = new MultiSelector({
      el: multipleSelect,
      settings: {
        selectAll: true
      }
    });
    let selectAllBtn = selectorInstance.msSelectAll;
    let firstOption = selectorInstance.msItems[0];
    selectAllBtn.click();
    firstOption.click();
    setTimeout(function() {
      firstOption.click();
      setTimeout(function() {
        let expected = true;
        let actual = selectAllBtn.classList.contains('ms-dropdown__select-all_active');
        expect(expected).to.equal(actual);
        done();
      }, 300);
    }, 600);
  })

  it('shoud toggle all if selectAllToggle settings', function() {
    let selectorInstance = new MultiSelector({
      el: multipleSelect,
      settings: {
        selectAll: true,
        selectAllToggle: true
      }
    });
    let selectAllBtn = selectorInstance.msSelectAll;
    selectAllBtn.click();
    selectAllBtn.click();
    let expected = [];
    let actual = selectorInstance.getValue();
    expect(expected).to.deep.equal(actual);
  })

  it('shoud set placeholder to title after select all unselect.', function() {
    let selectorInstance = new MultiSelector({
      el: multipleSelect,
      settings: {
        selectAll: true,
        selectAllToggle: true
      }
    });
    let selectAllBtn = selectorInstance.msSelectAll;
    selectAllBtn.click();
    selectAllBtn.click();
    let expected = 'Select your turtle';
    let actual = selectorInstance.msTitleText.textContent;
    expect(expected).to.equal(actual);
  })

  it('shoud set placeholder to title after select all unselect (no placeholder select).', function() {
    let selectorInstance = new MultiSelector({
      el: multipleSelectNoPlaceholder,
      settings: {
        selectAll: true,
        selectAllToggle: true
      }
    });
    let selectAllBtn = selectorInstance.msSelectAll;
    selectAllBtn.click();
    selectAllBtn.click();
    let expected = 'Select all';
    let actual = selectorInstance.msTitleText.textContent;
    expect(expected).to.equal(actual);
  })

  it('shoud set unselectAll text.', function() {
    let selectorInstance = new MultiSelector({
      el: multipleSelectNoPlaceholder,
      settings: {
        selectAll: true,
        selectAllToggle: true,
        unselectAllText: 'drop'
      }
    });
    let selectAllBtn = selectorInstance.msSelectAll;
    selectAllBtn.click();
    let expected = 'drop';
    let actual = selectAllBtn.textContent;
    expect(expected).to.equal(actual);
  })

  it('shoud set selectAll text after unselect item.', function() {
    let selectorInstance = new MultiSelector({
      el: multipleSelectNoPlaceholder,
      settings: {
        selectAll: true,
        selectAllToggle: true,
        selectAllText: 'all'
      }
    });
    let firstOption = selectorInstance.msItems[0];
    let selectAllBtn = selectorInstance.msSelectAll;
    selectAllBtn.click();
    firstOption.click();
    let expected = 'all';
    let actual = selectAllBtn.textContent;
    expect(expected).to.equal(actual);
  })

  it('shoud exist select with optgroups in DOM.', function() {
    let optgroup = multipleSelectWithOptgroups.querySelectorAll('optgroup')[0].tagName;
    let expected = 'OPTGROUP';
    let actual = optgroup;
    expect(expected).to.equal(actual);
  })

  it('shoud exist optgroups in MultiSelector.', function() {
    let selectorInstance = new MultiSelector({
      el: multipleSelectWithOptgroups
    });
    let msOptgroup = selectorInstance.msOptgroups[0];


    let expected = msOptgroup.classList.contains('ms-optgroup');
    let actual = true;
    expect(expected).to.equal(actual);
  })

  it('shoud select all optgroups items by click on optgroup title', function() {
    let selectorInstance = new MultiSelector({
      el: multipleSelectWithOptgroups
    });
    let msOptgroup = selectorInstance.msOptgroups[0];
    let msOptgroupLabel = msOptgroup.textContent;
    let currentGroupItems = selectorInstance.msOptgroupItems[msOptgroupLabel];
    msOptgroup.click();
    let expected = true;
    let actual = currentGroupItems.every((item) => {
      return item.classList.contains('ms-dropdown__item_active');
    });
    expect(expected).to.equal(actual);
  })

  it('shoud unselect all optgroups items by secondary click on optgroup title', function() {
    let selectorInstance = new MultiSelector({
      el: multipleSelectWithOptgroups
    });
    let msOptgroup = selectorInstance.msOptgroups[0];
    let msOptgroupLabel = msOptgroup.textContent;
    let currentGroupItems = selectorInstance.msOptgroupItems[msOptgroupLabel];
    msOptgroup.click();
    msOptgroup.click();
    let expected = false;
    let actual = currentGroupItems.every((item) => {
      return item.classList.contains('ms-dropdown__item_active');
    });
    expect(expected).to.equal(actual);
  })

  it('shoud set select all title when all items select by optgroups', () => {
    let selectorInstance = new MultiSelector({
      el: multipleSelectWithOptgroups
    });
    let msOptgroups = selectorInstance.msOptgroups;
    msOptgroups.forEach((optgroup) => optgroup.click());

    let expected = selectorInstance.settings.allSelectedPlaceholder;
    let actual = selectorInstance.msTitle.textContent;
    expect(expected).to.equal(actual);
  });

  it('shoud set separate optgroups to selector title', () => {
    let selectorInstance = new MultiSelector({
      el: multipleSelectWithOptgroups,
      settings: {
        optgroupsSeparator: ' and '
      }
    });
    let msOptgroups = selectorInstance.msOptgroups;
    msOptgroups[0].click();
    msOptgroups[1].click();

    let expected = msOptgroups[0].textContent + ' and ' + msOptgroups[1].textContent
    let actual = selectorInstance.msTitle.textContent;
    expect(expected).to.equal(actual);
  });

  it('shoud set separate optgroups to selector title when unselect one of it', () => {
    let selectorInstance = new MultiSelector({
      el: multipleSelectWithOptgroups,
    });
    let msOptgroups = selectorInstance.msOptgroups;
    // msOptgroups.forEach((optgroup) => optgroup.click());
    msOptgroups[0].click();
    msOptgroups[1].click();
    msOptgroups[2].click();
    msOptgroups[2].click();

    let expected = msOptgroups[0].textContent + ', ' + msOptgroups[1].textContent
    let actual = selectorInstance.msTitle.textContent;
    expect(expected).to.equal(actual);
  });


});

function _createPlainSelect() {
  let selectData = ['Leonardo', 'Donatello', 'Michelangelo', 'Raphael'];
  let selectWrapper = document.createElement('div');
  plainSelect = document.createElement('select');

  selectData.forEach((item) => {
    let normalizedItem = item.trim().toLowerCase();
    let option = document.createElement('option');
    let optionText = document.createTextNode(item);
    option.setAttribute('value', normalizedItem);
    option.appendChild(optionText);
    plainSelect.appendChild(option);
  })

  selectWrapper.appendChild(plainSelect);
}

function _createSelectWithPlaceholder() {
  let placeholderText = 'Select your turtle';
  let selectData = ['Leonardo', 'Donatello', 'Michelangelo', 'Raphael'];
  let selectWrapper = document.createElement('div');
  placeholderSelect = document.createElement('select');

  let option = document.createElement('option');
  let optionText = document.createTextNode(placeholderText);
  option.setAttribute('value', '');
  option.appendChild(optionText);
  placeholderSelect.appendChild(option);

  selectData.forEach((item) => {
    let normalizedItem = item.trim().toLowerCase();
    let option = document.createElement('option');
    let optionText = document.createTextNode(item);
    option.setAttribute('value', normalizedItem);
    option.appendChild(optionText);
    placeholderSelect.appendChild(option);
  })

  selectWrapper.appendChild(placeholderSelect);
}

function _createSelectMultiple() {
  let placeholderText = 'Select your turtle';
  let selectData = ['Leonardo', 'Donatello', 'Michelangelo', 'Raphael'];
  let selectWrapper = document.createElement('div');
  multipleSelect = document.createElement('select');
  multipleSelect.setAttribute('multiple', true);


  let option = document.createElement('option');
  let optionText = document.createTextNode(placeholderText);
  option.setAttribute('value', '');
  option.appendChild(optionText);
  multipleSelect.appendChild(option);

  selectData.forEach((item) => {
    let normalizedItem = item.trim().toLowerCase();
    let option = document.createElement('option');
    let optionText = document.createTextNode(item);
    option.setAttribute('value', normalizedItem);
    option.appendChild(optionText);
    multipleSelect.appendChild(option);
  })

  selectWrapper.appendChild(multipleSelect);
}

function _createSelectMultipleNoPlaceholder() {
  let selectData = ['Leonardo', 'Donatello', 'Michelangelo', 'Raphael'];
  let selectWrapper = document.createElement('div');
  multipleSelectNoPlaceholder = document.createElement('select');
  multipleSelectNoPlaceholder.setAttribute('multiple', true);

  selectData.forEach((item) => {
    let normalizedItem = item.trim().toLowerCase();
    let option = document.createElement('option');
    let optionText = document.createTextNode(item);
    option.setAttribute('value', normalizedItem);
    option.appendChild(optionText);
    multipleSelectNoPlaceholder.appendChild(option);
  })

  selectWrapper.appendChild(multipleSelectNoPlaceholder);
}

function _createSelectWithOptgroups() {
  let selectData = [
    {
      optgroupName: ' cAts',
      optgroupItems: ['Tom', 'Sylvester', 'Felix', 'Garfield']
    },
    {
      optgroupName: 'dogs   ',
      optgroupItems: ['Spyke', 'Bethoween', 'Scooby-Do', 'Bascerweil']
    },
    {
      optgroupName: 'apes',
      optgroupItems: ['Gorilla', 'Bonobo', 'HomoSapiens', 'Proconsule']
    }

  ];

  let selectWrapper = document.createElement('div');
  multipleSelectWithOptgroups = document.createElement('select');
  multipleSelectWithOptgroups.setAttribute('multiple', true);

  selectData.forEach((item, index) => {
    let optgroup = document.createElement('optgroup');
    optgroup.setAttribute('label', item.optgroupName);

    item.optgroupItems.forEach((optgroupItem) => {
      let normalizedItem = optgroupItem.trim().toLowerCase();
      let option = document.createElement('option');
      let optionText = document.createTextNode(optgroupItem);
      option.setAttribute('value', normalizedItem);
      option.appendChild(optionText);
      optgroup.appendChild(option);
    });

    multipleSelectWithOptgroups.appendChild(optgroup);
  })

  selectWrapper.appendChild(multipleSelectWithOptgroups);
}
