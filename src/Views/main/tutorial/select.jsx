var React = require('react');
var ReactSelect = require('react-select');
var $ = require('jquery');
var ReactDom = require('react-dom');

var companies = [
    {value: 0, label: "All"},
    {value: 1, label: "Kromtech"},
    {value: 2, label: "Zeo"},
    {value: 3, label: "Tricks"},
];

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
            <div className="form-item">
                <ReactSelect
                    ref="company"
                    multi={true}
                    name="company"
                    value={this.state.data}
                    options={companies}
                    onChange={this.handleOnChange}
                />
            </div>
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
                $.post('product_list',
                    {companies: next.companyValue},
                    function (data) {
                        data = JSON.parse(data);
                        if (data) {
                            that.setState({
                                opts: data,
                                companyValue: next.companyValue
                            });
                        }

                    })
            }, 1500);
        }
    },


    render: function () {
        return (
            <div className="form-item">
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
                $.post('/sku',
                    {
                        companies: next.company,
                        products: next.product

                    },
                    function (data) {
                        data = JSON.parse(data);
                        if (data) {
                            that.setState({
                                opts: data,
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
           <div className="form-item">
           <ReactSelect
               name="sku"
               multi={true}
               value={this.state.data}
               options={this.state.opts}
               onChange={this.handleOnChange}
           />
           </div>
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
                $.post('package',
                    {
                        companies: next.company,
                        products: next.product,
                        skus: next.sku

                    },
                    function (data) {
                        data = JSON.parse(data);
                        if (data) {
                            that.setState({
                                opts: data,
                                company: next.company,
                                product: next.product,
                                sku: next.sku
                            });
                        }

                    })
            }, 1100);
        }
    },
    render: function() {
        return (
            <div className="form-item">
                <ReactSelect
                    name="sku"
                    multi={true}
                    value={this.state.data}
                    options={this.state.opts}
                    onChange={this.handleOnChange}
                />
            </div>
        )
    }
});

module.exports = {
    Company: CompanySelect,
    Product: ProductSelect,
    Sku: SkuSelect,
    Package: PackageList
}