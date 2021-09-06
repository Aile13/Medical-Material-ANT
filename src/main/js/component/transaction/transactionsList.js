import TransactionUtility from "./transactionutility";
import Transaction from "./transaction";

const React = require('react');
require('react-dom');

export default class TransactionsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            transactions: []
        }

        this.handleViewTransactions = this.handleViewTransactions.bind(this);
        this.handleUpdateTransaction = this.handleUpdateTransaction.bind(this);
        this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this);
    }

    handleViewTransactions() {
        console.log(this.props.patient.entity._links.self.href)
        new TransactionUtility().getTransactions(this.props.patient.entity._links.self.href)
            .then(transactions => this.setState({transactions: transactions}))

    }

    handleUpdateTransaction() {
        this.handleViewTransactions()
    }

    handleDeleteTransaction() {
        this.handleViewTransactions()
    }

    render() {
        const dialogId = "viewTransactions-" + this.props.patient.entity._links.self.href;
        const transactions = this.state.transactions.map((transaction, i) =>
            <Transaction
                key={"viewTransactions-" + i + "-" + this.props.patient.entity._links.self.href}
                patient={this.props.patient.entity._links.self.href}
                transaction={transaction}
                onUpdateTransaction={this.handleUpdateTransaction}
                onDeleteTransaction={this.handleDeleteTransaction}
            />
        )

        return (
            <div key={"transactions-" + this.props.patient.entity._links.self.href}>
                <button>
                    <a onClick={this.handleViewTransactions} href={"#" + dialogId}>
                        Visualizza Movimenti
                    </a>
                </button>
                <div id={dialogId} className="modalDialog">

                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <div>
                            <h3>Movimenti di {this.props.patient.entity.nominative}</h3>

                            <table>
                                <tbody>
                                <tr>
                                    <th>Materiale</th>
                                    <th>Data di consegna</th>
                                    <th>Data di ritiro</th>
                                    <th>Bolla di consegna</th>
                                    <th>Bolla di ritiro</th>
                                </tr>
                                {
                                    transactions.length === 0 ?
                                    <tr><td><em>Non ci sono ancora movimenti.</em></td></tr> :
                                    transactions
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
