const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./utility/client');
const follow = require('./utility/follow');

import PatientList from "./component/patientList";

const root = '/api'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {patients: [], pageSize: 3};
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
                return patientCollection;
            });
        }).done(patientCollection => {
            this.setState({
                patients: patientCollection.entity._embedded.patients,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: patientCollection.entity._links
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

    render() {
        return (
            <div>
{/*
                <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
*/}
                <PatientList patients={this.state.patients}
                             links={this.state.links}
                             pageSize={this.state.pageSize}
                             onNavigate={this.onNavigate}
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