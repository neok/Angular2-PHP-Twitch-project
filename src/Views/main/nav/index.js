var React = require('react'),
    Link = require('react-router').Link;


var navigation = React.createClass({
    render: function() {

        return (<div className="pageHeader">
                <Link role="presentation" to ="/"><img className="logo" src={this.props.logo_path} alt="logo" /></Link>
                <h1>{this.props.header_text}</h1>
                <nav>
                    <ul className="nav nav-pills">
                        <li role="presentation"><Link activeStyle={{ color: 'green' }} to="interactive">Interactive</Link></li>
                        <li role="presentation"><Link activeStyle={{ color: 'green' }} to="multiple">Multiple</Link></li>
                        <li role="presentation"><Link activeStyle={{ color: 'green' }} to="reusable">Reusable</Link></li>
                        <li role="presentation"><Link activeStyle={{ color: 'green' }} to="form">Form</Link></li>
                        <li role="presentation"><Link activeStyle={{ color: 'green' }} to="advanced">Advanced Form</Link></li>
                        <li role="presentation"><Link activeStyle={{ color: 'green' }} to="streams">Game list</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
});

module.exports = {
    Navigation: navigation
}