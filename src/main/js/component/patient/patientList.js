const React = require('react');
const ReactDOM = require('react-dom');


import Patient from "./patient";


export default class PatientList extends React.Component {

    constructor(props) {
        super(props);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        e.preventDefault();
        const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        } else {
            ReactDOM.findDOMNode(this.refs.pageSize).value =
                pageSize.substring(0, pageSize.length - 1);
        }
    }

    handleNavFirst(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }

    render() {
        const patients = this.props.patients.map(patient =>
            <Patient key={patient.entity._links.self.href}
                     patient={patient}
                     attributes={this.props.attributes}
                     onUpdate={this.props.onUpdate}
                     onDelete={this.props.onDelete}
                     onInsertTransactionBy={this.props.onInsertTransactionBy}
                     onViewTransactions={this.props.onViewTransactions}
            />
        );

        const navLinks = [];
        if ("first" in this.props.links) {
            navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
        }
        if ("prev" in this.props.links) {
            navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
        }
        if ("next" in this.props.links) {
            navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
        }
        if ("last" in this.props.links) {
            navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
        }

        return (
            <div>
                <p>Numero pazienti per pagina: </p>
                <input ref="pageSize" defaultValue={this.props.pageSize}
                       onInput={this.handleInput}/>
                <br/> <br/> <br/>
                <table>
                    <tbody>
                    <tr>
                        <th>Nominativo</th>
                        <th>Indirizzo</th>
                        <th>Luogo</th>
                        <th>Numero di telefono</th>
                    </tr>
                    {patients}
                    </tbody>
                </table>
                <br/>
                <div>
                    {navLinks}
                </div>
            </div>
        )
    }
}
