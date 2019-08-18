import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCard from './components/shopping-card.js';
import Filter from './components/filter.js';
import PhoneService from './services/phone-service.js'

export default class PhonesPage {
    constructor({ element }) {
        this._element = element;

        this._render();
        this._initFilter();
        this._initCatalog();
        this._initViewer();
        this._initShoppingCard();
    }

    _initCatalog() {
      this._catalog = new PhoneCatalog({
        element: document.querySelector('[data-component="phone-catalog"]'),
      });

      this._showPhones();

      this._catalog.subscribe('phone-selected', (phoneId) => {

         const detailsPromise = PhoneService.getById(phoneId);

         detailsPromise.then((phoneDetails) => {
          this._catalog.hide();
          this._viewer.show(phoneDetails);
        });
      });

    //   this._catalog.subscribe('phone-selected', async (phoneId) => {
    //     const phoneDetails = await PhoneService.getById(phoneId);
    //       this._catalog.hide();
    //       this._viewer.show(phoneDetails);
    //  });

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
        this._showPhones();
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

      this._filter.subscribe('order-changed', () => {
       this._showPhones();
      });

      this._filter.subscribe('query-changed', () => {
        this._showPhones();
      });
  }

    async _showPhones() {
        const currentFiltering = this._filter.getCurrentData();
        const phones = await PhoneService.getAll(currentFiltering);

        this._catalog.show(phones);
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