import React from 'react';
import './App.css';
// import './FormErrors.js';
export const FormErrors = ({formErrors}) =>
    <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
            if(formErrors[fieldName].length > 0){
                return (
                    <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                )        
            }
            else {
                return '';
            }
        })}
    </div>

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            photo: '',
            formErrors: {firstName: '', lastName: '', email: ''},
            firstNameValid: false,
            lastNameValid: false,
            emailValid: false,
            formValid: false
        }

        this.updateState = this.updateState.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);

    };


    handleFirstNameChange(e) {
        this.setState({firstName: e.target.value});
    }
   
    handleLastNameChange(e) {
        this.setState({lastName: e.target.value});
    }
   
    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }
   
    handlePhotoChange(e) {
        this.setState({photo: e.target.files[0]});
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => { this.validateField(name, value) });
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let emailValid = this.state.emailValid;

        switch(fieldName) {
            case 'firstName':
                firstNameValid = value.length >= 1;
                fieldValidationErrors.firstName = firstNameValid ? '' : ' is required';
                break;
            case 'lastName':
                lastNameValid = value.length >= 1;
                fieldValidationErrors.lastName = lastNameValid ? '' : ' is required';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            emailValid: emailValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid });
    }

    updateState(e) {
        e.preventDefault();

        var data = new FormData();

        data.append('firstName', this.state.firstName);
        data.append('lastName', this.state.lastName);
        data.append('emailId', this.state.email);
        data.append('photo', this.state.photo);

        return fetch('http://34.193.110.127/laravel/public/api/add', {
            method: 'POST',
            mode: 'CORS',
            body: data
        }).then(function(res){ return res.json(); })
        .then(function(data){ console.log(data) });
    }
    errorClass(error) {
   return(error.length === 0 ? '' : 'has-error');
}

    render() {
        return (
            <form className="demoForm">
            <br/><br/><br/>
                <div>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.handleUserInput}/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.handleUserInput}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleUserInput}/>
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Photo</label>
                    <input type="file" name="photo" onChange={this.handlePhotoChange}/>
                </div>
                <button type="submit" disabled={!this.state.formValid} className="btn btn-primary" onClick={this.updateState}>
                    Submit
                </button>
            </form>
        );
    }
}

export default App;