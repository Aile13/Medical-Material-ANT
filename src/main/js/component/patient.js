const React = require('react');

import UpdatePatientDialog from "./updatepatientdialog";

export default class Patient extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.patient);
    }

    render() {
        return (
            <tr>
                <td>{this.props.patient.entity.nominative}</td>
                <td>{this.props.patient.entity.address}</td>
                <td>{this.props.patient.entity.place}</td>
                <td>{this.props.patient.entity.telephoneNumber}</td>
                <td>
                    <UpdatePatientDialog patient={this.props.patient}
                                         attributes={this.props.attributes}
                                         onUpdate={this.props.onUpdate}/>
                </td>
                <td>
                    <button onClick={this.handleDelete}>Elimina</button>
                </td>
            </tr>
        )
    }
}
