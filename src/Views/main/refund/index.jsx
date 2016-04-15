var React = require('react');
var ReactDom = require('react-dom');
var BrowserHistory = require('react-router').hashHistory;
var Router = require('react-router').Router,
    Route = require('react-router').Route,
    Date = require('./date.jsx').Date,
    GroupBy = require('./group.jsx').GroupBy;
var Company = require('./select.jsx').Company;
var Product = require('./select.jsx').Product;
var _ = require('underscore');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var NProgress = require('nprogress');
var update = require('react-addons-update');
var Sku = require('./select.jsx').Sku;
var Package = require('./select.jsx').Package;




var Result = React.createClass({
    getInitialState: function() {
        return { data : ''}
    },
    //componentWillMount: function() {
    //    NProgress.configure({ showSpinner: true });
    //    NProgress.start();
    //},
    //shouldComponentUpdate: function (nextProps, nextState) {
    //    return nextProps.data !== this.state.data;
    //},
    componentWillReceiveProps: function (next) {
        var that = this;

        setTimeout(function() {
            //NProgress.done();
            that.setState({data : next.data})
        }, 1000)
    },
    //componentDidMount: function() {
    //    var that = this;
    //
    //    setTimeout(function() {
    //        NProgress.done();
    //        that.setState({data : "Noting found"})
    //    }, 1000)
    //},
    render: function() {
        return (
            <div className="result">
                {this.state.data}
            </div>
        )
    }
})



var Element = React.createClass({

    handleSubmit: function(e) {
        e.preventDefault();

        var result = update(this.state, {data: {$set : 'ttt'}})
        this.setState(result);
    },

    getInitialState: function() {
        return {
            data_to: '',
            date_from: '',
            group_by: '',
            companyValue: [],
            productValue: [],
            sku: [],
            data: ''
        }
    },
    handleCompanyChange: function(companyValue) {
        this.setState({companyValue: _.pluck(companyValue, "value")});
    },
    handleProductChange: function(productValue) {
        this.setState({ productValue: _.pluck(productValue, "value")});
    },
    handleDateFromChange: function(date) {

        this.setState({
            date: date
        });

    },
    handleDateToChange: function(date) {
        this.setState({
            date: date
        });
    },

    handleGroupChange: function(group) {
        this.setState({group_by: group})
    },
    handleSkuChange: function(sku)
    {
        this.setState({sku: _.pluck(sku, "value")})
    },
    handlePackageChange: function(sku)
    {
        this.setState({sku: sku})
    },

    render: function() {
        return(
            <div className="reactive-box">
                <form className="d-form" onSubmit={this.handleSubmit}>
                    <div class="group-title">Date of initial charge</div>
                    <Date ref='date_from' onChange={this.handleDateFromChange} name="Date From:" form_name="date_from" />
                    <Date onChange={this.handleDateToChange} name="Date To:" form_name="date_to"/>
                    <GroupBy onChange={this.handleGroupChange} />
                    <Company onChange={this.handleCompanyChange}/>
                    <Product companyValue={this.state.companyValue} onChange={this.handleProductChange} />
                    <Sku company={this.state.companyValue}
                         product={this.state.productValue}
                         onChange={this.handleSkuChange}
                         />
                    <Package company={this.state.companyValue}
                         product={this.state.productValue}
                         sku ={this.state.sku}
                         onChange={this.handlePackageChange}
                         />
                    <div className="result">
                    </div>
                    <input type="submit" value="Search"  />
                </form>

                <Result data={this.state.data} />
            </div>
        )
    }
});


setTimeout(function() {
    ReactDom.render(
        <Router history={BrowserHistory}>
            <Route path="/" component={Element}>

            </Route>
        </Router>
    , document.getElementById('refund_app'))
}, 1000);