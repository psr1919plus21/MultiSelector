import Component from '../components/Component';
import MultiSelector from '../components/MultiSelector';

export default class IndexPage extends Component {
  afterInitialize() {
    let plainSelect = new MultiSelector({
      el: document.querySelector('.ms-select')
    });
  }
}
