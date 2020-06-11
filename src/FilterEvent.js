import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Container, Row, Col } from "reactstrap";
import ModalEvent from "./ModalEvent";
import paginationFactory from "react-bootstrap-table2-paginator";
class FilterEvent extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        dataField: "sourceId",
        text: "Source",
        filter: textFilter(),
      },
      {
        dataField: "eventType",
        text: "Event",
        filter: textFilter(),
      },
      {
        dataField: "marketplace",
        text: "Marketplace",
        filter: textFilter(),
      },
      {
        dataField: "failureStatus",
        text: "Failure Status",
        filter: textFilter(),
      },
      {
        dataField: "currency",
        text: "Currency Code",
      },
      {
        dataField: "value",
        text: "Amount",
      },
    ];
    this.state = {
      BusinessEventList: [],
      eventList: [],
      id: true,
      pieDataCount: {},
      pieDataAmount: {},
    };
    this.reloadTheComponent = this.reloadTheComponent.bind(this);
    this.makePiedata = this.makePiedata.bind(this);
  }

  modalRef = ({ handleShow }) => {
    this.showModal = handleShow;
  };

  rowEvents = {
    onClick: (e, row, rowIndex) => {
      const singleEvent = this.state.BusinessEventList[rowIndex];
      this.showModal(singleEvent);
    },
  };

  customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  options = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: this.customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  reloadTheComponent() {
    this.setState({ id: !this.state.id });
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
      "#ff0000",
      "#9966ff",
      "#00ffcc",
      "#66ff33",
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
      let sourceId = businessEvent.sourceDetails.sourceId;
      let eventType = businessEvent.eventDetails.eventType;
      let marketplace = businessEvent.additionalDetails.marketplace;
      let currency = businessEvent.amountDetails.currency;
      let value = businessEvent.amountDetails.value;
      let failureStatus = element.failureStatus;
      let emptyRow = {
        sourceId,
        eventType,
        marketplace,
        failureStatus,
        currency,
        value,
      };
      emptyEvent.push(emptyRow);
    });
    console.log(emptyEvent);
    this.setState({ eventList: emptyEvent, BusinessEventList: body });
    this.makePiedata();
  }

  render() {
    const { businessEventList } = this.state;
    return (
      <Container>
        <BootstrapTable
          striped
          hover
          bordered
          condensed
          keyField="id"
          data={this.state.eventList}
          reload={this.reloadTheComponent}
          columns={this.columns}
          filter={filterFactory()}
          rowEvents={this.rowEvents}
          pagination={paginationFactory()}
        />
        <ModalEvent ref={this.modalRef}></ModalEvent>
      </Container>
    );
  }
}

export default FilterEvent;
