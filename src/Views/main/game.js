var React = require('react'),
    Link = require('react-router').Link;

var GameItem = React.createClass({
    render: function() {
        return (
            <li className="item">
                <Link to={`/games/${this.props.children}`} ><img src={ this.props.img } alt="img" /> {this.props.children}</Link>
            </li>
        );
    }
});

var GameList = React.createClass({
    render: function() {

        var itemNodes = this.props.data.map(function(item) {
            return (
                <GameItem key={item.name} img={item.img}>
                    {item.name}
                </GameItem>
            );
        });
        return (
            <ul className="nav nav-pills nav-stacked">
                {itemNodes}
            </ul>
        )
    }
});

module.exports = {
    GameList: GameList
}