const PhoneService = {
    _get(requestType, requestLink, callback) {
        let xhr = new XMLHttpRequest();

        xhr.open(requestType, requestLink, true);

        xhr.send();

        xhr.onload = () => {
            if ( xhr.status !== 200 ) {
                console.log(`${ xhr.status } ${ xhr.statusText }`)
                return [];
            }
    
            const data = JSON.parse(xhr.responseText);

            callback(data);
        }
    },
    
    getAll({ query = '', sortBy = ''} = {}, callback) {
        this._get('GET','https://mate-academy.github.io/phone-catalogue-static/api/phones.json', (data) => {
    
            const filteredPhones = this._filter(data, query);
            const sortedPhones = this._sortBy(filteredPhones, sortBy);
    
            callback(sortedPhones);
        });

    },

    getById(phoneId, callback) {
        this._get('GET',`https://mate-academy.github.io/phone-catalogue-static/api/phones/${ phoneId }.json`, callback);
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