import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
import ProductCreate from './ProductCreate.jsx';
import ProductUpdate from './ProductUpdate.jsx';
import ProductDelete from './ProductDelete.jsx';

export default class ProductTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductList: [],
            Success: { Data: '' },

            showCreateModel: false,

            showUpdateModel: false,
            updateId: 0,

            showDeleteModal: false,
            deleteId: 0,

            ProductId: '',
            ProductName: '',
            ProductPrice: '',

            Sucess: [],
            errors: {}
        }

        this.loadData = this.loadData.bind(this);

        this.showCreateModel = this.showCreateModel.bind(this);
        this.closeCreateModel = this.closeCreateModel.bind(this);
        this.onChange = this.onChange.bind(this);

        this.showUpdateModel = this.showUpdateModel.bind(this);
        this.closeUpdateModel = this.closeUpdateModel.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    //Get Product
    loadData() {

        $.ajax({
            url: "/Products/GetProducts",
            type: "GET",
            success: function (data) { this.setState({ ProductList: data }) }.bind(this)
        });
    }

    //Create
    showCreateModel() {
        this.setState({ showCreateModel: true });
    }

    closeCreateModel() {
        this.setState({ showCreateModel: false });
        window.location.reload()
    }

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }

    //Update
    showUpdateModel(id) {
        this.setState({ showUpdateModel: true });
        this.setState({ updateId: id });

        $.ajax({
            url: "/Products/GetUpdateProduct",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ ProductId: data.Id, ProductName: data.Name, ProductPrice: data.Price })
            }.bind(this)
        });
    }

    closeUpdateModel() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.ProductName) {
            formIsValid = false;
            errors['ProductName'] = '*Please enter the Product Name.';
        }

        if (!this.state.ProductPrice) {
            formIsValid = false;
            errors['ProductPrice'] = '*Please enter the Product Price'
        }

        //if (typeof this.state.ProductPrice !== "undefined") {
        //    if (!this.state.ProductPrice.match(/(\d+\.?\d{1,2})/)) {
        //        formIsValid = false;
        //        errors["ProductPrice"] = "*Please enter numbers only.";
        //    }
        //}

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onUpdateSubmit() {
        if (this.validateForm()) {

            let data = { 'Id': this.state.ProductId, 'Name': this.state.ProductName, 'Price': this.state.ProductPrice };

            $.ajax({
                url: "/Products/UpdateProduct",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })
                    window.location.reload()
                }.bind(this)
            });

        }
    }

    //Delete    
    handleDelete(id) {

        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
    }

    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    render() {
        let productList = this.state.ProductList;
        let tableData = null;
        if (productList != "") {
            tableData = productList.map(list =>
                <tr key={list.Id}>
                    <td>{list.Name}</td>
                    <td>{list.Price}</td>
                    <td>
                        <button onClick={this.showUpdateModel.bind(this, list.Id)} className="ui yellow button"><i className="edit icon"></i>Edit</button>
                    </td>
                    <td><button onClick={this.handleDelete.bind(this, list.Id)} className="btn btn-danger btn-sm"><i className="trash icon"></i>Delete</button></td>
                </tr>)
        }

        return (
            <React.Fragment>
                <div>
                    <br />
                    <div>
                        <button className="btn btn-primary" primary="true" onClick={this.showCreateModel}>New Product</button>
                        <ProductCreate
                            onChange={this.onChange}
                            onClose={this.closeCreateModel}
                            onCreateSubmit={this.onCreateSubmit}
                            showCreateModel={this.state.showCreateModel} />
                    </div>
                    <br />
                </div>
                <div>
                    <ProductUpdate
                        onChange={this.onChange}
                        update={this.state.updateId}
                        onClose={this.closeUpdateModel}
                        onUpdateSubmit={this.onUpdateSubmit}
                        showUpdateModel={this.state.showUpdateModel}
                        Id={this.state.ProductId}
                        Name={this.state.ProductName}
                        Price={this.state.ProductPrice}
                        errors={this.state.errors} />

                    <ProductDelete
                        delete={this.state.deleteId}
                        onClose={this.closeDeleteModal}
                        onDeleteSubmit={this.onDeleteSubmit}
                        showDeleteModal={this.state.showDeleteModal} />

                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Price</th>
                                <th>Action (Edit)</th>
                                <th>Action (Delete)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}