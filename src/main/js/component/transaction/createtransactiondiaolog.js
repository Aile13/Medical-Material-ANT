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

        newTransaction['deliveryWaybill'] = ReactDOM.findDOMNode(this.refs['deliveryWaybill']).value.trim();
        newTransaction['withdrawalWaybill'] = ReactDOM.findDOMNode(this.refs['withdrawalWaybill']).value.trim();
        newTransaction['deliveryDate'] = ReactDOM.findDOMNode(this.refs['deliveryDate']).value.trim();
        newTransaction['withdrawalDate'] = ReactDOM.findDOMNode(this.refs['withdrawalDate']).value.trim();
        newTransaction['material'] = ReactDOM.findDOMNode(this.refs['material']).value.trim();

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
                <p>
                    <label htmlFor="material-select">Seleziona materiale:</label> <br/>
                    <select ref="material" className="field"
                            name="material" key="material" defaultValue="COMODA">
                        <option value="LETTINO">Lettino</option>
                        <option value="LETTO_ELETTRICO">Letto elettrico</option>
                        <option value="MATERASSINO">Materassino</option>
                        <option value="COMODA">Comoda</option>
                        <option value="PIANTANA">Piantana</option>
                        <option value="CARROZZINA_A_ROTELLE">Carrozzina a rotelle</option>
                        <option value="CIAMBELLA">Ciambella</option>
                        <option value="DEAMBULATORE">Deambulatore</option>
                        <option value="SOLLEVATORE_ELETTRICO">Sollevatore elettrico</option>
                        <option value="ALZACOPERTA">Alzacoperta</option>
                        <option value="ALZAPERSONE_DA_PAVIMENTO">Alzapersone da pavimento</option>
                        <option value="CAPRETTA">Capretta</option>
                        <option value="BASTONE">Bastone</option>
                        <option value="ALZAWATER">Alzawater</option>
                        <option value="SEGGIOLINO_DA_VASCA">Seggiolino da vasca</option>
                        <option value="PADELLA">Padella</option>
                        <option value="CUSCINO_IN_SILICONE">Cuscino in silicone</option>
                        <option value="ALZAWATER_DA_APPOGGIO">Alzawater da appoggio</option>
                        <option value="PAPPAGALLO">Pappagallo</option>
                        <option value="ASPIRATORE">Aspiratore</option>
                    </select>
                </p>

                <p key="deliveryDate">
                    <label htmlFor="deliveryDate-select">Seleziona data di consegna:</label> <br/>
                    <input type="date" ref="deliveryDate" className="field"/>
                </p>

                <p key="withdrawalDate">
                    <label htmlFor="withdrawalDate-select">Seleziona data di ritiro:</label> <br/>
                    <input type="date" ref="withdrawalDate" className="field"/>
                </p>

                <p key="deliveryWaybill">
                    <input type="text" ref="deliveryWaybill" placeholder="bolla di consegna" className="field"/>
                </p>
                <p key="withdrawalWaybill">
                    <input type="text" ref="withdrawalWaybill" placeholder="bolla di ritiro" className="field"/>
                </p>
            </div>

        const dialogId = 'createTransactionForPatient-' + this.props.patient.entity._links.self.href

        return (
            <div key={"insertTransactions-" + this.props.patient.entity._links.self.href}>
                <button>
                    <a href={"#" + dialogId}>Inserisci Movimento</a>
                </button>

                <div id={dialogId} className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <div>
                            <h3>Nuovo movimento per {this.props.patient.entity.nominative}</h3>

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