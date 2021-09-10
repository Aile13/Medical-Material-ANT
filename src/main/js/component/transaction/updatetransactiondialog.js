import TransactionUtility from "./transactionutility";

const React = require('react');
const ReactDOM = require('react-dom');

export default class UpdateTransactionDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);

        this.state = {
            dialogId: this.props.transaction._links.self.href
        }

    }

    openDialog() {
        document.getElementById('edit-trans-dialog-' + this.state.dialogId).showModal()
    }

    closeDialog() {
        document.getElementById('edit-trans-dialog-' + this.state.dialogId).close()
    }


    handleSubmit(e) {
        e.preventDefault();
        const updatedTransaction = this.props.transaction;

        updatedTransaction['deliveryWaybill'] = ReactDOM.findDOMNode(this.refs['deliveryWaybill']).value.trim();
        updatedTransaction['withdrawalWaybill'] = ReactDOM.findDOMNode(this.refs['withdrawalWaybill']).value.trim();
        updatedTransaction['deliveryDate'] = ReactDOM.findDOMNode(this.refs['deliveryDate']).value.trim();
        updatedTransaction['withdrawalDate'] = ReactDOM.findDOMNode(this.refs['withdrawalDate']).value.trim();
        updatedTransaction['material'] = ReactDOM.findDOMNode(this.refs['material']).value.trim();

        new TransactionUtility().editTransaction(updatedTransaction).then(r => {
            this.props.onUpdateTransaction();
            document.getElementById('edit-trans-dialog-' + this.state.dialogId).close()
        })
    }

    render() {
        const inputs =
            <div>
                <p>
                    <label htmlFor="material-select">Seleziona materiale:</label> <br/>
                    <select ref="material" className="field" name="material"
                            defaultValue={this.props.transaction.material}
                    >
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
                    <input type="date" ref="deliveryDate" className="field"
                           defaultValue={
                               this.props.transaction.deliveryDate === null ?
                                   "" :
                                   new Date(this.props.transaction.deliveryDate)
                                       .toISOString().split('T')[0]
                           }
                    />
                </p>

                <p key="withdrawalDate">
                    <label htmlFor="withdrawalDate-select">Seleziona data di ritiro:</label> <br/>
                    <input type="date" ref="withdrawalDate" className="field"
                           defaultValue={
                               this.props.transaction.withdrawalDate === null ?
                                   "" :
                                   new Date(this.props.transaction.withdrawalDate)
                                       .toISOString().split('T')[0]
                           }
                    />
                </p>

                <p key="deliveryWaybill">
                    <label htmlFor="deliveryWaybill-select">Bolla di consegna:</label>
                    <input type="text" ref="deliveryWaybill" className="field"
                           defaultValue={this.props.transaction.deliveryWaybill}/>
                </p>
                <p key="withdrawalWaybill">
                    <label htmlFor="withdrawalWaybill-select">Bolla di ritiro:</label>
                    <input type="text" ref="withdrawalWaybill" className="field"
                           defaultValue={this.props.transaction.withdrawalWaybill}/>
                </p>
            </div>

        return (
            <div id={this.state.dialogId}>
                <dialog id={"edit-trans-dialog-" + this.state.dialogId}>


                    {/*<a href="#" title="Close" className="close" onClick={this.closeDialog}>X</a>*/}
                    <a id={"exitBtn" + this.state.dialogId}
                            title="exitBtn" className="close"
                            onClick={this.closeDialog}
                    >X
                    </a>


                    <h2>Modifica movimento</h2>
                    <hr/>
                    <form method="dialog">
                        {inputs}

                        <menu>
                            <button id={"confirmBtn" + this.state.dialogId} onClick={this.handleSubmit} value="default">
                                Modifica
                            </button>
                        </menu>
                    </form>
                </dialog>

                <menu>
                    <button id={'openButton' + this.state.dialogId} onClick={this.openDialog}>
                        Modifica
                    </button>
                </menu>
            </div>
        )
    }

}