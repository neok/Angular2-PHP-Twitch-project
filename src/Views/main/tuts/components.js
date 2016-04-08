var React = require('react');
/**
 * React Avatar component
 */
var Avatar = React.createClass({
    render: function() {
        return (
            <div>
                One way binding in React<br />
                Dynamic children always should have key
                <PagePic pagename={this.props.pagename} />
                <PageLink pagename={this.props.pagename} />
            </div>
        );
    }
});

var PagePic = React.createClass({
    render: function() {
        return (
            <img src={'https://graph.facebook.com/' + this.props.pagename + '/picture'} />
        )
    }
});

var PageLink = React.createClass({
    render: function() {
        return (
                <a href={'https://graph.facebook.com/' + this.props.pagename + '/picture'}>
                    {this.props.pagename}
                </a>

        )
    }
});

//mixins
var SetIntervalMixIn = {
    componentWillMount: function() {
        this.intervals = []
    },

    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },

    componentWillUnmount: function() {
        this.intervals.forEach(clearInterval);
    }
};


var TickTack = React.createClass({
    mixins: [SetIntervalMixIn],
    getInitialState: function() {
        return { seconds: 0 }
    },

    componentDidMount: function() {
        var that = this;
        this.setInterval(function() {
            that.setState({seconds: that.state.seconds + 1})
        }, 1000)
    },
    render: function() {
        return (
            <p>
                You are wasting your time here for a {this.state.seconds} seconds
            </p>
        )
    }
});



module.exports = {
    Avatar: Avatar,
    Tick: TickTack
}
