var React = require('react'),
    Navigation = require('./nav/index.js').Navigation,
    Button = require('./tutorial/button.js').DynamicButton,
    Avatar = require('./tutorial/multiple.js').Avatar,
    MyComponent = require('./tutorial/multiple.js').MyComponent,
    Reusable = require('./tutorial/reusable.js').Reusable,
    FormClass = require('./tutorial/form.js').form,
    Advanced = require('./tutorial/advanced.js').Advanced,
    Game = require('./tutorial/game.js').Game;
var ReactComponent = require('react').Component;
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var opts = [{id: 1, text:"test"}, {id:2, text:"test2"}];

var Multiple = React.createClass({
    render: function() {
        return (
            <div className="avatar">
                <Avatar pagename="100000529752457" />
                <MyComponent results={opts}/>

            </div>
        )
    }
});

var Index = React.createClass({
    render: function() {
        return (
            <div>
                <Navigation header_text="Reactjs in action" logo_path="/public/img/react-logo.png" />
                <div className="mainData">
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        {React.cloneElement(this.props.children, {
                            key: this.props.location.pathname
                        })}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )
    }
})


module.exports = {
    Index : Index,
    Interactive: Button,
    Multiple: Multiple,
    Reusable: Reusable,
    Form: FormClass,
    Advanced: Advanced,
    Game:Game
}