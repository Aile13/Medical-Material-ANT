const axios = require('axios');


export default class TransactionUtility {

    editTransaction(transaction) {
        return axios.put(
            transaction._links.self.href,
            transaction
        ).catch(function (error) {
            console.log(error);
        });
    }

    insertTransaction(transaction, patient) {
        return axios.post('api/transactions',
            transaction
        ).then(response => {
            return axios.put(response.data._links.patient.href,
                patient.entity._links.self.href, {
                    headers: {'Content-Type': 'text/uri-list'}
                }
            )
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
                console.log(patient)
                return response.data._embedded.transactions
            })
            .catch(function (error) {
                console.log(error);
            })

    }

}