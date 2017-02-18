import Component from './Component';

require('../../scss/main.scss');
require('../../scss/MultiSelector.scss');

export default class MultiSelector extends Component {

  preInitialize() {
    this.ui = {
      msPlaceholder: 'option[value=""]',
      msOption: 'option:not([value=""])',
      msOptgroup: 'optgroup'
    }
  }

  afterInitialize() {
    let msSelector;
    let msTitle;
    let msPlaceholder;
    let msTitleTextNode;
    let msDropDown;

    this.el.style.display = 'none';
    // MultiSelector wrapper.
    msSelector = document.createElement('div');
    msSelector.classList.add('ms-wrapper');

    //MultiSelector title
    msTitle = document.createElement('div');
    msTitle.classList.add('ms-title');


    // MultiSelector placeholder.
    if (this.ui.msPlaceholder.length) {
      msTitleTextNode = document.createTextNode(this.ui.msPlaceholder[0].text);
    } else if (this.ui.msOption.length) {
      msTitleTextNode = document.createTextNode(this.ui.msOption[0].text);
    }

    // Multiselector dropdown.
    msDropDown = document.createElement('ul');
    msDropDown.classList.add('ms-dropdown');

    let options = [];
    this.ui.msOption.forEach((option) => {
      let msItem = document.createElement('li');
      msItem.classList.add('ms-dropdown__item');
      let optionTextNode = document.createTextNode(option.innerHTML.trim());
      msItem.appendChild(optionTextNode);
      msDropDown.appendChild(msItem);
    })

    msTitle.appendChild(msTitleTextNode);
    msSelector.appendChild(msTitle);
    msSelector.appendChild(msDropDown);

    this.el.parentNode.insertBefore(msSelector, this.el);

    // Events.
    msTitle.addEventListener('click', toggleSelector);

    function toggleSelector() {
       msSelector.classList.toggle('ms-wrapper_active');
    }

  }

}





















