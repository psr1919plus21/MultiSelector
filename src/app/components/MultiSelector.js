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
    let msTitle;
    let msPlaceholder;
    let msTitleTextNode;
    let msDropDown;

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

    msTitle.appendChild(msTitleTextNode);
    msSelector.appendChild(msTitle);

    this.el.parentNode.insertBefore(msSelector, this.el);

    // this.el.style.display = 'none';
  }

}
