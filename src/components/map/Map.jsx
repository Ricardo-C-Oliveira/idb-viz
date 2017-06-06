import React, { Component } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import Dimensions from "react-dimensions";
import { Dropdown } from "semantic-ui-react";
import { Legend } from "recharts";
import colorbrewer from "colorbrewer";

import "./Map.css";
import "semantic-ui-css/semantic.min.css";

const topoData = require("../../data/latam_topojson.json");

const objectKey = Object.keys(topoData.objects)[0];
const geoData = topojson.feature(topoData, topoData.objects[objectKey]);

d3.selection.prototype.moveToFront = function() {
  return this.each(function() {
    this.parentNode.appendChild(this);
  });
};

let skipCountries = [
  "Suriname",
  "Cuba",
  "United States of America",
  "France",
  "United Kingdom",
  "Guyana"
];

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverVisible: false,
      currentVarValue: "tot_pop",
      currentVarText: "Total Population",
      maxVar: 0,
      minVar: 0,
      selectedCountry: ""
    };
    this.changeVar = this.changeVar.bind(this);
    this.renderPopover = this.renderPopover.bind(this);
    this.movePopover = this.movePopover.bind(this);
    this.destroyPopover = this.destroyPopover.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
  }

  changeVar(e, data) {
    this.setState({
      currentVarValue: data.value,
      currentVarText: data.options.filter(option => {
        return option.value === data.value;
      })[0].text
    });

    this.setState({
      maxVar: d3.max(geoData.features, function(d) {
        return Number(d.properties[data.value]);
      })
    });

    this.setState({
      minVar: d3.min(geoData.features, function(d) {
        return Number(d.properties[data.value]);
      })
    });
  }

  componentWillMount() {
    const state = this.state;
    this.setState({
      maxVar: d3.max(geoData.features, function(d) {
        return Number(d.properties[state.currentVarValue]);
      })
    });

    this.setState({
      minVar: d3.min(geoData.features, function(d) {
        return Number(d.properties[state.currentVarValue]);
      })
    });
  }

  renderPopover(e, text) {
    d3.select(e.target).moveToFront();

    if (text[1] !== null) {
      this.setState({
        popoverX: e.pageX,
        popoverY: e.pageY - 130,
        popoverVisible: true,
        popoverCountry: text[0],
        popoverValue: Number(text[1]) === null
          ? "No Data"
          : Number(text[1]).toLocaleString()
      });
    }
  }

  movePopover(e) {
    this.setState({
      popoverX: e.pageX,
      popoverY: e.pageY - 130
    });
  }

  destroyPopover() {
    this.setState({
      popoverVisible: false,
      popoverCountry: "",
      popoverValue: ""
    });
  }

  selectCountry(e, country) {
    if (skipCountries.includes(country) === false) {
      this.props.selectCountryFunc(country);

      this.setState({
        selectedCountry: country
      });
    }
  }

  render() {
    const width = this.props.containerWidth;
    const height = this.props.containerHeight;

    const projection = d3
      .geoOrthographic()
      .scale(0.9)
      .translate([0, 0])
      .rotate([70, 30]);

    const path = d3.geoPath().projection(projection);

    const bounds = path.bounds(geoData);
    const scale =
      0.95 /
      Math.max(
        (bounds[1][0] - bounds[0][0]) / width,
        (bounds[1][1] - bounds[0][1]) / height
      );
    const translate = [
      (width - scale * (bounds[1][0] + bounds[0][0])) / 2,
      (height - scale * (bounds[1][1] + bounds[0][1])) / 2
    ];

    projection.scale(scale).translate(translate);

    const mainColorramp = colorbrewer["RdPu"][7];

    const quantize = d3
      .scaleQuantize()
      .domain([this.state.minVar, this.state.maxVar])
      .range(
        d3.range(7).map(function(i) {
          return mainColorramp[i];
        })
      );

    const dropdownStyle = {
      zIndex: 999,
      float: "right",
      top: 40,
      right: 20,
      backgroundColor: "#53657D",
      color: "#CACACA"
    };

    const stateOptions = [
      { key: "tot_pop", value: "tot_pop", text: "Total Population" },
      { key: "unemployed", value: "unemployed", text: "Unemployed" },
      { key: "employed", value: "employed", text: "Employed" }
    ];

    const dom = quantize.domain();
    const l = (dom[1] - dom[0]) / quantize.range().length;
    const breaks = d3.range(0, quantize.range().length - 1).map(function(i) {
      return Math.round(i * l);
    });
    breaks.push(dom[1]);

    const legendData = [];
    breaks.map((val, idx) => {
      let obj = {
        key: val.toString(),
        value: val.toLocaleString(),
        color: mainColorramp[idx],
        type: "square",
        className: "q7-9"
      };
      return legendData.unshift(obj);
    });

    const legendStyle = {
      marginLeft: "7%",
      marginBottom: 10,
      left: 0,
      backgroundColor: "aliceblue",
      color: "#374355",
      padding: 3,
      borderRadius: 3
    };

    return (
      <div>
        <Dropdown
          placeholder="Pick a var"
          selection
          style={dropdownStyle}
          options={stateOptions}
          onChange={this.changeVar}
          value={this.state.currentVarValue}
        />
        <svg
          height={this.props.containerHeight}
          width={this.props.containerWidth}
          className="map-container"
        >
          <g>
            <path
              d={path(d3.geoGraticule10())}
              style={{
                fill: "none",
                stroke: "#777",
                strokeWidth: 0.5,
                strokeOpacity: 0.5
              }}
            />
          </g>
          <g>
            {geoData.features.map(feature => {
              return (
                <path
                  key={feature.properties.id}
                  id={feature.properties.id}
                  d={path(feature)}
                  className={
                    feature.properties[this.state.currentVarValue] === null
                      ? "null-val"
                      : ""
                  }
                  style={{
                    fill: feature.properties[this.state.currentVarValue] ===
                      null
                      ? "rgb(192, 201, 193)"
                      : quantize(
                          feature.properties[this.state.currentVarValue]
                        ),
                    stroke: feature.properties.sovereignt ===
                      this.state.popoverCountry ||
                      feature.properties.sovereignt ===
                        this.state.selectedCountry
                      ? "#0081D5"
                      : "#374355",
                    strokeWidth: feature.properties.sovereignt ===
                      this.state.popoverCountry ||
                      feature.properties.sovereignt ===
                        this.state.selectedCountry
                      ? "3px"
                      : "1px"
                  }}
                  onMouseEnter={e =>
                    this.renderPopover(e, [
                      feature.properties.sovereignt,
                      feature.properties[this.state.currentVarValue]
                    ])}
                  onMouseMove={this.movePopover}
                  onMouseLeave={this.destroyPopover}
                  onClick={e =>
                    this.selectCountry(e, feature.properties.sovereignt)}
                />
              );
            })}
          </g>
        </svg>
        {this.state.popoverVisible &&
          <div
            className="map-tooltip"
            style={{
              position: "absolute"
            }}
          >
            <h3>{this.state.currentVarText}</h3>
            {this.state.popoverCountry}:
            {" "}
            {this.state.popoverValue === null
              ? "No Data"
              : this.state.popoverValue}
          </div>}
        <Legend
          payload={legendData}
          layout="vertical"
          wrapperStyle={legendStyle}
        />
      </div>
    );
  }
}

export default Dimensions({
  containerStyle: {
    height: "calc(100vh - 115px)",
    width: "100%"
  }
})(Map);
