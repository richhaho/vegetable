import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

export default class addVegetables extends Component {
  render() {
    
    return (
        <div>
            <Button
            className="float-right mb-4"
            color="primary"
            onClick={this.props.toggleNewVegetableModal}
            >
            Add Vegetable
            </Button>
            <Modal
            isOpen={this.props.newVegetableModal}
            toggle={this.props.toggleNewVegetableModal}
            >
            <ModalHeader toggle={this.props.toggleNewVegetableModal}>
                Add new Vegetable
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                <Label for="name">name</Label>
                <Input
                    id="name"
                    name="name"
                    value={this.props.newVegetableData.name}
                    onChange={this.props.onChangeAddVegetableHandler}
                />
                </FormGroup>
                <FormGroup>
                <Label for="price">Price</Label>
                <Input
                    id="price"
                    name="price"
                    type="number"
                    value={this.props.newVegetableData.price}
                    onChange={this.props.onChangeAddVegetableHandler}
                />
                </FormGroup>

                <FormGroup>
                <Label for="contact_name">Contact Name</Label>
                <Input
                    id="contact_name"
                    name="contact_name"
                    value={this.props.newVegetableData.contact_name}
                    onChange={this.props.onChangeAddVegetableHandler}
                />
                </FormGroup>
                <FormGroup>
                <Label for="contact_number">Contact Number</Label>
                <Input
                    id="contact_number"
                    name="contact_number"
                    value={this.props.newVegetableData.contact_number}
                    onChange={this.props.onChangeAddVegetableHandler}
                />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => this.props.addVegetable()}>
                Add
                </Button>{" "}
                <Button color="secondary" onClick={this.props.toggleNewVegetableModal}>
                Cancel
                </Button>
            </ModalFooter>
            </Modal>
        </div>
    );
  }
}