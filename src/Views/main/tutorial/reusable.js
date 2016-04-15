var React = require('react'),
    ReactDOM = require('react-dom'),
    NProgress = require('nprogress');


var NprogressMixin = {
    componentWillMount: function() {
        NProgress.start();
    },

    componentDidMount: function() {
        NProgress.done()
    }
}


var Reusable = React.createClass({
    mixins: [NprogressMixin],
    getInitialState: function() {
        return {
            showMixin: false
        }
    },
    loadMixin: function() {
        this.setState({
            showMixin: true
        })
    },

   render: function() {
       return (
           <div className="reusable-data">
                <span>reusable...
                <small>Easy error debugging...</small></span>
                <ElementRequired />
                <button onClick={this.loadMixin} className="btn btn-success">Load Tick mixin</button>

               {this.state.showMixin ? <MixinContainer /> : null }


           </div>
       )
   }
});

var ElementRequired = React.createClass({
    propTypes: {
        children: React.PropTypes.element.isRequired
    },

    render: function() {
        return (
            <div>
                 /*This must be exactly one element or it will warn. */
                {this.props.children}
            </div>
        );
    }

});


var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.forEach(clearInterval);
    }
};

var TickTock = React.createClass({
    mixins: [SetIntervalMixin], // Use the mixin
    getInitialState: function() {
        return {seconds: 0};
    },
    componentDidMount: function() {
        this.setInterval(this.tick, 1000); // Call a method on the mixin
    },
    tick: function() {
        this.setState({seconds: this.state.seconds + 1});
    },
    render: function() {
        return (
            <p>
                React has been running for {this.state.seconds} seconds.
            </p>
        );
    }
});


var MixinContainer = React.createClass({
    render: function() {
        return (
            <div className="mixin-container">
                <h1>Mixins are awesome! :)</h1>
                <span>Components are the best way to reuse code in React, but sometimes very different components may share some common functionality.</span>
                <TickTock />
            </div>
        )
    }
});



module.exports = {
    Reusable: Reusable,
    progressMixin: NprogressMixin
}