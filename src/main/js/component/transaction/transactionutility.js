const axios = require('axios');


export default class TransactionUtility {

    editTransaction(transaction) {
    }

    insertTransaction(transaction, patient) {
        return axios.post('api/transactions',
            transaction
        ).then(response => {
            console.log(response)
            // console.log(patient.entity._links.self.href)
            return axios.put(response.data._links.patient.href,
                patient.entity._links.self.href, {
                    headers: {'Content-Type' : 'text/uri-list'}
                }
            ).then(r => console.log(r))
        }).catch(function (error) {
            console.log(error);
        });
    }

    deleteTransaction(transaction) {
        return axios.delete(transaction._links.self.href)
            .catch(function (error) {
                console.log(error);
            })
    }

    getTransactions(patient) {
        return axios.get('/api/transactions/search/findAllByPatient', {
            params: {
                patient: patient
            }
        })
            .then(function (response) {
                return response.data._embedded.transactions
            })
            .catch(function (error) {
                console.log(error);
            })

    }

}