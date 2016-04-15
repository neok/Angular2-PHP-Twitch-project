var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    browserHistory = require('react-router').hashHistory,
    IndexRoute = require('react-router').IndexRoute,
    Tutorial = require('./tutorial.js');

var MainPage = React.createClass({
    render: function() {
        return (
            <div className="branding">
                Thinking in react.. sdfjasdifasdf
            </div>
        )
    }
});

setTimeout(function() {
    ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Tutorial.Index}>
            <IndexRoute component={MainPage} />
            <Route path="interactive" component={Tutorial.Interactive} />
            <Route path="multiple" component={Tutorial.Multiple} />
            <Route path="reusable" component={Tutorial.Reusable} />
            <Route path="form" component={Tutorial.Form} />
        </Route>
    </Router>
        , document.getElementById('app'));
}, 1000);