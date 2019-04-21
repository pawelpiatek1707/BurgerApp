import React from 'react';
import classes from './input.module.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses =[classes.InputElement];
    let validationMessage = null;
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        validationMessage = <p style={{color: 'red'}}><strong>Please enter valid value</strong> </p>
    }

    switch (props.elementType) {
        case ('input'): {
            inputElement = <input
                onChange={props.changed}
                className={inputClasses.join(' ')}
                                  {...props.elementConfig}
                                  value={props.value}/>;
            break;
        }
        case  ('textarea'): {
            inputElement = <textarea
                onChange={props.changed}
                className={inputClasses.join(' ')}
                                     {...props.elementConfig}
                                     value={props.value}/>;
            break;
        }
        case  ('select'): {
            inputElement = (
                <select
                  onChange={props.changed}
                className={inputClasses.join(' ')}
                value={props.value}>
                {props.elementConfig.options.map(option=>(
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.display}
                    </option>
                ))}
            </select>);
            break;
        }
        default: {
            inputElement = <input
                onChange={props.changed}
                className={inputClasses.join(' ')}
                                  {...props.elementConfig}
                                  value={props.value}/>;
        }
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {validationMessage}
            {inputElement}
        </div>
    );
}

export default input;