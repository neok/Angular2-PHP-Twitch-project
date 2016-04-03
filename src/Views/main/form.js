var React = require('react');
var ReactDOM = require('react-dom');

var FormClass = React.createClass({
    getInitialState: function() {
        return {authorName: '', message: ''}
    },
    handleAuthorStateChange: function(e) {
        this.setState({authorName: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({message: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.state.authorName.trim(),
            message = this.state.message.trim();
        if (!author || !message) {
            return;
        }
        this.props.onFormSubmit({name: author, img: message});
        this.setState({authorName: 'Test', message: ''});
    },
    render: function() {
        return (
            <div className="gameBoxComments">
                <form className="formComment" onSubmit={this.handleSubmit}>
                    <input type="text"
                        placeholder="name"
                        value={this.state.authorName}
                        onChange={this.handleAuthorStateChange}
                    />
                    <input type="text" placeholder="Say something..."
                        value={this.state.message}
                        onChange={this.handleTextChange}
                    />
                    <input type="submit" value="Post" />
                </form>
            </div>
        )
    }
});

ReactDOM.render(
    <FormClass />,
    document.getElementById('form-data')
);