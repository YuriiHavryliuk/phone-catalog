import Component from '../../component.js';

export default class ShoppingCard extends Component {
    constructor({ element }) {
        super( { element });

        this._itemsMap = {};

        this._render();

        this.on('click', 'less', (event) => {
            let itemElement = event.target.closest('[data-element="item"]');
            
            this.remove(itemElement.dataset.itemId);
        });

        this.on('click', 'more', (event) => {
            let itemElement = event.target.closest('[data-element="item"]');
            
            this.add(itemElement.dataset.itemId);
        });
    }

    add(itemId) {
        if( !this._itemsMap.hasOwnProperty(itemId) ) {
            this._itemsMap[itemId] = 0;
        }

        this._itemsMap[itemId]++;

        this._render();
    }

    remove(itemId) {
        if( !this._itemsMap.hasOwnProperty(itemId) ) {
            return;
        }

        this._itemsMap[itemId]--;

        if (this._itemsMap[itemId] === 0) {
            delete this._itemsMap[itemId];
        }

        this._render();
    }

    _render() {
        this._element.innerHTML = `
            <p>Shopping Cart</p>
            <ul>
                ${Object.entries(this._itemsMap).map( ([itemId, quantity]) => `
                <li class="card-item" data-element="item" data-item-id="${ itemId }">
                    <button data-element="less">-</button>
                    ${ itemId }<span class="counter"> (${ quantity })</span>
                    <button data-element="more">+</button>
                </li>
            `
            ).join('')}
            </ul>
        `;
    }
}