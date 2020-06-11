import React, { Component } from "react";
import { Container, Row, Col, Button, Label } from "reactstrap";
import { Doughnut, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import AppNav from "./AppNav";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      pieDataCount: {},
      pieDataAmount: {},
    };
    this.makePiedata = this.makePiedata.bind(this);
  }

  makePiedata() {
    const { eventList } = this.state;
    let countMap = new Map();
    let amountMap = new Map();
    let totalFailed = 0;
    let totalAmount = 0;
    eventList.map((event) => {
      if (event.failureStatus == "true") {
        let marketplace = event.marketplace;
        let amount = event.value;
        totalAmount += amount;
        if (countMap.has(marketplace)) {
          countMap.set(marketplace, countMap.get(marketplace) + 1);
        } else {
          countMap.set(marketplace, 1);
        }
        if (amountMap.has(marketplace)) {
          amountMap.set(marketplace, amountMap.get(marketplace) + amount);
        } else {
          amountMap.set(marketplace, amount);
        }
      }
    });
    const colors = [
      "#000000",
      "#868686",
      "#C1C1C1",
      "#3D3D3D",
      "#cc9900",
      "#ff99ff",
    ];
    let marketplaceName = [];
    let countofMarketplace = [];
    let colorsForCount = [];
    let count = 0;
    console.log(amountMap);
    for (const [key, value] of countMap.entries()) {
      marketplaceName.push(key);
      countofMarketplace.push(value);
      colorsForCount.push(colors[count]);
      count++;
    }
    let amountofMarketplace = [];
    for (const [key, value] of amountMap.entries()) {
      amountofMarketplace.push(value);
    }
    console.log(amountofMarketplace);
    this.setState({
      pieDataCount: {
        labels: marketplaceName,
        datasets: [
          {
            label: "Failed Events",
            data: countofMarketplace,
            backgroundColor: colorsForCount,
          },
        ],
      },
    });

    this.setState({
      pieDataAmount: {
        labels: marketplaceName,
        datasets: [
          {
            label: "Amount in Markets",
            data: amountofMarketplace,
            backgroundColor: colorsForCount,
          },
        ],
      },
    });
  }

  async componentDidMount() {
    const response = await fetch("/api/events");
    const body = await response.json();
    let emptyEvent = [];
    body.map((element) => {
      let businessEvent = JSON.parse(element.businessEventString);
      let marketplace = businessEvent.additionalDetails.marketplace;
      let failureStatus = element.failureStatus;
      let value = businessEvent.amountDetails.value;
      let emptyRow = {
        marketplace,
        failureStatus,
        value,
      };
      emptyEvent.push(emptyRow);
    });
    this.setState({ eventList: emptyEvent });
    this.makePiedata();
  }

  render() {
    const changeHeight = {
      height: "350px",
      textAlign: "center",
    };
    const changeHeightBar = {
      height: "300px",
      textAligh: "center",
    };
    return (
      <div>
        <AppNav />
        <br />
        <Container>
          <div style={changeHeight}>
            <Label>
              <h4>Failure Events</h4>
            </Label>
            <Doughnut
              data={this.state.pieDataCount}
              options={{ maintainAspectRatio: false }}
            ></Doughnut>
          </div>
          <br />
          <br />
          <br />
          <div style={changeHeightBar}>
            <Label>
              <h4>Failure Events Amount</h4>
            </Label>
            <Bar
              data={this.state.pieDataAmount}
              options={{ maintainAspectRatio: false }}
            ></Bar>
          </div>
        </Container>
        <br />
        <br />
      </div>
    );
  }
}

export default Dashboard;
