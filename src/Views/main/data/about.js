var React = require('react');

var About = React.createClass({
    render: function() {
        return (
            <div className="about">
                <p>About page</p>
                <img src="/public/img/react-logo.png" alt="img" />
            </div>);
    }
});
module.exports = {
    About: About
};

