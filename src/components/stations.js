import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {Grid,Row,Col} from 'react-bootstrap';

import 'reset-css/reset.css';
import 'normalize.css';
import 'leaflet/dist/leaflet.css';
import './map.styl';

import {fetchStations,fetchStation,setActiveMonth,toggleHeatMap,setFilterStationName,fetchCityInfo} from '../actions/';

import moment from 'moment';

import ActiveStation from './activeStation';
import Filter from './filter';
import StationsMap from './stationsMap';

class Stations extends Component {
	constructor(props){
		super(props);
		this.onSetActiveMonth = this.onSetActiveMonth.bind(this);
		this.onSetStationName = this.onSetStationName.bind(this);
		this.onStationClick = this.onStationClick.bind(this);
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
	onStationClick(id, name, datemax){
		const {dispatch, filter} = this.props;
		dispatch(fetchCityInfo(id,name));

		let lastMeasurementDate = filter.activeMonth;
		if(datemax){
			const stationLastMeasurement = moment(datemax.value, 'YYYY-MM-DD');
			lastMeasurementDate = {
				year: stationLastMeasurement.year(),
				month: stationLastMeasurement.month()+1
			}
		}
		
		dispatch(fetchStation(id, name, lastMeasurementDate));

	}
	onSetStationName(e){
		this.props.dispatch(setFilterStationName(e.target.value));
	}
	render(){
		const {
			dispatch,
			stationsStore,
			filter,
			activeStation,
		} = this.props;
		const {
			stations,
			loadingCity
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
							stationName={filter.stationName}
							onSelectMonth={this.onSetActiveMonth}
							onStationNameEnter={this.onSetStationName}
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
							filter={filter}
							onStationClick={this.onStationClick}
							loadingCity={loadingCity}
						/>
					</Col>
				</Row>
			</Grid>
		)
	}
}

export default connect(s=>s)(Stations);
