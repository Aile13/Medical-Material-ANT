const axios = require('axios');


export default class TransactionUtility {
    constructor(patient) {
        this.patient = patient
    }

    getTransactions() {
        return axios.get('/api/transactions/search/findAllByPatientId?patient_id=2')
            .then(function (response) {
                return response.data._embedded.transactions
            })
            .catch(function (error) {
                console.log(error);
            })

    }

}