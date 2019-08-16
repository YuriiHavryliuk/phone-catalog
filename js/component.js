export default class Component {
    constructor({ element }) {
        this._element = element;
    }
 
    hide() {
        this._element.hidden = true;
    }

    show() {
        this._element.hidden = false;
    }


    on(eventName, selector, callback) {
        this._element.addEventListener(eventName, (event) => {
            let delegateTarget = event.target.closest(selector);
            
            if ( !delegateTarget ) {
                return;
            }

            callback(event);
        })
    }
}