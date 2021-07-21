const React = require('react');

import Patient from "./patient";


export default class PatientList extends React.Component {
    render() {
        const patients = this.props.patients.map(patient =>
            <Patient key={patient._links.self.href} patient={patient}/>
        );
        return (
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
        )
    }
}
