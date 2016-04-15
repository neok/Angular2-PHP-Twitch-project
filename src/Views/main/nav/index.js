var React = require('react'),
    Link = require('react-router').Link;


var navigation = React.createClass({
    render: function() {

        return (<div className="pageHeader">
                <img className="logo" src={this.props.logo_path} alt="logo" />
                <h1>{this.props.header_text}</h1>
                <nav>
                    <ul className="nav nav-pills">
                        <li role="presentation"><Link activeStyle={{ color: 'red' }} to="interactive">Interactive</Link></li>
                        <li role="presentation"><Link activeStyle={{ color: 'red' }} to="multiple">Multiple</Link></li>
                        <li role="presentation"><Link activeStyle={{ color: 'red' }} to="reusable">Reusable</Link></li>
                        <li role="presentation"><Link activeStyle={{ color: 'red' }} to="form">Form</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
});

module.exports = {
    Navigation: navigation
}