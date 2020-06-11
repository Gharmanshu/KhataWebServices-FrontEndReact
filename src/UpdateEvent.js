import React, { Component } from "react";
import AppNav from "./AppNav";
import { Table, Collapse } from "reactstrap";
import {
  Card,
  CardTitle,
  Row,
  Col,
  CardSubtitle,
  CardBody,
  Button,
  Container,
} from "reactstrap";
import SingleEvent from "./SingleEvent";
import FilterEvent from "./FilterEvent";
import ModalEvent from "./ModalEvent";
class UpdateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BusinessEvents: [],
      toggle: false,
      title: "Show all failed Events",
      totalAmount: "0",
      totalFailedEvent: "0",
    };

    this.toggleEventList = this.toggleEventList.bind(this);
  }

  toggleEventList() {
    if (this.state.title == "Show all failed Events") {
      this.setState({ toggle: !this.state.toggle, title: "Back to Dashboard" });
    } else {
      this.setState({
        toggle: !this.state.toggle,
        title: "Show all failed Events",
      });
    }
  }

  async componentDidMount() {
    const response = await fetch("/api/events");
    const body = await response.json();
    this.setState({ BusinessEvents: body });
  }

  render() {
    const { BusinessEvents, totalAmount, totalFailedEvent } = this.state;

    const heading = (
      <tr>
        <th>Source</th>
        <th>Event type</th>
        <th>Marketplace</th>
        <th>Failure Status</th>
        <th>Amount</th>
      </tr>
    );
    return (
      <div>
        <AppNav />
        <br />
        <Container>
          <Table hover bordered>
            <FilterEvent />
          </Table>
        </Container>
      </div>
    );
  }
}

export default UpdateEvent;
