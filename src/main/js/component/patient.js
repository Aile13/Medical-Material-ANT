const React = require('react');

export default class Patient extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.patient.nominative}</td>
                <td>{this.props.patient.address}</td>
                <td>{this.props.patient.place}</td>
                <td>{this.props.patient.telephoneNumber}</td>
            </tr>
        )
    }
}
