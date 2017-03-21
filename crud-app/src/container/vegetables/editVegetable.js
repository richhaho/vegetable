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

export default class editVegetable extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.editVegetableModal}
          toggle={this.props.toggleEditVegetableModal}
        >
          <ModalHeader toggle={this.props.toggleEditVegetableModal}>
            Update Vegetable
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={this.props.editVegetableData.name}
                onChange={this.props.onChangeEditVegetableHanler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={this.props.editVegetableData.price}
                onChange={this.props.onChangeEditVegetableHanler}
              />
            </FormGroup>

            <FormGroup>
              <Label for="contact_name">Contact Name</Label>
              <Input
                id="contact_name"
                name="contact_name"
                value={this.props.editVegetableData.contact_name}
                onChange={this.props.onChangeEditVegetableHanler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="contact_number">Contact Number</Label>
              <Input
                id="contact_number"
                name="contact_number"
                value={this.props.editVegetableData.contact_number}
                onChange={this.props.onChangeEditVegetableHanler}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="primary" 
              onClick={this.props.updateVegetable}
            >
              Update
            </Button>
            <Button
              color="secondary"
              onClick={this.props.toggleEditVegetableModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}