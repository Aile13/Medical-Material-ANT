const React = require('react');
const ReactDOM = require('react-dom');


export default class CreatePatientDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newPatient = {};
        this.props.attributes.forEach(attribute => {
            newPatient[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onCreate(newPatient);

        // clear out the dialog's inputs
        this.props.attributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = '';
        });

        // Navigate away from the dialog to hide it.
        window.location = "#";
    }

    render() {
        const inputs =
            <div>
                <p key="nominative">
                    <input type="text" ref="nominative" placeholder="nome e cognome" className="field"/>
                </p>
                <p key="address">
                    <input type="text" ref="address" placeholder="indirizzo" className="field"/>
                </p>
                <p key="place">
                    <input type="text" ref="place" placeholder="località" className="field"/>
                </p>
                <p key="telephoneNumber">
                    <input type="text" ref="telephoneNumber" placeholder="numero di telefono" className="field"/>
                </p>
            </div>

        return (
            <div>
                <button>
                    <a href="#createPatient">Crea paziente</a>
                </button>

                <div id="createPatient" className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Inserisci nuovo paziente</h2>

                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Inserisci Paziente</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}