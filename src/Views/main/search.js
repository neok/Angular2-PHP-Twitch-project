var React = require('react');
var ReactSelect = require('react-select');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var _ = require('underscore');
var opts = [
    {
        value: 0, label: "All"
    },
    {
        value: 1, label: "Kromtech"
    },
    {
        value: 2, label: "MacKeeper"
    }
];

var CompanySelect = React.createClass({
    getInitialState: function() {
        return { data: { value: 0, label: "All" }}
    },
    handleOnChange: function(value) {
        this.setState({data : value});
        this.props.onChange(
            value
        );
    },
    render: function() {
        return (
            <ReactSelect
                ref="company"
                multi={true}
                name="company"
                value={this.state.data}
                options={opts}
                onChange={this.handleOnChange}
            />
        )
    }
});

var ProductSelect = React.createClass({
    getInitialState: function() {
        return { companyValue: "", selected: '', opts: [{value: 0, label: "All"}]}
    },
    handleOnChange: function(value) {
        this.setState({selected : value});
    },
    shouldComponentUpdate: function(nextProps, nextState) {

        return this.props.companyValue !== nextProps.companyValue;
    },
    componentDidUpdate: function(prev, prevState) {
        var that = this;
        if (this.props.companyValue) {
            $.get('/product/0', function(data) {
                if (data) {
                    var newData = JSON.parse(data);
                    console.log(newData);
                    console.log(opts);
                    that.setState({
                        opts: newData
                    });
                    console.log(that.state)
                }

            })
        }
    },

    render: function() {
console.log(this.state.opts);
        return (
            <div>
                <ReactSelect
                    ref="product"
                    name="product"
                    multi={true}
                    options={this.state.opts}
                    onChange={this.handleOnChange}
                />

                </div>
        );
    }
});

var CurrentForm = React.createClass({
    getInitialState: function() {
        return { companyValue: ''}
    },
    handleCompanyChange: function(companyValue) {
        this.setState({companyValue: _.pluck(companyValue, "value")});
    },
    render: function() {
        return (
            <div className="Search">
                this is Search page
                <CompanySelect onChange={this.handleCompanyChange} />

                <ProductSelect companyValue={this.state.companyValue} />
            </div>);
    }
});

module.exports = {
    search: CurrentForm
}