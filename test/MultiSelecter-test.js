import {expect} from 'chai';
let jsdom = require('jsdom').jsdom;
let MultiSelector = require('../src/app/components/MultiSelector').default;

global.document = jsdom();

console.log(MultiSelector);

describe('MultiSelector', function() {

  it('should run jsdom', function() {

    var selectWrapper = document.createElement('div');
    var select = document.createElement('select');
    var option = document.createElement('option');
    var optionText = document.createTextNode('Leonardo');
    option.appendChild(optionText);

    select.appendChild(option);
    selectWrapper.appendChild(select);
    console.log(select);
    var plainSelect = new MultiSelector({
      el: select
    });

    console.log('plainSelect');
    console.log(plainSelect);
    console.log('selectWrapper');
    console.log(selectWrapper.childNodes[0].childNodes);
    expect(true).to.equal(true);
  });
});
