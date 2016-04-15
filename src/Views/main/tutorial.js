var React = require('react'),
    Navigation = require('./nav/index.js').Navigation,
    Button = require('./tutorial/button.js').DynamicButton,
    Avatar = require('./tutorial/multiple.js').Avatar,
    MyComponent = require('./tutorial/multiple.js').MyComponent,
    Reusable = require('./tutorial/reusable.js').Reusable,
    FormClass = require('./tutorial/form.js').form;

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

module.exports = {
    Index : React.createClass({
        render: function() {
            return (
                <div>
                    <Navigation header_text="Reactjs in action" logo_path="/public/img/react-logo.png">
                        {this.props.children}
                    </Navigation>
                </div>
            )
        }
    }),
    Interactive: Button,
    Multiple: Multiple,
    Reusable: Reusable,
    Form: FormClass
}