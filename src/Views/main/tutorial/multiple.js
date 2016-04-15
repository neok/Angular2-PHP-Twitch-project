var React = require('react');
/**
 * React Avatar component
 */
var Avatar = React.createClass({
    render: function() {
        return (
            <div>
                <PagePic pagename={this.props.pagename} />
                <PageLink pagename={this.props.pagename} />
            </div>
        );
    }
});

var PagePic = React.createClass({
    render: function() {
        return (
            <div className="row">
                <img src={'https://graph.facebook.com/' + this.props.pagename + '/picture'} />
            </div>
        )
    }
});

var PageLink = React.createClass({
    render: function() {
        return (
            <div className="row">
                <a href={'https://graph.facebook.com/' + this.props.pagename + '/picture'}>
                    {this.props.pagename}
                </a>
            </div>

        )
    }
});

var ListItemWrapper = React.createClass({
    render: function() {
        return <li>{this.props.data.text}</li>;
    }
});
var MyComponent = React.createClass({
    render: function() {
        return (
            <ul>
                One way binding in React<br />
                Dynamic children always should have key<br />

                {this.props.results.map(function(result) {
                    return <ListItemWrapper key={result.id} data={result}/>;
                })}
            </ul>
        );
    }
});

module.exports = {
    Avatar: Avatar,
    MyComponent: MyComponent
}
