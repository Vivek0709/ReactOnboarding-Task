import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
import CustomerCreate from './CustomerCreate.jsx';
import CustomerUpdate from './CustomerUpdate.jsx';
import CustomerDelete from './CustomerDelete.jsx';



export default class CustomerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CustomerList: [],

            showCreateModel: false,

            showUpdateModel: false,
            updateId: 0,

            showDeleteModal: false,
            deleteId: 0,

            CustomerId: '',
            CustomerName: '',
            CustomerAddress: '',

            Success: { Data: '' },
            Sucess: [],
            errors: {}
        };

        this.loadData = this.loadData.bind(this);

        this.showCreateModel = this.showCreateModel.bind(this);
        this.closeCreateModel = this.closeCreateModel.bind(this);

        this.showUpdateModel = this.showUpdateModel.bind(this);
        this.closeUpdateModel = this.closeUpdateModel.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);

        this.onChange = this.onChange.bind(this);
    }


    componentDidMount() {
        this.loadData();
    }
    //Get customers
    loadData() {
        debugger;
        $.ajax({
            url: "/Customer/GetCustomers",
            type: "GET",
            success: function (data) { this.setState({ CustomerList: data }) }.bind(this)
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
            url: "/Customer/GetUpdateCustomer",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ CustomerId: data.Id, CustomerName: data.Name, CustomerAddress: data.Address })
            }.bind(this)
        });

        console.log(id);
    }

    closeUpdateModel() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.CustomerName) {
            formIsValid = false;
            errors['CustomerName'] = '*Please enter the Customer Name.';
        }

        if (typeof this.state.CustomerName !== "undefined") {
            if (!this.state.CustomerName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["CustomerName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.CustomerAddress) {
            formIsValid = false;
            errors['CustomerAddress'] = '*Please enter the Customer Address'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onUpdateSubmit() {
        if (this.validateForm()) {

            let data = { 'Id': this.state.CustomerId, 'Name': this.state.CustomerName, 'Address': this.state.CustomerAddress };

            $.ajax({
                url: "/Customer/UpdateCustomer",
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
        debugger;
        let customerList = this.state.CustomerList;
        let tableData = null;
        if (customerList != "") {
            tableData = customerList.map(list =>
                <tr key={list.Id}>
                    <td>{list.Name}</td>
                    <td>{list.Address}</td>
                    <td><button onClick={this.showUpdateModel.bind(this, list.Id)} className="ui yellow button"><i className="edit icon"></i>Edit</button>
                    </td>
                    <td><button onClick={this.handleDelete.bind(this, list.Id)} className="btn btn-danger btn-sm"><i className="trash icon"></i>Delete</button></td>
                </tr>)
        }
        return (
            <React.Fragment>
                <div>
                    <br />
                    <div>
                        <button className="btn btn-primary" primary="true" onClick={this.showCreateModel}>New Customer</button>
                    </div>
                    <br />

                    <CustomerCreate
                        onChange={this.onChange}
                        onClose={this.closeCreateModel}
                        onCreateSubmit={this.onCreateSubmit}
                        showCreateModel={this.state.showCreateModel} />
                </div>
                <div>
                    <CustomerUpdate
                        onChange={this.onChange}
                        update={this.state.updateId}
                        onClose={this.closeUpdateModel}
                        onUpdateSubmit={this.onUpdateSubmit}
                        showUpdateModel={this.state.showUpdateModel}
                        Id={this.state.CustomerId}
                        Name={this.state.CustomerName}
                        Address={this.state.CustomerAddress}
                        errors={this.state.errors} />

                    <CustomerDelete
                        delete={this.state.deleteId}
                        onClose={this.closeDeleteModal}
                        onDeleteSubmit={this.onDeleteSubmit}
                        showDeleteModal={this.state.showDeleteModal}/>

                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th>Customer name</th>
                                <th>Address</th>
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
        )
    }
}