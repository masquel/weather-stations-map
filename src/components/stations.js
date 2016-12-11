import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {Grid,Row,Col} from 'react-bootstrap';

import 'reset-css/reset.css';
import 'normalize.css';
import 'leaflet/dist/leaflet.css';
import './map.styl';

import {fetchStations,fetchStation,setActiveMonth,toggleHeatMap} from '../actions/';


import ActiveStation from './activeStation';
import Filter from './filter';
import StationsMap from './stationsMap';

class Stations extends Component {
	constructor(props){
		super(props);
		this.onSetActiveMonth = this.onSetActiveMonth.bind(this);
	}
	componentDidMount(){
		this.props.dispatch(fetchStations(/*this.props.filter.activeDay*/));
	}
	onSetActiveMonth(date){
		const {dispatch, activeStation, filter} = this.props;
		if(filter.activeMonth.month === date.month && filter.activeMonth.year === date.year) return;
		dispatch(setActiveMonth(date));
		activeStation.station.id && dispatch(fetchStation(activeStation.station.id,activeStation.station.name,date));
	}
	render(){
		const {
			dispatch,
			stationsStore,
			filter,
			activeStation
		} = this.props;
		const {
			stations
		} = stationsStore;
		return (
			<Grid fluid>
				<Row>
					<Col md={6} lg={4}>
						<div className="h3 text-center">MOE APP: WEATHER STATIONS</div>
						<Filter
							showHeatMap={filter.heatmap}
							onToggleHeatMap={()=>{dispatch(toggleHeatMap())}}
							activeMonth={filter.activeMonth}
							onSelectMonth={this.onSetActiveMonth}
						/>
						{
							stationsStore.loading && (<p className="text-center lead">Загрузка станций...</p>)
						}
						{
							stations.length ? (
								activeStation.station ?
								(
									<ActiveStation
										{...activeStation}
									/>
								) : null
							) : null
						}

					</Col>
					<Col md={6} lg={8}>
						<StationsMap
							stations={stations}
							onStationClick={(id, name)=>{dispatch(fetchStation(id, name, filter.activeMonth))}}
						/>
					</Col>
				</Row>
			</Grid>
		)
	}
}

export default connect(s=>s)(Stations);
