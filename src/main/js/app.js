const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./utility/client');
const follow = require('./utility/follow');

import when from "when";
import CreatePatientDialog from "./component/patient/createpatientdialog";
import PatientList from "./component/patient/patientList";

const root = '/api'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {patients: [], attributes: [], pageSize: 2, links: {}};
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'patients', params: {size: pageSize}}]
        ).then(patientCollection => {
            return client({
                method: 'GET',
                path: patientCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                this.links = patientCollection.entity._links;
                return patientCollection;
            });
        }).then(patientCollection => {
            return patientCollection.entity._embedded.patients.map(patient =>
                client({
                    method: 'GET',
                    path: patient._links.self.href
                })
            );
        }).then(patientPromises => {
            return when.all(patientPromises);
        }).done(patients => {
            this.setState({
                patients: patients,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: this.links
            });
        });
    }

    onCreate(newPatient) {
        follow(client, root, ['patients']).then(patientCollection => {
            return client({
                method: 'POST',
                path: patientCollection.entity._links.self.href,
                entity: newPatient,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [
                {rel: 'patients', params: {'size': this.state.pageSize}}]);
        }).done(response => {
            if (typeof response.entity._links.last !== "undefined") {
                this.onNavigate(response.entity._links.last.href);
            } else {
                this.onNavigate(response.entity._links.self.href);
            }
        });
    }

    onUpdate(patient, updatedPatient) {
        client({
            method: 'PUT',
            path: patient.entity._links.self.href,
            entity: updatedPatient,
            headers: {
                'Content-Type': 'application/json',
                'If-Match': patient.headers.Etag
            }
        }).done(response => {
            console.log(response)
            this.loadFromServer(this.state.pageSize);
        }, response => {
            if (response.status.code === 412) {
                alert('NON PERMESSO: Impossibile aggiornare paziente: ' +
                    patient.entity._links.self.href +
                    '. Errore aggiornamento paziente. ' +
                    'Altre persone stanno modificando contemporaneamente a te questo paziente.');
            }
        });
    }

    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
            this.loadFromServer(pageSize);
        }
    }

    onNavigate(navUri) {
        client({
            method: 'GET',
            path: navUri
        }).then(patientCollection => {
            this.links = patientCollection.entity._links;

            return patientCollection.entity._embedded.patients.map(patient =>
                client({
                    method: 'GET',
                    path: patient._links.self.href
                })
            );
        }).then(patientPromises => {
            return when.all(patientPromises);
        }).done(patients => {
            this.setState({
                patients: patients,
                attributes: Object.keys(this.schema.properties),
                pageSize: this.state.pageSize,
                links: this.links
            });
        });
    }

    onDelete(patient) {
        client({method: 'DELETE', path: patient.entity._links.self.href}).done(response => {
            this.loadFromServer(this.state.pageSize);
        });
    }

    render() {
        return (
            <div>
                <h2>Gestione Materiale ANT</h2>
                <br />
                <CreatePatientDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
                <br />
                <PatientList patients={this.state.patients}
                             links={this.state.links}
                             pageSize={this.state.pageSize}
                             attributes={this.state.attributes}
                             onNavigate={this.onNavigate}
                             onUpdate={this.onUpdate}
                             onDelete={this.onDelete}
                             updatePageSize={this.updatePageSize}/>
            </div>
        )
    }

}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
)