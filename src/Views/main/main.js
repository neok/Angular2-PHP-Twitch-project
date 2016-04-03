var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').hashHistory;
var IndexRoute = require('react-router').IndexRoute;

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



var GameBox = React.createClass({
    getInitialState: function() {
        return {data: []}
    },

    handleFormSubmit: function(newItem) {
        var data = this.state.data;
        var newData = data.concat([newItem]);
        this.setState({data: newData});
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
                console.error(this.props.url, status, err.toString())
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
                <FormClass onFormSubmit={this.handleFormSubmit} />
            </div>
        );
    }
});
var About = React.createClass({
    render: function() {
        return ( <div className="about">this is about page</div>);
    }
});

var Search = React.createClass({
    render: function() {
        return ( <div className="Search">this is Search page</div>);
    }
});

var Streams = React.createClass({
    render: function() {
        return ( <div className="streams">this is streams page</div>);
    }
});

var StreamItem = React.createClass({
   render: function() {
       return (
           <div key={this.props.id} className="col-md-4"> <img src={ this.props.preview } alt="img" />
               <p><strong>Streamer:</strong> { this.props.name }</p>
               <span><strong>Viewers count:</strong> { this.props.viewers }</span>
           </div>
       );
   }
});

var StreamList = React.createClass({
    render: function() {
        var nodes = this.props.data.map(function(data) {
            return (
                <StreamItem id={data.id} preview={data.preview} name={data.name} viewers={data.viewers}>
                </StreamItem>
            )
        });

        return (
            <div className="streamList">
                {nodes}
            </div>
        );
    }
});


var GameInfo = React.createClass({
    getInitialState: function() {
        return {name: [], data: []};
    },
    componentDidMount: function() {
        var currentGameName = this.props.params.name || '';
        var that = this;
        $.get('game/' + encodeURIComponent(currentGameName), function(result) {
            that.setState({
                name: currentGameName,
                data: JSON.parse(result)
            })
        });


    },
    render: function() {
        return (
            <div className="ultraGame">
                This is:
                <p>{this.state.name} Stream List</p>

                <StreamList data={this.state.data} />
            </div>
        );
    }
});

var SimpleGame = React.createClass({
   render: function() {
       return (
           <div className="game-initial-data">
               Current game
                {this.props.children}
           </div>
       );
   }
});

var Main = React.createClass({
    render: function() {
        return (<div className="pageHeader">
            <h1>React.js twitch Api example</h1>
            <nav>
                <ul className="nav nav-pills">
                    <li role="presentation"><Link to="/">Home</Link></li>
                    <li role="presentation"><Link to="streams">Streams</Link></li>
                    <li role="presentation"><Link to="search">Search</Link></li>
                    <li role="presentation"><Link to="about">About</Link></li>
                    <li role="presentation"><Link to="games/dota2" activeClassName="active">Dota2</Link></li>
                </ul>
            </nav>
            <div className="mainData">
                {this.props.children}
            </div>
        </div>
        );
    }
});


setTimeout(function() {
    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={GameBox}></IndexRoute>
                <Route path="about" component={About}/>
                <Route path="game" component={SimpleGame}></Route>
                <Route path="games/:name" component={GameInfo} />
                <Route path="streams" component={Streams}/>
                <Route path="search" component={Search}/>
            </Route>
        </Router>
        , document.getElementById('app'));
}, 1000);


