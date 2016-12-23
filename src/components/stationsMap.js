import React, { Component, PropTypes } from 'react';
import {Map,Marker,Popup,TileLayer,CircleMarker,FeatureGroup} from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import moment from 'moment';
import {mapConfig} from '../config/consts';
import {levenshtein} from '../helpers/';

export default class stationsMap extends Component {
	constructor(props){
		super(props);
	}
	render() {
		const {stations,onStationClick, filter} = this.props;
		return (
			<Map
				center={mapConfig.center}
				zoom={mapConfig.zoom}
			>
				{
					/*showHeatMap && (
						<HeatmapLayer
							points={stations}
							longitudeExtractor={m => m.long.value}
							latitudeExtractor={m => m.lat.value}
							intensityExtractor={m => parseFloat(m.atitude.value)}
						/>
					)*/
				}

				<TileLayer
					//attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
				/>
				{
					stations.length &&
					stations.map(({location_name,lat,long,altitude,stat_num,datemax}, index)=>{
						const stationNameLowerCase = location_name.value.toLowerCase();
						const filterStationNameLowerCase = filter.stationName.toLowerCase();
						return (stationNameLowerCase.indexOf(filterStationNameLowerCase) !== -1) || (levenshtein(stationNameLowerCase,filterStationNameLowerCase) < 3) ? (
							<FeatureGroup key={index}>
								<Popup>
									<div className="popup__info">
										<div className="popup__item">
											<div className="popup__item-key">ID:</div>{' '}
											<div className="popup__item-value">{stat_num.value}</div>
										</div>
										<dl className="popup__item">
											<dt className="popup__item-key">Название:</dt>{' '}
											<dd className="popup__item-value">{location_name.value}</dd>
										</dl>
										<dl className="popup__item">
											<div className="popup__item-key">Широта:</div>{' '}
											<div className="popup__item-value">{lat.value}</div>
										</dl>
										<dl className="popup__item">
											<div className="popup__item-key">Долгота:</div>{' '}
											<div className="popup__item-value">{long.value}</div>
										</dl>
										<dl className="popup__item">
											<dt className="popup__item-key">Высота над уровнем моря:</dt>{' '}
											<dd className="popup__item-value">{altitude && altitude.value}</dd>
										</dl>
										<dl className="popup__item">
											<div className="popup__item-key">Последние измерения:</div>{' '}
											<div className="popup__item-value">{datemax ? datemax.value : "отсутствуют"}</div>
										</dl>
									</div>
								</Popup>
								<CircleMarker
									color={"#3498db"}
									wieght={2}
									opacity={0.8}
									center={[
										parseFloat(lat.value),
										parseFloat(long.value)
									]}
									radius={5}
									onClick={
										()=>{
											let lastMeasurementDate = filter.activeMonth;
											if(datemax){
												const stationLastMeasurement = moment(datemax.value, 'YYYY-MM-DD');
												lastMeasurementDate = {
													year: stationLastMeasurement.year(),
													month: stationLastMeasurement.month()
												}
											}
											onStationClick(stat_num.value,location_name.value,lastMeasurementDate)
										}
									}
								/>
							</FeatureGroup>
						) : null
					})
				}
			</Map>
		)
	}
}

stationsMap.defaultProps = {
	stations: []
}

stationsMap.propTypes = {
	stations: PropTypes.array.isRequired
}
