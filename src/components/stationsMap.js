import React, { Component, PropTypes } from 'react';
import {Map,Marker,Popup,TileLayer,CircleMarker,FeatureGroup} from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import {mapConfig} from '../config/consts';

export default class stationsMap extends Component {
	constructor(props){
		super(props);
	}
	render() {
		const {stations,onStationClick} = this.props;
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
					stations.map(({location_name,lat,long,altitude,stat_num}, index)=>{
						return (
							<FeatureGroup key={index}>
								<Popup>
									<div className="popup__info">
										<div className="popup__item">
											<div className="popup__item-key">ID:</div>
											<div className="popup__item-value">{stat_num.value}</div>
										</div>
										<dl className="popup__item">
											<dt className="popup__item-key">Название:</dt>{' '}
											<dd className="popup__item-value">{location_name.value}</dd>
										</dl>
										<dl className="popup__item">
											<div className="popup__item-key">Lat:</div>
											<div className="popup__item-value">{lat.value}</div>
										</dl>
										<dl className="popup__item">
											<div className="popup__item-key">Long:</div>
											<div className="popup__item-value">{long.value}</div>
										</dl>
										<dl className="popup__item">
											<dt className="popup__item-key">Высота над уровнем моря:</dt>{' '}
											<dd className="popup__item-value">{altitude.value}</dd>
										</dl>
										
										<dl className="popup__item">
											<div className="popup__item-key"></div>
											<div className="popup__item-value"></div>
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
									onClick={()=>onStationClick(stat_num.value,location_name.value)}
								/>
							</FeatureGroup>
						)
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