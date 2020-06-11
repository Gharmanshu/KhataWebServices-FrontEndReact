import React, { Component } from "react";
import FailedClass from "./FailedClass";
import {
  Container,
  Button,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Collapse,
} from "reactstrap";

class SingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      eventState: this.props.event,
    };

    let emptyEvent = {};
    this.toggleit = this.toggleit.bind(this);
  }

  toggleit() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    const businessEvent = JSON.parse(this.props.event.businessEventString);

    this.emptyEvent = {
      ...this.props.event,
      businessEvent,
    };

    this.emptyEvent.businessEventString = undefined;
    this.emptyEvent.accountingEvent = undefined;

    let eventShown = JSON.stringify(this.emptyEvent, null, 2);

    var list = this.props.event.failureMessage.split("|");
    const failedList = list.map((element) => (
      <p style={{ color: "red" }}>{element}</p>
    ));

    return (
      <React.Fragment>
        <tr onClick={this.toggleit}>
          <td>{businessEvent.sourceDetails.sourceId}</td>
          <td>{businessEvent.eventDetails.eventType}</td>
          <td>{businessEvent.additionalDetails.marketplace}</td>
          <td>{this.props.event.failureStatus}</td>
          <td>{this.props.event.amount}</td>
        </tr>

        {this.state.toggle && (
          <tr>
            <td
              colSpan="3"
              style={{ backgroundColor: "white", color: "black" }}
            >
              <pre>{eventShown}</pre>
            </td>
            <td colSpan="2" style={{ textAlign: "center" }}>
              <FailedClass
                key={this.props.event.idempotenceId}
                failedField={failedList}
                eventToUpdate={this.props.event}
              />
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  }
}

export default SingleEvent;
