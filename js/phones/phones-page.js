import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCard from './components/shopping-card.js';
import Filter from './components/filter.js';
import PhoneService from './services/phone-service.js'

export default class PhonesPage {
    constructor({ element }) {
        this._element = element;

        this._render();
        this._initCatalog();
        this._initViewer();
        this._initShoppingCard();
        this._initFilter();
    }

    _initCatalog() {
      this._catalog = new PhoneCatalog({
        element: document.querySelector('[data-component="phone-catalog"]'),
      });

      let phones = PhoneService.getAll();
      this._catalog.show(phones);

      this._catalog.subscribe('phone-selected', (phoneId) => {
        const phoneDetails = PhoneService.getById(phoneId);

        this._catalog.hide();
        this._viewer.show(phoneDetails);
      });

        this._catalog.subscribe('phone-add', (phoneId) => {
          this._card.add(phoneId);
      });
    }

    _initViewer() {
        this._viewer = new PhoneViewer({
          element: document.querySelector('[data-component="phone-viewer"]'),
        });

        this._viewer.subscribe('back', () => {
        this._viewer.hide();
        this._catalog.show();
        });

        this._viewer.subscribe('add', (phoneId) => {
            this._card.add(phoneId);
        });
    }

    _initShoppingCard() {
        this._card = new ShoppingCard({
          element: document.querySelector('[data-component="shopping-card"]'),
        });
    }

    _initFilter() {
      this._filter = new Filter({
        element: document.querySelector('[data-component="filter"]'),
      });

      this._filter.subscribe('order-changed', (orderField) => {
        let phones = PhoneService.getAll({ orderField });

        this._catalog.show(phones);
      });

      this._filter.subscribe('query-changed', (query) => {
        let phones = PhoneService.getAll({ query });

        this._catalog.show(phones);
      });
  }

    _render() {
        this._element.innerHTML = `
        <div class="row">

        <!--Sidebar-->
        <div class="col-md-3">
          <section>
              <div data-component="filter"></div>
          </section>
  
          <section>
              <div data-component="shopping-card"></div>
          </section>
        </div>
  
        <!--Main content-->
        <div class="col-md-9">
            <div data-component="phone-catalog"></div>
            <div data-component="phone-viewer" hidden></div>
        </div>
      </div>
        `;
    }
}