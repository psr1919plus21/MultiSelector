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
    let that = this;
    let msSelector;
    let msTitle;
    let msPlaceholder;
    let msTitleTextNode;
    let msDropDown;
    let msItems;

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

    this.ui.msOption.forEach((option) => {
      let msItem = document.createElement('li');
      msItem.classList.add('ms-dropdown__item');
      let optionTextNode = document.createTextNode(option.innerHTML.trim());
      let optionValue = option.getAttribute('value');
      msItem.appendChild(optionTextNode);
      msItem.setAttribute('data-value', optionValue);
      msDropDown.appendChild(msItem);
    });
    msItems = msDropDown.querySelectorAll('.ms-dropdown__item');


    msTitle.appendChild(msTitleTextNode);
    msSelector.appendChild(msTitle);
    msSelector.appendChild(msDropDown);

    this.el.parentNode.insertBefore(msSelector, this.el);

    // Events.
    msTitle.addEventListener('click', toggleSelector);
    msItems.forEach((item) => {
      item.addEventListener('click', selectItem);
    });

    function toggleSelector() {
       msSelector.classList.toggle('ms-wrapper_active');
    }

    function selectItem() {
      let dataValue = this.getAttribute('data-value');
      let dataTitle = this.innerHTML;

      dropDownClose();

      setTimeout(() => {
        msTitle.textContent = dataTitle;
        clearSelectedOptions();
        this.classList.add('ms-dropdown__item_active');
        that.el.value = dataValue;
      }, 300);

    }

    function dropDownClose() {
      msSelector.classList.remove('ms-wrapper_active');
    }

    function clearSelectedOptions() {
      msItems.forEach((option) => {
        option.classList.remove('ms-dropdown__item_active');
      });
    }
  }



}





















