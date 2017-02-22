// todo: as package (when ready) https://github.com/jefo/wbt-view
import result from 'lodash/result';
import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';
import uniqueId from 'lodash/uniqueId';

/**
 * @see https://github.com/jefo/wbt-view
 */
export default class Component {
    constructor(options = {}) {
        this.cid = uniqueId('cmp');
        this.preInitialize(options);
        const {el} = options;
        const {settings} = options;
        if (el) {
            this.el = el;
        }

        if (settings) {
          this.settings = settings;
        }

        if (!this.el) {
          console.warn(`Selected DOM node – ${el} doesn\'t exist `);
        } else {
          if (this.className) {
            this.el.classList.add(this.className);
          }
          this.render();
          this._applyBehaviors();
          this.bindUIElements();
          this.delegateEvents();
          this.afterInitialize(options);
        }
    }

    preInitialize() { }

    afterInitialize() { }

    render() { }

    delegateEvents(events) {
        events || (events = result(this, 'events'));
        if (!events) {
            return this;
        }
        // todo: undelegate events
        forEach(events, (val, key) => {
            let method = events[key];
            if (!isFunction(method)) {
                method = this[method];
            }
            if (!method) {
                return;
            }
            const match = key.match(/^(\S+)\s*(.*)$/);
            this.delegate(match[1], match[2], method.bind(this));
        });
        return this;
    }

    delegate(eventName, selector, listener) {
        this.$el.on(eventName, selector, listener);
        return this;
    }

    $(selector) {
        return this.el.querySelectorAll(selector);
    }

    bindUIElements() {
        if (!this.ui) {
            return;
        }
        // store the ui hash in _uiBindings so they can be reset later
        // and so re-rendering the view will be able to find the bindings
        if (!this._uiBindings) {
            this._uiBindings = this.ui;
        }
        const bindings = result(this, '_uiBindings');
        this._ui = {};
        forEach(bindings, (selector, key) => {
            this._ui[key] = this.$(selector);
        });
        this.ui = this._ui;
    }

    _applyBehaviors() {
        if (!this.behaviors) {
            return;
        }
        forEach(this.behaviors, (behavior, index) => {
            if (!isFunction(behavior)) {
                throw new Error(`Can not apply behavior on index ${index}. Is not a function`);
            }
            behavior(this);
        });
    }

    onDestroy() {
    }

    /**
     * Do not override
     */
    destroy() {
        // todo: undelegate first
        this.onDestroy();
    }
}
