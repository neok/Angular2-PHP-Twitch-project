var React = require('react');
var ReactDOM = require('react-dom');
var update = require('react-addons-update');

var FormClass = React.createClass({
    getInitialState: function () {
        return {authorName: '', message: ''}
    },
    handleAuthorStateChange: function (e) {
        console.log(e.target.value)
        this.setState({authorName: e.target.value});
    },
    handleTextChange: function (e) {
        console.log(e.target.value)
        this.setState({message: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.state.authorName.trim(),
            message = this.state.message.trim();
        if (!author || !message) {
            return;
        }
        this.props.onFormSubmit(author, message);
        this.setState({authorName: author, message: message});
    },
    render: function () {
        return (
            <div className="gameBoxComments">
                <h1> Simple Comment form </h1>
                <form className="formComment" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text"
                               placeholder="name"
                               value={this.state.authorName}
                               onChange={this.handleAuthorStateChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Say something..."
                               value={this.state.message}
                               onChange={this.handleTextChange}
                        />
                    </div>
                    <input className="btn btn-default" type="submit" value="Post"/>
                </form>
            </div>
        )
    }
});

var Submitted = React.createClass({
    render: function() {
        return (
            <div>
                {this.props.comment.map(function(comment) {
                    return <Comment key={comment.authorName} {...comment} />
                })}

            </div>
        )
    }
});

var Comment = React.createClass({
    render: function() {
        return (
            <div class="comment">

                <span>
                    {this.props.authorName}
                    :
                    <small>{this.props.comment}</small>
                </span>
            </div>
        )
    }
});

var FormData = React.createClass({
    getInitialState: function() {
        return {data : []}
    },
    handleSubmit: function(authorName, comment) {
        var newState = update(this.state, {
            data : {
                $push : [{authorName: authorName, comment:comment}]
            }
        });
        this.setState(newState);
    },
    render: function() {
        return (
            <div className="formelement">
                <FormClass onFormSubmit={this.handleSubmit}/>
                <Submitted comment={this.state.data} />
            </div>
        )
    }
});

module.exports = {
    form: FormData
}