var React = require('react'),
    Link = require('react-router').Link;


var navigation = React.createClass({
    render: function() {
        return (<div className="pageHeader">
                <h1>React.js twitch Api example</h1>
                <nav>
                    <ul className="nav nav-pills">
                        <li role="presentation"><Link to="/">Home</Link></li>
                        <li role="presentation"><Link to="jsx">JSX Concepts</Link></li>
                        <li role="presentation"><Link to="search">Search</Link></li>
                        <li role="presentation"><Link to="about">About</Link></li>
                        <li role="presentation"><Link to="button" activeClassName="active">Dynamic button</Link></li>
                        <li role="presentation"><Link to="tutorial">Examples</Link></li>
                    </ul>
                </nav>
                <div className="mainData">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = {
    Main: navigation
}