const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/';
const PhoneService = {

    _sendRequest(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', url, true);
            xhr.send();
            xhr.onload = () => {
                if ( xhr.status !== 200 ) {
                    reject(`${ xhr.status } ${ xhr.statusText }`);
                    return;
                }
        
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
        })
    },
    
    // getAll({ query = '', sortBy = ''} = {}) {
    //     const url = `${ BASE_URL }/api/phones.json`;

    //     return this._sendRequest(url)
    //         .then((phonesFromServer) => {
    //             const filteredPhones = this._filter(phonesFromServer, query);
    //             const sortedPhones = this._sortBy(filteredPhones, sortBy);
            
    //             return sortedPhones;
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             return [];
    //         });
    // },

    async getAll({ query = '', sortBy = ''} = {}) {
        const url = `${ BASE_URL }/api/phones.json`;

        const phonesFromServer = await this._sendRequest(url);

        const filteredPhones = this._filter(phonesFromServer, query);
        const sortedPhones = this._sortBy(filteredPhones, sortBy);
            
        return sortedPhones;
    },

    getById(phoneId) {
        const url = `${ BASE_URL }/api/phones/${ phoneId }.json`;

        return this._sendRequest(url);
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