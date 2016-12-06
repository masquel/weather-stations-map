export const API_KEY = "95ef9613886f1d03fd7bb2d69328f118";

export const ACTIONS = {
	"LOAD_STATIONS": "LOAD_STATIONS",
	"LOAD_STATIONS_ERROR": "LOAD_STATIONS_ERROR",
	"SET_STATIONS": "SET_STATIONS"
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

export const tileLayerConfig = {
	uri: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
	params: {
		minZoom: 3,
		accessToken: 'pk.eyJ1IjoibWFzcSIsImEiOiJjaXdkeThzNjcwMDVmMm9rZm42MHN3bDdtIn0.i3TgNuzFBR0QhqPDewtUQA'
	}
};