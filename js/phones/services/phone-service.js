const PhoneService = {
    getAll({ query = '', sortBy = ''} = {}) {
        let xhr = new XMLHttpRequest();

        xhr.open(
            'GET', 
            'https://mate-academy.github.io/phone-catalogue-static/api/phones.json',
            false
        );

        xhr.send();

        if ( xhr.status !== 200 ) {
            console.log(`${ xhr.status } ${ xhr.statusText }`)
            return [];
        }

        const phonesFromServer = JSON.parse(xhr.responseText);

        const filteredPhones = this._filter(phonesFromServer, query);
        const sortedPhones = this._sortBy(filteredPhones, sortBy);

        return sortedPhones;
    },

    getById(phoneId, callback) {
        let xhr = new XMLHttpRequest();

        xhr.open(
            'GET', 
            `https://mate-academy.github.io/phone-catalogue-static/api/phones/${ phoneId }.json`,
            true
        );

        xhr.send();

        xhr.onload = () => {
            if ( xhr.status !== 200 ) {
                console.log(`${ xhr.status } ${ xhr.statusText }`)
                return {};
            }
    
            const phoneDetails = JSON.parse(xhr.responseText);

            callback(phoneDetails);
        };
    },

    _filter(phones, query) {
        let re = RegExp(query, 'ig');
        return phones.filter((item) => item.name.match(re));
    },

    _sortBy(phones, sortBy) {
        if ( sortBy === 'age') {
            phones.sort(function(a, b) {
                return a[sortBy] - b[sortBy];
            })
        }

        else {
            phones.sort(function(a, b) {
                let x = a[sortBy].toLowerCase();
                let y = b[sortBy].toLowerCase();
    
                return x < y ? -1 : x > y ? 1 : 0;
            })
        }

        return phones;
    }
};

export default PhoneService;