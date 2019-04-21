import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import IdentifierMock from "eslint-plugin-jsx-a11y/__mocks__/IdentifierMock";

class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'default', display: '-Choose delivery method-'},
                        {value: 'fastest', display: 'Fastest'},
                        {value: 'cheapest', display: 'Cheapest'}
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            }

        },
        formIsValid: false,
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const customer = {};
        for (let formId in this.state.orderForm) {
            customer[formId] = this.state.orderForm[formId].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: customer


        }
        axios.post('/orders.json', order).then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch(error => {
            this.setState({loading: false});
        });
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            //    trim prevents writing white signs
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, key) => {
        //console.log(event.target.value)
        const changedValue = {...this.state.orderForm};

        const updatedFormElement = {...changedValue[key]};

        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );

        updatedFormElement.touched=true;
        //console.log(updatedFormElement);
        changedValue[key] = updatedFormElement;
        //console.log(changedValue)
        let formIsValid = true;
        for(let key in changedValue){
            formIsValid=changedValue[key].valid && formIsValid


        }

        this.setState({orderForm: changedValue, formIsValid:formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>

                {formElementsArray.map(formEl => (

                    <Input
                        changed={(event) => this.inputChangedHandler(event, formEl.id)}
                        key={formEl.id}
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        invalid={!formEl.config.valid}
                        shouldValidate={formEl.config.validation}
                        touched={formEl.config.touched}
                    />
                ))}


                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;