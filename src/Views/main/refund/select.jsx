var React = require('react');
var ReactSelect = require('react-select');
var $ = require('jquery');
var ReactDom = require('react-dom');

function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }
    var key;
    // Test for A's keys different from B.
    for (key in objA) {
        if (objA.hasOwnProperty(key) &&
            (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
            return false;
        }
    }
    // Test for B's keys missing from A.
    for (key in objB) {
        if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}


var CompanySelect = React.createClass({
    getInitialState: function () {
        return {data: {value: 0, label: "All"}}
    },
    handleOnChange: function (value) {
        this.setState({data: value});

        this.props.onChange(
            value
        );

    },

    render: function () {
        return (
            <ReactSelect
                ref="company"
                multi={true}
                name="company"
                value={this.state.data}
                options={"OPTS HERE"}
                onChange={this.handleOnChange}
            />
        )
    }
});

var ProductSelect = React.createClass({
    getInitialState: function () {
        return {
            companyValue: "",
            external: false,

            data: {
                value: 0,
                label: "All"
            },

            opts: [
                {
                    value: 0,
                    label: "All"
                }
            ]

        }
    },
    handleOnChange: function (value) {

        this.setState({data: value});
        this.props.onChange(
            value
        );
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        //return shallowEqual(nextState, this.state);
        return true;

    },
    componentWillReceiveProps: function (next) {
        var that = this;

        if (next.companyValue != '' && next.companyValue !== this.state.companyValue) {
            setTimeout(function() {
                $.post(KBILL.refund.api.getproducts,
                    {companies: next.companyValue},
                    function (data) {
                        if (data) {
                            that.setState({
                                opts: data.products,
                                companyValue: next.companyValue
                            });
                        }

                    })
            }, 500);
        }
    },


    render: function () {
        return (
            <div>
                <ReactSelect
                    name="product"
                    isLoading={this.state.external}
                    multi={true}
                    value={this.state.data}
                    options={this.state.opts}
                    onChange={this.handleOnChange}
                />

            </div>
        );
    }
});

var SkuSelect = React.createClass({

    getInitialState: function() {
        return {
            product: '',
            company: '',
            data: [
                {
                    value: 0,
                    label: "All"
                }
            ],
            opts: [
                {
                    value: 0,
                    label: "All"
                }
            ]
        }
    },
    handleOnChange: function (value) {

        this.setState({data: value});
        this.props.onChange(
            value
        );
    },
    componentWillReceiveProps: function(next) {
        var that = this;
        if (next.company != '' && next.company !== this.state.company
            && next.product != ''
            && next.product !== this.state.product) {
            setTimeout(function() {
                $.post('URLHERE',
                    {
                        companies: next.company,
                        products: next.product

                    },
                    function (data) {
                        if (data) {
                            that.setState({
                                opts: data.skus,
                                company: next.company,
                                product: next.product
                            });
                        }

                    })
            }, 500);
        }
    },
   render: function() {
       return (
           <ReactSelect
               name="sku"
               multi={true}
               value={this.state.data}
               options={this.state.opts}
               onChange={this.handleOnChange}
           />
       )
   }
});


var PackageList = React.createClass({

    getInitialState: function() {
        return {
            product: '',
            company: '',
            sku: '',
            data: [
                {
                    value: 0,
                    label: "All"
                }
            ],
            opts: [
                {
                    value: 0,
                    label: "All"
                }
            ]
        }
    },
    handleOnChange: function (value) {

        this.setState({data: value});
        this.props.onChange(
            value
        );
    },
    componentWillReceiveProps: function(next) {
        var that = this;
        if (next.company != '' && next.company !== this.state.company
                && next.product != ''
                && next.product !== this.state.product
                && next.sku != ''
                && next.sku !== this.state.sku
        ) {
            setTimeout(function() {
                $.post('URLHERE',
                    {
                        companies: next.company,
                        products: next.product,
                        skus: next.sku

                    },
                    function (data) {
                        if (data) {
                            that.setState({
                                opts: data.skus,
                                company: next.company,
                                product: next.product,
                                sku: next.sku
                            });
                        }

                    })
            }, 500);
        }
    },
    render: function() {
        return (
            <ReactSelect
                name="sku"
                multi={true}
                value={this.state.data}
                options={this.state.opts}
                onChange={this.handleOnChange}
            />
        )
    }
});

module.exports = {
    Company: CompanySelect,
    Product: ProductSelect,
    Sku: SkuSelect,
    Package: PackageList
}