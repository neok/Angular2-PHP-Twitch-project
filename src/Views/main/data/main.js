var React = require('react'),
ReactDOM = require('react-dom'),
Router = require('react-router').Router,
Route = require('react-router').Route,
browserHistory = require('react-router').hashHistory,
IndexRoute = require('react-router').IndexRoute,
About = require('./about.js').About,
FormClass = require('./form.js').form,
Search = require('./search.js').search,
Streams=  require('./streams.js').stream,
GameList = require('./game.js').GameList,
Main = require('./nav/index.js').Main,
StreamList = require('./streams.js').StreamList,
DynamicButton = require('./button.js').DynamicButton,
Avatar = require('./tuts/components.js').Avatar,
CheckLink = require('./button.js').CheckLink,
Tick = require('./tuts/components.js').Tick;

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

var Tutorial = React.createClass({
   render: function() {
       return (
           <div className="tutorial">
                <Avatar pagename="100000529752457" />
                   <CheckLink href="/checked.html">
                       Click here!
                   </CheckLink>
               <Tick />

           </div>
       )
   }
});

setTimeout(function() {
    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={GameBox}></IndexRoute>
                <Route path="about" component={About} logo_path="/public/img/react_logo.png" />
                <Route path="games/:name" component={GameInfo} />
                <Route path="streams" component={Streams}/>
                <Route path="jsx" component={Jsx}/>
                <Route path="search" component={Search}/>
                <Route path="button" component={DynamicButton}/>
                <Route path="tutorial" component={Tutorial} />
            </Route>
        </Router>
        , document.getElementById('app'));
}, 1000);


