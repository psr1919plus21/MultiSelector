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
    this.msTitle = document.createElement('div');
    this.msTitle.classList.add('ms-title');
    this.msTitleText = document.createElement('div');
    this.msTitleText.classList.add('ms-title__text');
    this.msTitle.appendChild(this.msTitleText);


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


    this.msTitleText.appendChild(msTitleTextNode);
    msSelector.appendChild(this.msTitle);
    msSelector.appendChild(msDropDown);

    this._setCustomTitleIcon.call(this);

    this.el.parentNode.insertBefore(msSelector, this.el);




    // Events.
    this.msTitle.addEventListener('click', toggleSelector);
    msItems.forEach((item) => {
      item.addEventListener('click', selectItem);
    });

    function toggleSelector() {
      let customTitleIcon = that.msTitle.classList.contains('ms-title_custom-icon');
      let selectOpen = !msSelector.classList.contains('ms-wrapper_active');

      if (customTitleIcon && selectOpen) {
        that.customIconBlock.style.backgroundImage = `url(${that.settings.titleIconOpen})`;
      } else if (customTitleIcon && !selectOpen) {
        that.customIconBlock.style.backgroundImage = `url(${that.settings.titleIconClose})`;
      }
      msSelector.classList.toggle('ms-wrapper_active');
    }

    function selectItem() {
      let dataValue = this.getAttribute('data-value');
      let dataTitle = this.innerHTML;
      console.log(dataTitle);

      toggleSelector();

      setTimeout(() => {
        that.msTitleText.textContent = dataTitle;
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

  _setCustomTitleIcon() {
    let {settings} = this;
    if (settings.titleIconClose && settings.titleIconOpen) {
      this.msTitle.classList.add('ms-title_custom-icon');
      this.customIconBlock = document.createElement('div');
      this.customIconBlock.classList.add('ms-title__icon');
      this.customIconBlock.style.backgroundImage = `url(${this.settings.titleIconClose})`;
      this.msTitle.appendChild(this.customIconBlock);
    }
  }



}





















