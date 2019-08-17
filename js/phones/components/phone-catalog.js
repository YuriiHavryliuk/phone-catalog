import Component from '../../component.js';

export default class PhoneCatalog extends Component {
    constructor({ element, phones = [] }) {
        super({ element });

        this._phones = phones;
        this._render();

        this.on('click', 'details-link', (event) => {
            let phoneElement = event.target.closest('[data-element="phone"]');
           
            this.emit('phone-selected', phoneElement.dataset.phoneId);
        });

        this.on('click', 'button-add', (event) => { 
            let phoneElement = event.target.closest('[data-element="phone"]');

            this.emit('phone-add', phoneElement.dataset.phoneId);
        });
    }

    _render() {
        this._element.innerHTML = `
        <ul class="phones">
            ${this._phones.map(phone => `
                <li 
                    class="thumbnail" 
                    data-element="phone" 
                    data-phone-id="${ phone.id }">
                <a href="#!/phones/${ phone.id }" 
                    class="thumb" 
                    data-element="details-link">
                <img alt="${ phone.name }" src="${ phone.imageUrl }">
                </a>
    
                <div class="phones__btn-buy-wrapper">
                <a 
                    class="btn btn-success"
                    data-element="button-add"
                >
                    Add
                </a>
                </div>
    
                <a 
                    href="#!/phones/${ phone.id }" 
                    data-element="details-link">${ phone.name }</a>
                <p>${ phone.snippet }</p>
            </li>
            `).join('')}
        </ul>
        `;
    }
}