var React = require('react');
var Formsy = require('formsy-react');
var Select = require('./select.jsx');
var _ = require('underscore');

var Advanced = React.createClass({
    getInitialState: function () {
        return {
            canSubmit: false,
            companyValue: [],
            productValue: [],
            sku: [],
            data: '',
            test: ''
        }
    },
    handleCompanyChange: function(companyValue) {
        this.setState({companyValue: _.pluck(companyValue, "value")});
    },
    handleProductChange: function(productValue) {
        this.setState({ productValue: _.pluck(productValue, "value")});
    },
    handleSkuChange: function(sku)
    {
        this.setState({sku: _.pluck(sku, "value")})
    },
    handlePackageChange: function(sku)
    {
        this.setState({sku: sku})
    },
    enableButton: function () {
        this.setState({
            canSubmit: true
        });
    },
    disableButton: function () {
        this.setState({
            canSubmit: false
        });
    },
    submit: function () {
        var refs = this.refs;
    },
    render: function() {
        return (
            <div className="advanced-form">
                <h1> Advanced </h1>
                <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                    <Select.Company ref="company" validations="isEmail" name="company" onChange={this.handleCompanyChange} />
                    <Select.Product ref="product"  companyValue={this.state.companyValue} onChange={this.handleProductChange} />
                    <Select.Sku ref="sku"  company={this.state.companyValue}
                         product={this.state.productValue}
                         onChange={this.handleSkuChange}
                    />
                    <Select.Package ref="package" company={this.state.companyValue}
                             product={this.state.productValue}
                             sku={this.state.sku}
                             onChange={this.handlePackageChange}
                    required />
                    <button className="btn submit" type="submit" >Submit</button>
                </Formsy.Form>
                <div className="result">
                    {this.state.result}
                </div>
            </div>
        )
    }
});

module.exports = {
    Advanced: Advanced
}