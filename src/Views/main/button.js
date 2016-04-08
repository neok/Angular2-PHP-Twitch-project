var React = require('react');

var Button = React.createClass({
    getInitialState: function() {
        return {
            clicked: false
        }
    },
    onSubmit: function(e) {
        this.setState({
            clicked: !this.state.clicked
        });
    },
    render: function() {
        var currentClass = this.state.clicked ? 'btn btn-success' : 'btn btn-info'
        return (
            <p onClick={this.onSubmit} >

                <button className={currentClass}>Submit me</button>
            </p>

        );
    }

});

var Props = React.createClass({
    getDefaultProps: function() {

    },
       propTypes: function() {
           children: React.PropTypes.element.isRequired
       },
    render: function() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});

var CheckLink = React.createClass({
    render: function() {
        return (
            <a {...this.props}>
                {this.props.children}
            </a>
        )
    }
});

module.exports = {
    DynamicButton: Button,
    CheckLink: CheckLink
}