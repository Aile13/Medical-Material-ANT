import TransactionUtility from "./transactionutility";

const React = require('react');
const ReactDOM = require('react-dom');


export default class CreateTransactiontDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const newTransaction = {}

        console.log(this.props.patient.entity._links.self.href)

        newTransaction['deliveryWaybill'] = ReactDOM.findDOMNode(this.refs['deliveryWaybill']).value.trim();
        newTransaction['withdrawalWaybill'] = ReactDOM.findDOMNode(this.refs['withdrawalWaybill']).value.trim();
        newTransaction['deliveryDate'] = ReactDOM.findDOMNode(this.refs['deliveryDate']).value.trim();
        newTransaction['withdrawalDate'] = ReactDOM.findDOMNode(this.refs['withdrawalDate']).value.trim();
        newTransaction['material'] = 'COMODA' //ReactDOM.findDOMNode(this.refs['material']).value.trim();
        /*newTransaction['patient'] = {
            'href': this.props.patient.entity._links.self.href
        }*/
        console.log(newTransaction)

        new TransactionUtility()
            .insertTransaction(newTransaction, this.props.patient)
            .then(r => {

                // clear out the dialog's inputs
                ReactDOM.findDOMNode(this.refs['deliveryWaybill']).value = '';
                ReactDOM.findDOMNode(this.refs['withdrawalWaybill']).value = '';
                ReactDOM.findDOMNode(this.refs['deliveryDate']).value = '';
                ReactDOM.findDOMNode(this.refs['withdrawalDate']).value = '';


                // Navigate away from the dialog to hide it.
                window.location = "#";
            })
    }

    render() {
        const inputs =
            <div>
                <p key="material">
                    <input type="text" ref="material" placeholder="materiale" className="field"/>
                </p>
                <p key="deliveryDate">
                    <input type="text" ref="deliveryDate" placeholder="data di consegna" className="field"/>
                </p>
                <p key="withdrawalDate">
                    <input type="text" ref="withdrawalDate" placeholder="data di ritiro" className="field"/>
                </p>
                <p key="deliveryWaybill">
                    <input type="text" ref="deliveryWaybill" placeholder="bolla di consegna" className="field"/>
                </p>
                <p key="withdrawalWaybill">
                    <input type="text" ref="withdrawalWaybill" placeholder="bolla di ritiro" className="field"/>
                </p>
            </div>

        const dialogId = 'createTransaction-' + this.props.patient.entity._links.self.href

        return (
            <div key={"insertTransactions-" + this.props.patient.entity._links.self.href}>
                <button>
                    <a href={"#" + dialogId}>Inserisci Movimento</a>
                </button>

                <div id={dialogId} className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <div>
                            <h3>Inserisci movimento per {this.props.patient.entity.nominative}</h3>

                            <form>
                                {inputs}
                                <button onClick={this.handleSubmit}>Inserisci Movimento</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}