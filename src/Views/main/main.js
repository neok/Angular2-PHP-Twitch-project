var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');



var FormClass = React.createClass({
    getInitialState: function() {
        return {authorName: '', message: ''}
    },
    handleAuthorStateChange: function(e) {
        this.setState({authorName: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({message: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.state.authorName.trim(),
            message = this.state.message.trim();
        if (!author || !message) {
            return;
        }
        this.props.onFormSubmit({name: author, img: message});
        this.setState({authorName: 'Test', message: ''});
    },
    render: function() {
        return (
            <div className="gameBoxComments">
                <form className="formComment" onSubmit={this.handleSubmit}>
                    <input type="text"
                        placeholder="name"
                        value={this.state.authorName}
                        onChange={this.handleAuthorStateChange}
                    />
                    <input type="text" placeholder="Say something..."
                        value={this.state.message}
                        onChange={this.handleTextChange}
                    />
                    <input type="submit" value="Post" />
                </form>
            </div>
        )
    }
});

ReactDOM.render(
    React.createElement('h1', null, 'Trcy'),
    document.getElementById('header')
);

var data = [
    { id: 1, name: "streamer1", text: "Steaming some game"},
    { id: 2, name: "streamer2", text: "Steaming some game2"}
];

var GameItem = React.createClass({
    render: function() {
        return (
            <li className="item">
                <a href={`/game/${this.props.children}`}> <img src={ this.props.img } alt="img" /> {this.props.children}</a>
            </li>
        );
    }
});

var GameList = React.createClass({
    render: function() {
        var itemNodes = this.props.data.map(function(item) {
           return (
               <GameItem key={item.name} img={item.img}>
                   {item.name}
               </GameItem>
           );
        });
        return (
            <ul className="nav nav-pills nav-stacked">
                {itemNodes}
           </ul>
        )
    }
});



var GameBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },

    handleFormSubmit: function(newItem) {
        var data = this.state.data;
        var newData = data.concat([newItem]);
        console.log(newData);
        this.setState({data: newData});
    },

    loadDataFromServer: function() {
        $.ajax({
            url: this.props.url,
            method: "GET",
            dataType: "json",
            cache: false,
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        });

    },
    componentDidMount: function() {
        this.loadDataFromServer();
        setTimeout(this.props.interval)
    },
    render: function() {
        return (
            <div className="gameBox">
                One
                <GameList data={this.state.data} interval={2000} />
                <FormClass onFormSubmit={this.handleFormSubmit} />
            </div>
        );
    }
});





ReactDOM.render(
    <GameBox url="/json" />,
    document.getElementById('content')
);

