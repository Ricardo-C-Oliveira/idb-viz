import React, { Component } from 'react';
import logo from './logoBID_white.png';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { Menu, Image, Grid, Segment, Card, Header } from 'semantic-ui-react'
import Map from './components/map/Map';
import BarChartCustom from './components/graphs/BarChart';
import DonutChartCustom from './components/graphs/DonutChart';

const industry = require('../public/industry.json');
const occupation = require('../public/occupation.json');
const economicallyActiveMen = require('../public/economically_active_men.json');
const economicallyActiveWomen = require('../public/economically_active_women.json');


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedCountry: 'Select a Country',
            industryDataFiltered: null,
            occupationDataFiltered: null
        }
        this.selectCountry = this.selectCountry.bind(this)
    }

    selectCountry(country) {
        let countryDataIndustry = []
        let countryDataOccupation = []
        let countryDataEconomicallyActiveMen = []
        let countryDataEconomicallyActiveWomen = []

        Object.entries(industry[country]).forEach((obj) => {
            countryDataIndustry.push({'var': obj[0], 'value': obj[1]})
        })

        Object.entries(occupation[country]).forEach((obj) => {
            countryDataOccupation.push({'var': obj[0], 'value': obj[1]})
        })

        Object.entries(economicallyActiveMen[country]).forEach((obj) => {
            countryDataEconomicallyActiveMen.push({'var': obj[0], 'value': obj[1]})
        })

        Object.entries(economicallyActiveWomen[country]).forEach((obj) => {
            countryDataEconomicallyActiveWomen.push({'var': obj[0], 'value': obj[1]})
        })

        this.setState({
            selectedCountry: country,
            industryDataFiltered: countryDataIndustry,
            occupationDataFiltered: countryDataOccupation,
            economicallyActiveMenDataFiltered: countryDataEconomicallyActiveMen,
            economicallyActiveWomenDataFiltered: countryDataEconomicallyActiveWomen
        })
    }



  render() {

    return (<div>
        <Menu borderless inverted>
            <Menu.Item header className="lettering"> Youth Employment in Latin America</Menu.Item>
            <Menu.Item position="right"><Image size="tiny" src={logo}/></Menu.Item>
        </Menu>
            <Grid columns={2} divided>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Map selectCountryFunc={this.selectCountry}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid.Column className="country-name">
                            <p className="country-name">{this.state.selectedCountry}</p>
                        </Grid.Column>
                        <Grid columns={2} divided style={{marginRight: 0}}>
                            <Grid.Column>
                                <BarChartCustom name="Industry" data={this.state.industryDataFiltered}/>
                            </Grid.Column>
                            <Grid.Column>
                                <BarChartCustom name="Occupation" data={this.state.occupationDataFiltered} style={{marginRight: 20}}/>
                            </Grid.Column>
                        </Grid>
                        <br />
                        <Grid columns={1} divided style={{marginRight: 0}}>
                            <Grid.Column>
                            <DonutChartCustom name="Economically Active" data1={this.state.economicallyActiveMenDataFiltered} data2={this.state.economicallyActiveWomenDataFiltered}/>
                                </Grid.Column>
                            </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
  }
}

export default App;
