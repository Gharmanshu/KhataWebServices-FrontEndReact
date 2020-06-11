import React, { Component } from "react";

class FailedClass extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const RenderedList = this.props.failedField.map((field) => <p>{field}</p>);

    return (
      <React.Fragment>
        <h4>Failed Fields</h4>
        {RenderedList}
      </React.Fragment>
    );
  }
}

export default FailedClass;
