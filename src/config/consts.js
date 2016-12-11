export const API_URL = "http://saturn.alexzer.ru/meteo";

export const ACTIONS = {
	"LOAD_STATIONS": "LOAD_STATIONS",
	"LOAD_STATIONS_ERROR": "LOAD_STATIONS_ERROR",
	"SET_STATIONS": "SET_STATIONS",
	"SET_ACTIVE_DAY": "SET_ACTIVE_DAY",
	"SET_ACTIVE_MONTH": "SET_ACTIVE_MONTH",
	"LOAD_STATION": "LOAD_STATION",
	"SET_STATION": "SET_STATION",
	"TOGGLE_HEATMAP": "TOGGLE_HEATMAP",
	"SET_FILTER_STATION_NAME":"SET_FILTER_STATION_NAME"
};


export const mapConfig = {
	center: [64.035690, 98.789344],
	zoomControl: false,
	zoom: 3,
	maxZoom: 20,
	minZoom: 3,
	scrollwheel: false,
	legends: true,
	infoControl: false,
	attributionControl: true
};