var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');
require('jquery-ui');
var DatePicker = require('react-datepicker');
var moment = require('moment');


var Date = new React.createClass({

    getInitialState: function () {
        return {
            startDate: moment(),
            errorMessage: ''
        }
    },

    changeHandler: function (value) {
        var state = {startDate: value}
        if (value === null) {
            state.errorMessage = 'Field cannot be empty';
        } else {
            state.errorMessage = ''
        }

        this.setState(state)
        this.props.onChange(
            value,
            state.errorMessage
        );
    },

    render: function () {
        var className = 'hidden';

        if (this.state.errorMessage) {
            className = "error-message";
        }
        return (
            <div className="date">

                <label className="input-label items-container_selectors">{this.props.name} </label>

                <DatePicker
                    name={this.props.form_name}
                    selected={this.state.startDate}
                    onChange={this.changeHandler}
                />
                <div className={className}>
                    <span>{this.state.errorMessage}</span>
                </div>

            </div>
        )
    }
});

module.exports = {
    Date: Date
}