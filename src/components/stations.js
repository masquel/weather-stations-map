import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {Grid,Row,Col} from 'react-bootstrap';


import 'reset-css/reset.css';
import 'normalize.css';
import 'leaflet/dist/leaflet.css';
import './map.styl';

import {fetchStations,setActiveDay,toggleHeatMap} from '../actions/';



import Filter from './filter';
import StationsMap from './stationsMap';

class Stations extends Component {
	constructor(props){
		super(props);
		this.onSetActiveDay = this.onSetActiveDay.bind(this);
	}
	componentDidMount(){
		this.props.dispatch(fetchStations(/*this.props.filter.activeDay*/));
	}
	onSetActiveDay(e,day,props){
		if(props.disabled) return;
		if(props.selected){
			this.props.dispatch(setActiveDay(null));
		}else{
			this.props.dispatch(setActiveDay(day));
		}	
	}
	render(){
		const {
			dispatch,
			stationsStore,
			filter
		} = this.props;
		const {
			stations,
			loading
		} = stationsStore;
		return (
			<Grid fluid>
				<Row>
					<Col md={3}>
						<div className="h3 text-center">MOE APP: WEATHER STATIONS</div>
						{/*<Filter 
							showHeatMap={filter.heatmap}
							onToggleHeatMap={()=>{dispatch(toggleHeatMap())}}
							activeDay={filter.activeDay}
							onSelectDay={this.onSetActiveDay}
							onSubmitFilter={()=>{dispatch(fetchStations(filter.activeDay))}}
							loading={loading}
						/>*/}
					</Col>
					<Col md={9}>
						<StationsMap stations={stations} />
					</Col>
				</Row>
			</Grid>
		)
	}
}

export default connect(s=>s)(Stations);