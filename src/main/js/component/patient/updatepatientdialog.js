const React = require('react');
const ReactDOM = require('react-dom');

export default class UpdatePatientDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const updatedPatient = {};

        this.props.attributes.forEach(attribute => {
            updatedPatient[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });

        this.props.onUpdate(this.props.patient, updatedPatient);

        window.location = "#";
    }

    render() {
        const inputs =
            <div>
                <p key="nominative">
                    <input type="text" ref="nominative" placeholder="nominative"
                           defaultValue={this.props.patient.entity["nominative"]} className="field"/>
                </p>
                <p key="address">
                    <input type="text" ref="address" placeholder="address"
                           defaultValue={this.props.patient.entity["address"]} className="field"/>
                </p>
                <p key="place">
                    <input type="text" ref="place" placeholder="place"
                           defaultValue={this.props.patient.entity["place"]} className="field"/>
                </p>
                <p key="telephoneNumber">
                    <input type="text" ref="telephoneNumber" placeholder="telephoneNumber"
                           defaultValue={this.props.patient.entity["telephoneNumber"]} className="field"/>
                </p>
            </div>

        const dialogId = "updateEmployee-" + this.props.patient.entity._links.self.href;

        return (
            <div key={this.props.patient.entity._links.self.href}>
                <button><a href={"#" + dialogId}>Modifica</a></button>
                <div id={dialogId} className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Modifica paziente</h2>

                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Modifica</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
