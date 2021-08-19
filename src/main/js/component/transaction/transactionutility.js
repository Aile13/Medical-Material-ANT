const axios = require('axios');


export default class TransactionUtility {
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