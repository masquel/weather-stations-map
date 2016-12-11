import fetch from 'isomorphic-fetch'
import {ACTIONS, API_URL, BBOX} from '../config/consts.js'

import axios from 'axios';

const queryConfig = {headers:{"Accept":"application/sparql-results+json"}};

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
	const query = `PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0A%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0A%0APREFIX+dbr%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%0A%0APREFIX+dbo%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0A%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0A%0APREFIX+geo%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2003%2F01%2Fgeo%2Fwgs84_pos%23%3E%0A%0APREFIX+mt%3A+%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2F%3E%0A%0APREFIX+mto%3A+%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2Fontology%2F%3E%0A%0APREFIX+mtr%3A+%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2Fresource%2F%3E%0A%0ASELECT+%3Fstation+%3Flabel+%3Fstat_num+%3Flocation_name+%3Flat+%3Flong+%3Faltitude%0A%0AWHERE+%0A%0A%7B+%0A%0A%3Fstation+a+mto%3Aw_st+%3B%0A%0Ardfs%3Alabel+%3Flabel%3B%0A%0Amto%3Ast_num+%3Fstat_num+%3B%0A%0Ageo%3Alat+%3Flat%3B%0A%0Ageo%3Along+%3Flong%3B%0A%0Adbo%3Alocation+%3Flocation%3B%0A%0Amto%3Ast_alt+%3Faltitude.%0A%0A%3Flocation+a+mto%3Aw_st_loc%3B%0A%0Ardfs%3Alabel+%3Flocation_name.%0A%0A%7D`;
	return dispatch => {
		dispatch(loadStations())
		return axios
			.get(`${API_URL}/?query=${query}`,queryConfig)
			.then(response =>{
				console.log(response.data);
				dispatch(
					setStations(response.data.results.bindings)
				)
			})
			.catch(error=> dispatch(loadStationsError(error)))
	}
}


const loadStation = () => {
	return {
		type: ACTIONS.LOAD_STATION,
		loading: true
	}
}

const loadStationError = (error) => {
	return {
		type: ACTIONS.LOAD_STATIONS_ERROR,
		loading: false,
		error
	}
}

const setStation = (station) => {
	return {
		type: ACTIONS.SET_STATION,
		loading: false,
		station
	}
}

export const fetchStation = (id,name) => {
	const query = `PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX+dbr%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%0APREFIX+dbo%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0APREFIX+geo%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2003%2F01%2Fgeo%2Fwgs84_pos%23%3E%0APREFIX+mt%3A+%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2F%3E%0APREFIX+mto%3A+%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2Fontology%2F%3E%0APREFIX+mtr%3A+%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2Fresource%2F%3E%0ASELECT+%3Fmeasure+%3Fdate+%3Fstat_num+%3Fprecipitation+%3Fcr_flag+%3Fqr_flag+%3Ftflag+%3Ftmax+%3Fqtmax_flag+%3Ftmean+%3Fqtmean_flag+%3Ftmin+%3Fqtmin%0AWHERE+%0A%7B+%0A%3Fmeasure+a+mto%3Aw_measure%3B%0Amto%3Adatem+%3Fdate%3B%0Amto%3Ast_measure+%3Fstation%3B%0Amto%3Aprecip+%3Fprecipitation%3B%0Amto%3Acr+%3Fcr_flag%3B%0Amto%3Aqr+%3Fqr_flag%3B%0Amto%3Atflag+%3Ftflag%3B%0Amto%3Atmax+%3Ftmax%3B%0Amto%3Aqtmax+%3Fqtmax_flag%3B%0Amto%3Atmean+%3Ftmean%3B%0Amto%3Aqtmean+%3Fqtmean_flag%3B%0Amto%3Atmin+%3Ftmin%3B%0Amto%3Aqtmin+%3Fqtmin_flag.%0A%3Fstation+a+mto%3Aw_st+%3B%0Amto%3Ast_num+${id}.+%0A%0A%7D%0AORDER+BY+DESC(%3Fdate)%0ALIMIT+30`;
	return dispatch => {
		dispatch(loadStation())
		return axios
			.get(`${API_URL}/?query=${query}`,queryConfig)
			.then(response =>{
				console.log(response.data);
				dispatch(
					setStation({name, data: response.data.results.bindings})
				)
			})
			.catch(error=> dispatch(loadStationError(error)))
	}
}

export const setActiveDay = (day) => {
	return {
		type: ACTIONS.SET_ACTIVE_DAY,
		day
	}
}

export const toggleHeatMap = () => {
	return {
		type: ACTIONS.TOGGLE_HEATMAP
	}
}
