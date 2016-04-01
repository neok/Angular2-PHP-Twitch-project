var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
    React.createElement('h1', null, 'Trcy'),
    document.getElementById('header')
);

var data = [
    { id: 1, name: "streamer1", text: "Steaming some game"},
    { id: 2, name: "streamer2", text: "Steaming some game2"}
];

var GameItem = React.createClass({
    rawMarkup: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup }
    },
    render: function() {
        return (
            <li className="item">
                <a href="/game/"{this.props.name}> <img src="{ this.props.img }" alt="img" /> {this.props.name}</a>
            </li>
        );
    }
});

var GameList = React.createClass({
    render: function() {
        var itemNodes = this.props.data.map(function(item) {
           return (
               <GameItem key={item.name}>
                   {item.img}
                   </GameItem>
           );
        });
        return (
            <ul class="nav nav-pills nav-stacked">
                {itemNodes}
           </ul>
        )
    }
});



var GameBox = React.createClass({
    render: function() {
        return (
            <div className="gameBox">
                One
                <GameList data={this.props.data} />
            </div>
        );
    }
});


ReactDOM.render(
    <GameBox url="/json" />,
    document.getElementById('content')
);

