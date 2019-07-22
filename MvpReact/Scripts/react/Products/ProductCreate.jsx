import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, dimmer, Menu, Segment, Icon, Popup, Form, Table, Label } from 'semantic-ui-react';

export default class ProductCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },
            ProductName: '',
            ProductPrice: '',

            Sucess: [],
            errors: {}
        };
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onClose() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
            errors['ProductPrice'] = '*Please enter the Product Price';
        }

        if (typeof this.state.ProductPrice !== "undefined") {
            if (!this.state.ProductPrice.match(/^\d+(\.\d{1,2})?$/)) {
                formIsValid = false;
                errors["ProductPrice"] = "*Please enter numbers only.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onCreateSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let data = { 'Name': this.state.ProductName, 'Price': this.state.ProductPrice };

            $.ajax({
                url: "/Products/CreateProduct",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })
                    window.location.reload()
                }.bind(this)
            });

        }
    }

    render() {
        return (
            <React.Fragment>

                <Modal style={{ height: "220px", left: "500px", top: "200px", width: "400px" }}
                    open={this.props.showCreateModel}
                    onClose={this.props.onClose} size="small">

                    <Modal.Header> Create Product</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label color='grey'>Name</label>
                                <input autofocus="true" type="text" name="ProductName" placeholder='Name' onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.ProductName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label color='grey'>Price</label>
                                <input type="text" name="ProductPrice" placeholder='Price' onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.ProductPrice}
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