var React = require('react');
var DynamicButton = React.createClass({
    getInitialState: function() {
        return {
            clicked: false,
            data: ''
        }
    },

    getMarkup: function() {
        return this.state.data
    },
    onSubmit: function(e) {
        this.setState({
            clicked: !this.state.clicked
        });
    },
    showData: function() {
        var that = this;
        if (!this.state.data) {
            $.get('/data', function(data){
                var data = JSON.parse(data);
                if (data && data.result) {

                    that.setState({
                        data: data.result
                    })
                }
            })
        } else {
            that.setState(
                {
                    data: ""
                }
            )
        }

    },
    render: function() {
        var currentClass = this.state.clicked ? 'btn btn-success' : 'btn btn-info'
        return (
            <div>
            <p onClick={this.onSubmit} >
                <button className={currentClass}>Click me </button>
            </p>
                <small>
                    </small>
                <button className="btn" onClick={this.showData}>Show code && explain </button>
                <div className="react-data-block" dangerouslySetInnerHTML={{__html: this.getMarkup() }}>
                </div>
            </div>
        );
    }

});


module.exports = {
    DynamicButton: DynamicButton
}