import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, dimmer, Menu, Segment, Icon, Popup, Form, Table, Label } from 'semantic-ui-react';

export default class StoreCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },

            StoreName: '',
            StoreAddress: '',

            Sucess: [],
            errors: {}
        }
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.StoreName) {
            formIsValid = false;
            errors['StoreName'] = '*Please enter the Store Name.';
        }

        if (typeof this.state.StoreName !== "undefined") {
            if (!this.state.StoreName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["StoreName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.StoreAddress) {
            formIsValid = false;
            errors['StoreAddress'] = '*Please enter the Store Address'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onCreateSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let data = { 'Name': this.state.StoreName, 'Address': this.state.StoreAddress };

            $.ajax({
                url: "/Store/CreateStore",
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

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <React.Fragment>

                <Modal style={{ height: "220px", left: "500px", top: "200px", width: "400px" }}
                    open={this.props.showCreateModel}
                    onClose={this.props.onClose} size="small">

                    <Modal.Header> Create Store</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label color='grey'>Name</label>
                                <input autofocus="true" type="text" name="StoreName" placeholder='StoreName' onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.StoreName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label color='grey'>Address</label>
                                <input type="text" name="StoreAddress" placeholder='StoreAddress' onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.StoreAddress}
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
            </React.Fragment>)
    }
}