import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
class ModalEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleEvent: {},
      show: false,
      textField: true,
      singleEventString: "",
      nestedModal: false,
      innerText: "",
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changingField = this.changingField.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
    this.showNestedModal = this.showNestedModal.bind(this);
    this.closeAll = this.closeAll.bind(this);
  }

  showNestedModal(errorShown) {
    this.setState({
      innerText: errorShown,
      nestedModal: !this.state.nestedModal,
    });
  }

  closeAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
    });
  }

  handleShow(singleEvent) {
    let dummyEvent = singleEvent;
    const businessEvent = JSON.parse(dummyEvent.businessEventString);
    dummyEvent = { ...dummyEvent, businessEvent };
    dummyEvent.businessEventString = undefined;
    //console.log(dummyEvent);
    const eventString = JSON.stringify(dummyEvent, null, 2);
    this.setState({
      show: true,
      singleEvent: { ...singleEvent },
      singleEventString: eventString,
    });
  }

  changingField(event) {
    const target = event.target;
    const value = target.value;
    this.setState({ singleEventString: value });
    //console.log(this.state.singleEventString);
  }

  async submitEvent(event) {
    const { singleEventString } = this.state;
    let eventToUpdate;
    try {
      eventToUpdate = JSON.parse(singleEventString);
      let id = eventToUpdate.idempotenceId;
      const businessEventString = JSON.stringify(
        eventToUpdate.businessEvent,
        null,
        2
      );
      delete eventToUpdate.idempotenceId;
      delete eventToUpdate.businessEvent;
      eventToUpdate = { ...eventToUpdate, businessEventString };
      const response = await fetch("/api/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventToUpdate),
      });
      if (!response.ok) this.showNestedModal("Invalid Input Error");
      else {
        window.location.reload(false);
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        this.showNestedModal("JSON Parsing Error");
      }
    }
  }

  handleClose() {
    this.setState({ show: false, textField: !this.state.textField });
  }

  handleChange() {
    this.setState({ textField: !this.state.textField });
  }

  render() {
    const element = this.state.textField ? (
      <pre>{this.state.singleEventString}</pre>
    ) : (
      <Form>
        <FormGroup>
          <Label for="exampleText">Edit Event Here</Label>
          <Input
            style={{ height: "500px" }}
            type="textarea"
            name="text"
            id="exampleText"
            onChange={this.changingField}
            defaultValue={this.state.singleEventString}
          />
        </FormGroup>
      </Form>
    );

    const buttons = this.state.textField ? (
      <Button color="primary" id="updateButton" onClick={this.handleChange}>
        Edit Event
      </Button>
    ) : (
      <Button color="danger" onClick={this.submitEvent}>
        Update Confirm
      </Button>
    );
    return (
      <Modal isOpen={this.state.show} size="lg">
        <ModalHeader toggle={this.handleClose}>Event Details</ModalHeader>
        <ModalBody>
          {element}
          <Modal isOpen={this.state.nestedModal} toggle={this.showNestedModal}>
            <ModalHeader toggle={this.closeAll}>Error</ModalHeader>
            <ModalBody>{this.state.innerText}</ModalBody>
          </Modal>
        </ModalBody>
        <ModalFooter>
          {buttons}{" "}
          <Button color="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalEvent;
