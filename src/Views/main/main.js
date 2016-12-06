var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    browserHistory = require('react-router').browserHistory,
    IndexRoute = require('react-router').IndexRoute,
    Tutorial = require('./tutorial.js');


var MainPage = React.createClass({
    render: function () {
        return (
            <div className="branding">
                Thinking in react..  i am your father
            </div>
        )
    }
});


ReactDOM.render(
    <Router history={browserHistory}>

        <Route path="/" component={Tutorial.Index}>
            <IndexRoute component={MainPage}/>
            <Route path="streams" component={Tutorial.Game} />
            <Route path="games/:game" component={Tutorial.GameInfo} />
        </Route>
    </Router>
    , document.getElementById('app'));


