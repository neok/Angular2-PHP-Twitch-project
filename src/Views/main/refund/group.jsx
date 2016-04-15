var React = require('react');
var RadioGroup = require('react-radio-group');

var GroupBy = React.createClass({
    getInitialState: function() {
        return { selectedValue: 'day'}
    },
    handleChange: function(element) {
        this.setState({
            selectedValue: element
        })
        this.props.onChange(
            element
        )
    },
    render: function() {
        return (
            <div className="group-by">
                <label>Group by </label>
                <RadioGroup name="GroupBy" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                    { Radio => (
                        <div>
                            <Radio value="day" />Day
                            <Radio value="week" />Week
                            <Radio value="month" />Month
                        </div>
                    )}
                </RadioGroup>
            </div>
        )
    }
});

module.exports = {
    GroupBy: GroupBy
}