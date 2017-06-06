import React, { Component } from "react";
import { PieChart, Pie, Tooltip, Label, Cell, Text } from "recharts";
import { Grid, Card } from "semantic-ui-react";
import Dimensions from "react-dimensions";

const data01 = [
  {
    name: "Group A",
    value: 400
  },
  {
    name: "Group B",
    value: 300
  }
];

const data02 = [
  {
    name: "Group A",
    value: 2400
  },
  {
    name: "Group B",
    value: 4567
  }
];

const menColors = ["#175B2E", "#00F09C"];
const womenColors = ["#7A111B", "#FE48FF"];

class DonutChartCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.valueFormatter = this.valueFormatter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // separate data
    let data01Filtered = [];
    let totalEconPop1;
    nextProps.data1.filter(el => {
      if (el.var !== "Economically Active Population") {
        return data01Filtered.push(el);
      } else {
        return (totalEconPop1 = el.value);
      }
    });

    let data02Filtered = [];
    let totalEconPop2;
    nextProps.data2.filter(el => {
      if (el.var !== "Economically Active Population") {
        return data02Filtered.push(el);
      } else {
        return (totalEconPop2 = el.value);
      }
    });

    this.setState({
      data1: data01Filtered,
      totalEconPop1val: Number(totalEconPop1).toLocaleString(),
      data2: data02Filtered,
      totalEconPop2val: Number(totalEconPop2).toLocaleString()
    });
  }

  valueFormatter(value) {
    return value.toLocaleString();
  }

  render() {
    return (
      <div>
        <Card fluid height={this.props.containerHeight + 20}>
          <Card.Content header={this.props.name} className="card-header" />
          <Card.Content className="card-body">
            {this.props.data1 !== undefined
              ? <Grid columns={2}>
                  <Grid.Row
                    style={{
                      padding: 0
                    }}
                  >
                    <Grid.Column>
                      <PieChart
                        height={this.props.containerHeight - 88}
                        width={this.props.containerWidth / 2}
                      >
                        <Pie
                          data={this.state.data2}
                          outerRadius="80%"
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="var"
                          innerRadius="50%"
                        >
                          {data02.map((entry, index) =>
                            <Cell
                              key={`slice-${index}`}
                              fill={womenColors[index % 10]}
                            />
                          )}
                          <Label width="50%" position="center" stroke="#ADB9CA">
                            {this.state.totalEconPop2val}
                            Total
                          </Label>
                        </Pie>
                        <Tooltip formatter={this.valueFormatter} />
                      </PieChart>
                      <svg width={this.props.containerWidth / 2} height="15">
                        <Text
                          x={this.props.containerWidth / 4}
                          width={this.props.containerWidth / 2}
                          verticalAnchor="start"
                          textAnchor="middle"
                          stroke="#ADB9CA"
                        >
                          Women
                        </Text>
                      </svg>
                    </Grid.Column>

                    <Grid.Column>
                      <PieChart
                        height={this.props.containerHeight - 88}
                        width={this.props.containerWidth / 2}
                      >
                        <Pie
                          data={this.state.data1}
                          outerRadius="80%"
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="var"
                          innerRadius="50%"
                        >
                          {data01.map((entry, index) =>
                            <Cell
                              key={`slice-${index}`}
                              fill={menColors[index % 10]}
                            />
                          )}
                          <Label width="50%" position="center" stroke="#ADB9CA">
                            {this.state.totalEconPop1val}
                            Total
                          </Label>
                        </Pie>
                        <Tooltip formatter={this.valueFormatter} />

                      </PieChart>
                      <svg width={this.props.containerWidth / 2} height="15">
                        <Text
                          x={this.props.containerWidth / 4}
                          width={this.props.containerWidth / 2}
                          verticalAnchor="start"
                          textAnchor="middle"
                          stroke="#ADB9CA"
                        >
                          Men
                        </Text>
                      </svg>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
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
// })(DonutChartCustom)

export default Dimensions()(DonutChartCustom); // Enhanced component
