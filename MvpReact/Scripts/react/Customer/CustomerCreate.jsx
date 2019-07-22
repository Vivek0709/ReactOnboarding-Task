import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, dimmer, Menu, Segment, Icon, Popup, Form, Table, Label } from 'semantic-ui-react';

export default class CustomerCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },
            CustomerName: '',
            CustomerAddress: '',

            Sucess: [],
            errors: {}
        };


        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
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

    onCreateSubmit(e) {
       // debugger;
        e.preventDefault();
        if (this.validateForm()) {
            let data = { 'Name': this.state.CustomerName, 'Address': this.state.CustomerAddress };

            $.ajax({
                url: "/Customer/CreateCustomer",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })

                    window.location.reload()
                }.bind(this)
            });
        }
    }

    onClose() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }
    showCreateModel() {
        this.setState({ showDeleteModal: true });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <React.Fragment>

                <Modal style={{ height: "220px", left: "500px", top: "200px", width: "400px" }} open={this.props.showCreateModel} onClose={this.props.onClose} size="small">
                    <Modal.Header> Create Customer</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label color='grey'>Name</label>
                                <input autofocus="true" type="text" name="CustomerName" placeholder='Name' onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.CustomerName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label color='grey'>Address</label>
                                <input type="text" name="CustomerAddress" placeholder='Address' onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.CustomerAddress}
                                </div>
                            </Form.Field>
                            <Modal.Actions>
                                <div className="left-aligned-container">
                                    <Button onClick={this.props.onClose} secondary >Cancel</Button>
                                    <Button onClick={this.onCreateSubmit} className="ui green button">Create   <Icon name='checkmark' />
                                    </Button>
                                </div>
                            </Modal.Actions>
                        </Form>
                    </Modal.Content>
                </Modal>
            </React.Fragment>
        )
    }
}