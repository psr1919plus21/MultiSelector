import Component from './Component';

export default class MultiSelector extends Component {

  preInitialize() {
    this.ui = {
      msPlaceholder: 'option.ms-placeholder',
      msOption: 'option:not(.ms-placeholder)',
      msOptgroup: 'optgroup'
    }
  }

  afterInitialize() {
    let msSelector;
    let msPlaceholder;
    let msPlaceholderTextNode;
    let msDropDown;

    // MultiSelector wrapper.
    msSelector = document.createElement('div');
    msSelector.classList.add('ms-wrapper');

    // MultiSelector placeholder.
    if (this.ui.msPlaceholder.length) {
      msPlaceholder = document.createElement('div');
      msPlaceholder.classList.add('ms-placeholder');
      msPlaceholderTextNode = document.createTextNode(this.ui.msPlaceholder[0].text);
      msPlaceholder.appendChild(msPlaceholderTextNode);

      msSelector.appendChild(msPlaceholder);
    }




    this.el.parentNode.insertBefore(msSelector, this.el);

    // this.el.style.display = 'none';
  }

}
