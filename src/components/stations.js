import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';

import {fetchStations} from '../actions/';

class Stations extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.dispatch(fetchStations());
	}
	render(){
		const {
			dispatch,
			stationsStore
		} = this.props;
		const {
			stations,
			loading
		} = stationsStore;
		return (
			<div>
				{
					stations &&	stations.length ? (
						stations.map((station, index)=>(
							<div className="station">
								<div className="station__name">{station.name}</div>
								<div className="station__coordinates">{station.latitude} - {station.longitude}</div>
							</div>
						))
					) : (
						<div>Станций нет</div>
					)
				}
			</div>
		)
	}
}

export default connect(s=>s)(Stations);