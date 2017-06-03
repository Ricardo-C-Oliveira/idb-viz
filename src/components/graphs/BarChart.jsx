import React, { Component } from 'react';
import { Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Menu, Image, Grid, Segment, Card, Header } from 'semantic-ui-react'
import Dimensions from 'react-dimensions';

class BarChartCustom extends Component{

    render() {
        return (<div>
        <Card fluid height={this.props.containerHeight}>
            <Card.Content header={this.props.name} className="card-header"/>
            <Card.Content className="card-body">
                {this.props.data !== null ?
                    <BarChart height={this.props.containerHeight - 58} width={this.props.containerWidth - 20} data={this.props.data} layout="vertical"  margin={{top: 0, right: 20, left: 40, bottom: 0}}>
                        <XAxis type="number" stroke="#ADB9CA"/>
                        <YAxis dataKey="var" type="category" stroke="#ADB9CA" interval={0}/>
                        <Tooltip/>
                        <Bar dataKey="value" fill="#0081D5" cx="15" cy="15"/>
                    </BarChart>
                    : <div style={{minHeight: this.props.containerHeight - 58}}>Select a country</div>
                }
            </Card.Content>
        </Card>
            </div>)
    }
}

// export default Dimensions({
//     containerStyle: {
//         height: 'calc(50vh)',
//         width: 'calc(100%)'
//     }
// })(BarChartCustom)

export default Dimensions()(BarChartCustom) // Enhanced component
