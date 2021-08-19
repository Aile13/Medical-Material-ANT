const React = require('react');

export default class Transaction extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.patient);
    }

    render() {
        const deliveryDate = new Date(this.props.transaction.deliveryDate)
        const withdrawalDate = new Date(this.props.transaction.withdrawalDate)

        return (
            <tr>
                <td>{this.props.transaction.material}</td>
                <td>{deliveryDate.toLocaleDateString()}</td>
                <td>{withdrawalDate.toLocaleDateString()}</td>
                <td>{this.props.transaction.deliveryWaybill}</td>
                <td>{this.props.transaction.withdrawalWaybill}</td>

                <td>
                    <button onClick={this.handleDelete}>Elimina</button>
                </td>
            </tr>
        )
    }
}
