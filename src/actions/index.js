import fetch from 'isomorphic-fetch'
import {ACTIONS, API_KEY, BBOX} from '../config/consts.js'

import axios from 'axios';

const loadStations = () => {
	return {
		type: ACTIONS.LOAD_STATIONS,
		loading: true
	}
}

const loadStationsError = (error) => {
	return {
		type: ACTIONS.LOAD_STATIONS_ERROR,
		loading: false,
		error
	}
}

const setStations = (stations) => {
	return {
		type: ACTIONS.SET_STATIONS,
		loading: false,
		stations
	}
}

export const fetchStations = () => {
	return dispatch => {
		dispatch(loadStations())
		return axios
			.get(`./stations.json`)
			.then(response => 
				dispatch(
					setStations(response.data)
				)
			)
			.catch(error=> dispatch(loadStationsError(error)))
	}
}