const React = require('react');
const ReactDOM = require('react-dom');

export default class UpdateDialog extends React.Component {

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
        const inputs = this.props.attributes.map(attribute =>
            <p key={this.props.patient.entity[attribute]}>
                <input type="text" placeholder={attribute}
                       defaultValue={this.props.patient.entity[attribute]}
                       ref={attribute} className="field"/>
            </p>
        );

        const dialogId = "updateEmployee-" + this.props.patient.entity._links.self.href;

        return (
            <div key={this.props.patient.entity._links.self.href}>
                <a href={"#" + dialogId}>Modifica</a>
                <div id={dialogId} className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Modifica un paziente</h2>

                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Aggiorna</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
