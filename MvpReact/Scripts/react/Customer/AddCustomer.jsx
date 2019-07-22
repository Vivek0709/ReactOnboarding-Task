import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, dimmer, Menu, Segment, Icon, Popup, Form, Table, Label } from 'semantic-ui-react';


export default class AddCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },
            newCustomer: {
                CName: '',
                CAddress: '',
            }        
        }
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.setState({ showDeleteModal: false });
    }

    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.isAddCustomerModal} onClose={this.props.onClose}>
                    <Modal.Header>New Customer</Modal.Header>
                    <Form>
                        <Form.Field>
                            <label>First Name</label>
                            <input placeholder='First Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Address</label>
                            <input placeholder='Address' />
                        </Form.Field>
                        <Button type='submit'>Create</Button>
                    </Form>
                </Modal>
            </React.Fragment>
        )
    }
}