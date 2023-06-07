import React from 'react';

export default class FormGroup extends React.Component {
    handleKeyDown = (event) => {
        if (event.keyCode === 13) { // código da tecla Enter
          event.preventDefault(); // impede o envio do formulário
        }
      }
    render() {
        return (
            <div className="form-group" onKeyDown={this.handleKeyDown}>
                <label>{this.props.label}</label>
                {this.props.children}
            </div>
        )
    }
}