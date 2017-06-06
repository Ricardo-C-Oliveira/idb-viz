import React, { Component } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Card } from "semantic-ui-react";
import Dimensions from "react-dimensions";

class BarChartCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.valueFormatter = this.valueFormatter.bind(this);
  }

  valueFormatter(value) {
    return value.toLocaleString();
  }

  render() {
    return (
      <div>
        <Card fluid height={this.props.containerHeight}>
          <Card.Content header={this.props.name} className="card-header" />
          <Card.Content className="card-body">
            {this.props.data !== null
              ? <BarChart
                  height={this.props.containerHeight - 58}
                  width={this.props.containerWidth - 20}
                  data={this.props.data}
                  layout="vertical"
                  margin={{ top: 0, right: 20, left: 40, bottom: 0 }}
                >
                  <XAxis
                    type="number"
                    stroke="#ADB9CA"
                    tickFormatter={this.valueFormatter}
                  />
                  <YAxis
                    dataKey="var"
                    type="category"
                    stroke="#ADB9CA"
                    interval={0}
                  />
                  <Tooltip formatter={this.valueFormatter} />
                  <Bar dataKey="value" fill="#0081D5" cx="15" cy="15" />
                </BarChart>
              : <div
                  style={{
                    minHeight: this.props.containerHeight - 88,
                    textAlign: "center",
                    fontSize: "large",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  Select a country
                </div>}
          </Card.Content>
        </Card>
      </div>
    );
  }
}

// export default Dimensions({
//     containerStyle: {
//         height: 'calc(50vh)',
//         width: 'calc(100%)'
//     }
// })(BarChartCustom)

export default Dimensions()(BarChartCustom); // Enhanced component
