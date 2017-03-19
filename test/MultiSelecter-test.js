import {expect} from 'chai';
let beautify_html = require('js-beautify').html;
let jsdom = require('jsdom').jsdom;
let MultiSelector = require('../src/app/components/MultiSelector').default;
let select;

beforeEach(function() {
  global.document = jsdom();
  _createPlainSelect();
});

describe('MultiSelector', function() {
  it('shoud exist select in jsdom', function() {
    expect(select.tagName).to.equal('SELECT');
  });

  it('should hide native element', function() {
    new MultiSelector({
      el: select
    });
    expect(select.style.display).to.equal('none');
  });

  it('should have four li items', function() {
    let selectorInstance = new MultiSelector({
      el: select
    });
    expect(selectorInstance.msItems[0].tagName).to.equal('LI');
    expect(selectorInstance.msItems.length).to.equal(4);
  })

});

function _createPlainSelect() {
  let selectData = ['Leonardo', 'Donatello', 'Michelangelo', 'Raphael'];
  let selectWrapper = document.createElement('div');
  select = document.createElement('select');

  selectData.forEach((item) => {
    let normalizedItem = item.trim().toLowerCase();
    let option = document.createElement('option');
    let optionText = document.createTextNode(item);
    option.setAttribute('value', normalizedItem);
    option.appendChild(optionText);
    select.appendChild(option);
  })

  selectWrapper.appendChild(select);
}
