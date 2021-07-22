const React = require('react');
const ReactDOM = require('react-dom');


export default class CreateDialog extends React.Component {

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
        const inputs = this.props.attributes.map(attribute =>
            <p key={attribute}>
                <input type="text" placeholder={attribute} ref={attribute} className="field"/>
            </p>
        );

        return (
            <div>
                <a href="#createPatient">Crea paziente</a>

                <div id="createEmployee" className="modalDialog">
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