import {ACTIONS} from '../config/consts';

export const stationsLoad = (state = {loading: true, stations: []}, {type,loading,stations,loadingCity,city}) => {
	switch(type){
		case ACTIONS.LOAD_STATIONS: {
			return {
				...state,
				loading
			}
		}
		case ACTIONS.SET_STATIONS:{
			return {
				...state,
				loading,
				stations
			}
		}
		case ACTIONS.LOAD_CITY_INFO: {
			return {
				...state,
				loadingCity
			}
		}
		case ACTIONS.NO_CITY_INFO:{
			return {
				...state,
				loadingCity
			}
		}
		case ACTIONS.SET_CITY_INFO: {
			const {city_img,city_population,city_link} = city.data;
			return {
				...state,
				stations: state.stations.map(
					station => (
						station.stat_num.value == city.id ? 
						{
							...station,
							city_img: city_img,
							city_population: city_population,
							city_link: city_link
						} 
						: station
					)
				),
				loadingCity
			}
		}
		default:
			return state

	}
}

export const stationDataLoad = (state = {station:{},loading:false}, {type,loading,station}) => {
	switch(type){
		case ACTIONS.LOAD_STATION: {
			return {
				loading,
				station
			}
		}
		case ACTIONS.SET_STATION: {
			return {
				station,
				loading
			}
		}
		default: 
			return state

	}
}
