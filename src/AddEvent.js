import React, { Component } from "react";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Row,
  Button,
} from "reactstrap";
import AppNav from "./AppNav";

class AddEvent extends Component {
  emptySourceDetails = {
    sourceId: "",
  };

  emptyEventDetails = {
    eventId: "",
    parentId: "",
    eventType: "",
    marketplaceId: "",
  };

  emptyAmountDetails = {
    currency: "",
    value: "",
    localCurrency: "",
    localValue: "",
  };

  emptyBillingEntityDetails = {
    billingEntityId: "",
  };

  emptyAdditionalDetails = {
    channel: "",
    marketplace: "",
    programId: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      sourceDetails: {},
      eventDetails: {},
      amountDetails: {},
      billingEntityDetails: {},
      additionalDetails: {},
      alertMessageRequest: false,
    };
    this.changingSourceDetails = this.changingSourceDetails.bind(this);
    this.changingEventDetails = this.changingEventDetails.bind(this);
    this.changingBillingDetails = this.changingBillingDetails.bind(this);
    this.changingAmountDetails = this.changingAmountDetails.bind(this);
    this.changingAdditionalDetails = this.changingAdditionalDetails.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.makeAlertMessage = this.makeAlertMessage.bind(this);
  }

  makeAlertMessage() {
    if (this.state.alertMessageRequest == true) {
      alert("The input is wrong");
    } else {
      alert("Event Added Successfully!!");
    }
    window.location.reload(false);
  }

  changingSourceDetails(event) {
    const target = event.target;
    const value = target.value;
    const convertToObject = JSON.parse(value);
    this.setState({ sourceDetails: convertToObject });
  }

  changingAdditionalDetails(event) {
    const target = event.target;
    const value = target.value;
    const convertToObject = JSON.parse(value);
    this.setState({ additionalDetails: convertToObject });
  }

  changingAmountDetails(event) {
    const target = event.target;
    const value = target.value;
    const convertToObject = JSON.parse(value);
    this.setState({ amountDetails: convertToObject });
  }

  changingBillingDetails(event) {
    const target = event.target;
    const value = target.value;
    const convertToObject = JSON.parse(value);
    this.setState({ billingEntityDetails: convertToObject });
  }

  changingEventDetails(event) {
    const target = event.target;
    const value = target.value;
    const convertToObject = JSON.parse(value);
    this.setState({ eventDetails: convertToObject });
  }

  async handleSubmit(event) {
    let errorHandle = false;
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const {
      sourceDetails,
      additionalDetails,
      billingEntityDetails,
      eventDetails,
      amountDetails,
    } = this.state;
    const pushedEvent = {
      sourceDetails,
      additionalDetails,
      billingEntityDetails,
      eventDetails,
      amountDetails,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pushedEvent),
    };
    fetch("/api/events", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          errorHandle = true;
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        this.setState({ alertMessageRequest: true });
      });
    window.location.reload(false);
  }

  render() {
    const heightMaker = {
      height: "180px",
    };
    const sourceIdString = JSON.stringify(this.emptySourceDetails, null, 2);
    const eventDetailString = JSON.stringify(this.emptyEventDetails, null, 2);
    const amountDetailString = JSON.stringify(this.emptyAmountDetails, null, 2);
    const billingString = JSON.stringify(
      this.emptyBillingEntityDetails,
      null,
      2
    );
    const additionalString = JSON.stringify(
      this.emptyAdditionalDetails,
      null,
      2
    );
    return (
      <div>
        <AppNav />
        <br />
        <Container>
          <Row>
            <Col>
              <Label>
                <h4>Enter Source Details</h4>
              </Label>
              <Input
                style={heightMaker}
                type="textarea"
                name="sourceId"
                id="sourceId"
                onChange={this.changingSourceDetails}
                defaultValue={sourceIdString}
              />
            </Col>
            <Col>
              <Label>
                <h4>Enter Additional Details</h4>
              </Label>
              <Input
                style={heightMaker}
                type="textarea"
                name="additional"
                id="additional"
                onChange={this.changingAdditionalDetails}
                defaultValue={additionalString}
              />
            </Col>
            <Col>
              <Label>
                <h4>Enter Billing Details</h4>
              </Label>
              <Input
                style={heightMaker}
                type="textarea"
                name="billing"
                id="billing"
                onChange={this.changingBillingDetails}
                defaultValue={billingString}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Label>
                <h4>Enter Event Details</h4>
              </Label>
              <Input
                style={heightMaker}
                type="textarea"
                name="eventDetails"
                id="eventDetails"
                onChange={this.changingEventDetails}
                defaultValue={eventDetailString}
              />
            </Col>

            <Col>
              <Label>
                <h4>Enter Amount Details</h4>
              </Label>
              <Input
                style={heightMaker}
                type="textarea"
                name="amountDetails"
                id="amountDetails"
                onChange={this.changingAmountDetails}
                defaultValue={amountDetailString}
              />
            </Col>
          </Row>
          <br />
          <div style={{ textAlign: "center" }}>
            <Button color="dark" onClick={this.handleSubmit}>
              Add Event
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default AddEvent;
