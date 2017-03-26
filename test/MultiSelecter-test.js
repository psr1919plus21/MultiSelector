import {expect} from 'chai';
let beautify_html = require('js-beautify').html;
let jsdom = require('jsdom').jsdom;
let MultiSelector = require('../src/app/components/MultiSelector').default;
let plainSelect;
let placeholderSelect;

beforeEach(function() {
  global.document = jsdom();
  _createPlainSelect();
  _createSelectWithPlaceholder();
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









