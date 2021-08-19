import TransactionUtility from "./transactionutility";

const React = require('react');

export default class Transaction extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        new TransactionUtility().deleteTransaction(this.props.transaction).then(r => {
            this.props.onDeleteTransaction()
        })
    }

    visualizzaData(data) {
        if (data === null) {
            return ""
        } else {
            return new Date(data).toLocaleDateString();
        }
    }

    render() {
        const deliveryDate = this.visualizzaData(this.props.transaction.deliveryDate)
        const withdrawalDate = this.visualizzaData(this.props.transaction.withdrawalDate)

        return (
            <tr>
                <td>{this.props.transaction.material}</td>
                <td>{deliveryDate}</td>
                <td>{withdrawalDate}</td>
                <td>{this.props.transaction.deliveryWaybill}</td>
                <td>{this.props.transaction.withdrawalWaybill}</td>

                <td>
                    <button onClick={this.handleDelete}>Elimina</button>
                </td>
            </tr>
        )
    }
}
