var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
    React.createElement('h1', null, 'Trcy'),
    document.getElementById('header')
);

var GameItem = React.createClass({
    render: function() {
        return (
            <div className="CommentItem">
                <h4 className="commentAuthor">
                    {this.props.author}
                    {this.props.pro}
                </h4>
                {this.props.children}
            </div>
        );
    }
});

var GameList = React.createClass({
    render: function() {
        return (
            <div className="gameList">
                <GameItem author="neok" pro="GG">First game</GameItem>
                <GameItem author="zeo">Second game</GameItem>
            </div>
        )
    }
});



var GameBox = React.createClass({
    render: function() {
        return (
            <div className="gameBox">
                One
                <GameList />
            </div>
        );
    }
});


ReactDOM.render(
    <GameBox />,
    document.getElementById('content')
);
//
//var CommentBox = React.createClass({
//    render: function() {
//        return (
//            <div className="commentBox">
//                Hello, world! I am a CommentBox.
//            </div>
//        );
//    }
//});
//ReactDOM.render(
//    <CommentBox />,
//    document.getElementById('content')
//);

