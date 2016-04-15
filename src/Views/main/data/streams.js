var React = require('react');

var Streams = React.createClass({
    render: function() {
        return ( <div className="streams">this is streams page</div>);
    }
});



var StreamItem = React.createClass({
    render: function() {
        return (
            <div key={this.props.id} className="col-md-4"> <img src={ this.props.preview } alt="img" />
                <p><strong>Streamer:</strong> { this.props.name }</p>
                <span><strong>Viewers count:</strong> { this.props.viewers }</span>
            </div>
        );
    }
});

var StreamList = React.createClass({
    render: function() {
        var nodes = this.props.data.map(function(data) {
            return (
                <StreamItem id={data.id} preview={data.preview} name={data.name} viewers={data.viewers}>
                </StreamItem>
            )
        });

        return (
            <div className="streamList">
                {nodes}
            </div>
        );
    }
});


module.exports = {
    stream: Streams,
    StreamList: StreamList
}