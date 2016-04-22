
var React = require('react'),
    Link = require('react-router').Link;

var GameBox = React.createClass({
    getInitialState: function() {
        return {data: []}
    },

    loadDataFromServer: function() {
        $.ajax({
            url:'json',
            method: "GET",
            dataType: "json",
            cache: false,
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {

            }.bind(this)
        });

    },
    componentDidMount: function() {
        this.loadDataFromServer();
    },
    render: function() {
        return (
            <div className="gameBox">
                <GameList data={this.state.data} interval={2000} />
            </div>
        );
    }
});

var GameList = React.createClass({
    render: function() {

        var itemNodes = this.props.data.map(function(item) {
            return (
                <GameItem key={item.name} img={item.img} name={item.name}>
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


var GameItem = React.createClass({
    getInitialState: function() {
        return { name: '', className: "gameInfo"}
    },
    toggleList: function(){

        if (this.state.name == '') {
            this.setState({name: this.props.name, className: "gameInfo fullWidth"})
        } else {
            this.setState({name: '', className: "gameInfo"});
        }

    },

    render: function() {
            console.log(this.state.className)
            return (
                <li className="item">
                    <img src={ this.props.img } alt="img" onClick={this.toggleList}/>
                    <div className={this.state.className}>
                        <GameInfo name={this.state.name}/>
                    </div>
                </li>
            )

    }
});


var GameInfo = React.createClass({
    getInitialState: function() {
        return {name: [], data: []};
    },
    componentWillReceiveProps: function(next) {
        var currentGameName = next.name;
        var that = this;
        if (currentGameName != '') {
            $.get('game/' + encodeURIComponent(currentGameName), function(result) {
                if (result) {
                    that.setState({
                        name: currentGameName,
                        data: JSON.parse(result)
                    })
                }

            });
        } else {
            that.setState({
                data: []
            })
        }



    },
    render: function() {
        return (
            <div className="ultraGame">

                <p>{this.state.name} Stream List</p>

                <StreamList data={this.state.data} />
            </div>
        );
    }
});



var StreamItem = React.createClass({
    render: function() {
        return (
            <div className="col-md-4"> <img src={ this.props.preview } alt="img" />
                <p><strong>Streamer:</strong> { this.props.name }</p>
                <span><strong>Viewers count:</strong> { this.props.viewers }</span>
            </div>
        );
    }
});

var StreamList = React.createClass({
    render: function() {
        if (this.props.data.length > 0) {
            var nodes = this.props.data.map(function(data) {
                return (
                    <StreamItem key={data.id}  preview={data.preview} name={data.name} viewers={data.viewers}>
                    </StreamItem>
                )
            });
            return (
                <div className="streamList">
                    {nodes}
                </div>
            );
        } else {
            return (
                <div className="streamList">
                    &nbsp;
                </div>
            )
        }



    }
});

module.exports = {
    Game: GameBox,
    GameInfo: GameInfo
}