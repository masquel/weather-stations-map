import fetch from 'isomorphic-fetch'
import {ACTIONS, API_URL, BBOX} from '../config/consts.js'

import axios from 'axios';
import moment from 'moment';

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
	/*
		PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX dbr: <http://dbpedia.org/resource/>
		PREFIX dbo: <http://dbpedia.org/ontology/>
		PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
		PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
		PREFIX mt: <http://example.org/meteo_ru_data/>
		PREFIX mto: <http://example.org/meteo_ru_data/ontology/>
		PREFIX mtr: <http://example.org/meteo_ru_data/resource/>
		SELECT ?station ?label ?stat_num ?location_name ?lat ?long ?altitude
		WHERE
		{
			?station a mto:w_st ;
			rdfs:label ?label;
			mto:st_num ?stat_num ;
			geo:lat ?lat;
			geo:long ?long;
			dbo:location ?location;
			mto:st_alt ?altitude.
			?location a mto:w_st_loc;
			rdfs:label ?location_name.
		}
	*/
	const query = `PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0A%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0A%0APREFIX+dbr%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%0A%0APREFIX+dbo%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0A%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0A%0APREFIX+geo%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2003%2F01%2Fgeo%2Fwgs84_pos%23%3E%0A%0APREFIX+mt%3A+%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2F%3E%0A%0APREFIX+mto%3A+%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2Fontology%2F%3E%0A%0APREFIX+mtr%3A+%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2Fresource%2F%3E%0A%0APREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E+%0A%0APREFIX+ispra%3A+%3Chttp%3A%2F%2Fdati.isprambiente.it%2Fontology%2Fcore%23%3E+%0A%0APREFIX+dcterms%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E+%0A%0A%0ASELECT+%3Fstation+%3Flabel+%3Fstat_num+%3Fdatemax+%3Flocation_name+%3Flat+%3Flong+%3Faltitude%0AWHERE+%0A%7B+%0A%3Fstation+a+ispra%3AMeasureStation+%3B%0Ardfs%3Alabel+%3Flabel%3B%0Adcterms%3Aidentifier+%3Fstat_num+%3B%0Aschema%3Alocation+%3Flocation.%0A%3Flocation+a+schema%3APlace%3B%0Ardfs%3Alabel+%3Flocation_name%3B%0Aschema%3Ageo+%5B%0Aa+schema%3AGeoCoordinates+%3B%0Aschema%3Alatitude+%3Flat+%3B%0Aschema%3Alongitude+%3Flong+%3B%0Ageo%3Aalt+%3Faltitude+%3B%0A%0A%5D+.%0AOPTIONAL%0A%7B%0A%7B%0ASELECT+%3Fstat_num+(MAX(%3Fdate)+AS+%3Fdatemax)+%0AWHERE+%7B%0A%0A%3Fstation+dcterms%3Aidentifier+%3Fstat_num.+%0A%3Fmeasure+a+mto%3Aw_measure%3B%0Amto%3Adatem+%3Fdate%3B%0Amto%3Ast_measure+%3Fstation.%0A%7D+%0AGROUP+BY+(%3Fstat_num)%0A%7D%0A%7D%0A%0A%7D`;
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


const loadStation = (id,name) => {
	return {
		type: ACTIONS.LOAD_STATION,
		loading: true,
		station: {
			id,
			name
		}
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

export const fetchStation = (id,name,{year, month}) => {
	/*
		PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX dbr: <http://dbpedia.org/resource/>
		PREFIX dbo: <http://dbpedia.org/ontology/>
		PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
		PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
		PREFIX mt: <http://example.org/meteo_ru_data/>
		PREFIX mto: <http://example.org/meteo_ru_data/ontology/>
		PREFIX mtr: <http://example.org/meteo_ru_data/resource/>
		PREFIX schema: <http://schema.org/>
		PREFIX ispra: <http://dati.isprambiente.it/ontology/core#>
		PREFIX dcterms: <http://purl.org/dc/terms/>
		SELECT ?measure ?date ?stat_num ?precipitation ?cr_flag ?qr_flag ?tflag ?tmax ?qtmax_flag ?tmean ?qtmean_flag ?tmin ?qtmin
		WHERE
		{
			?measure a mto:w_measure;
			mto:datem ?date;
			mto:st_measure ?station;
			mto:precip ?precipitation;
			mto:cr ?cr_flag;
			mto:qr ?qr_flag;
			mto:tflag ?tflag;
			mto:tmax ?tmax;
			mto:qtmax ?qtmax_flag;
			mto:tmean ?tmean;
			mto:qtmean ?qtmean_flag;
			mto:tmin ?tmin;
			mto:qtmin ?qtmin_flag.
			?station a ispra:MeasureStation;
			dcterms:identifier 21908.
			BIND(year(xsd:date(?date)) as ?date_year).
			BIND(month(xsd:date(?date)) as ?date_month).
			FILTER (?date_year=2015 && ?date_month=2)
		}
		ORDER BY DESC(?date)
		LIMIT 31
	*/
	console.log(year,month);
	//const query = `PREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20dbr%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%0APREFIX%20dbo%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0APREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0APREFIX%20geo%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2003%2F01%2Fgeo%2Fwgs84_pos%23%3E%0APREFIX%20mt%3A%20%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2F%3E%0APREFIX%20mto%3A%20%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2Fontology%2F%3E%0APREFIX%20mtr%3A%20%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2Fresource%2F%3E%0ASELECT%20%3Fmeasure%20%3Fdate%20%3Fstat_num%20%3Fprecipitation%20%3Fcr_flag%20%3Fqr_flag%20%3Ftflag%20%3Ftmax%20%3Fqtmax_flag%20%3Ftmean%20%3Fqtmean_flag%20%3Ftmin%20%3Fqtmin%0AWHERE%20%0A%7B%20%0A%3Fmeasure%20a%20mto%3Aw_measure%3B%0Amto%3Adatem%20%3Fdate%3B%0Amto%3Ast_measure%20%3Fstation%3B%0Amto%3Aprecip%20%3Fprecipitation%3B%0Amto%3Acr%20%3Fcr_flag%3B%0Amto%3Aqr%20%3Fqr_flag%3B%0Amto%3Atflag%20%3Ftflag%3B%0Amto%3Atmax%20%3Ftmax%3B%0Amto%3Aqtmax%20%3Fqtmax_flag%3B%0Amto%3Atmean%20%3Ftmean%3B%0Amto%3Aqtmean%20%3Fqtmean_flag%3B%0Amto%3Atmin%20%3Ftmin%3B%0Amto%3Aqtmin%20%3Fqtmin_flag.%0A%3Fstation%20a%20mto%3Aw_st%20%3B%0Amto%3Ast_num%20${id}.%0A%20%20BIND(year(xsd%3Adate(%3Fdate))%20as%20%3Fdate_year).%0A%20%20BIND(month(xsd%3Adate(%3Fdate))%20as%20%3Fdate_month).%0A%20%20FILTER%20(%3Fdate_year%3D${year}%20%26%26%20%3Fdate_month%3D${month})%0A%7D%0AORDER%20BY%20DESC(%3Fdate)%0ALIMIT%2031`;
	const query = `PREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0A%09%09PREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0A%09%09PREFIX%20dbr%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%0A%09%09PREFIX%20dbo%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0A%09%09PREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0A%09%09PREFIX%20geo%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2003%2F01%2Fgeo%2Fwgs84_pos%23%3E%0A%09%09PREFIX%20mt%3A%20%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2F%3E%0A%09%09PREFIX%20mto%3A%20%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2Fontology%2F%3E%0A%09%09PREFIX%20mtr%3A%20%3Chttp%3A%2F%2Fexample.org%2Fmeteo_ru_data%2Fresource%2F%3E%0A%09%09PREFIX%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%0A%09%09PREFIX%20ispra%3A%20%3Chttp%3A%2F%2Fdati.isprambiente.it%2Fontology%2Fcore%23%3E%0A%09%09PREFIX%20dcterms%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0A%09%09SELECT%20%3Fmeasure%20%3Fdate%20%3Fstat_num%20%3Fprecipitation%20%3Fcr_flag%20%3Fqr_flag%20%3Ftflag%20%3Ftmax%20%3Fqtmax_flag%20%3Ftmean%20%3Fqtmean_flag%20%3Ftmin%20%3Fqtmin%0A%09%09WHERE%0A%09%09%7B%0A%09%09%09%3Fmeasure%20a%20mto%3Aw_measure%3B%0A%09%09%09mto%3Adatem%20%3Fdate%3B%0A%09%09%09mto%3Ast_measure%20%3Fstation%3B%0A%09%09%09mto%3Aprecip%20%3Fprecipitation%3B%0A%09%09%09mto%3Acr%20%3Fcr_flag%3B%0A%09%09%09mto%3Aqr%20%3Fqr_flag%3B%0A%09%09%09mto%3Atflag%20%3Ftflag%3B%0A%09%09%09mto%3Atmax%20%3Ftmax%3B%0A%09%09%09mto%3Aqtmax%20%3Fqtmax_flag%3B%0A%09%09%09mto%3Atmean%20%3Ftmean%3B%0A%09%09%09mto%3Aqtmean%20%3Fqtmean_flag%3B%0A%09%09%09mto%3Atmin%20%3Ftmin%3B%0A%09%09%09mto%3Aqtmin%20%3Fqtmin_flag.%0A%09%09%09%3Fstation%20a%20ispra%3AMeasureStation%3B%0A%09%09%09dcterms%3Aidentifier%20${id}.%0A%09%09%09BIND(year(xsd%3Adate(%3Fdate))%20as%20%3Fdate_year).%0A%09%09%09BIND(month(xsd%3Adate(%3Fdate))%20as%20%3Fdate_month).%0A%09%09%09FILTER%20(%3Fdate_year%3D${year}%20%26%26%20%3Fdate_month%3D${month})%0A%09%09%7D%0A%09%09ORDER%20BY%20DESC(%3Fdate)%0A%09%09LIMIT%2031`;
	return dispatch => {
		dispatch(setActiveMonth({year: year, month: month}));
		dispatch(loadStation(id,name))
		return axios
			.get(`${API_URL}/?query=${query}`,queryConfig)
			.then(response =>{
				console.log(response.data);
				dispatch(setStation({id,name, data: response.data.results.bindings}))
			})
			.catch(error=> dispatch(loadStationError(error)))
	}
}

export const setActiveMonth = (month) => {
	return {
		type: ACTIONS.SET_ACTIVE_MONTH,
		month
	}
}

export const toggleHeatMap = () => {
	return {
		type: ACTIONS.TOGGLE_HEATMAP
	}
}

export const setFilterStationName = (name) => {
	return {
		type: ACTIONS.SET_FILTER_STATION_NAME,
		name
	}

}

const loadCityData = (id,city) => {
	return {
		type: ACTIONS.LOAD_CITY_INFO,
		loadingCity: true
	}
}

const removeLoadingCityDataState = () => {
	return {
		type: ACTIONS.NO_CITY_INFO,
		loadingCity: false
	}
}

const addCityInfo = (city) => {
	console.log(city);
	return {
		type: ACTIONS.SET_CITY_INFO,
		loadingCity: false,
		city
	}
}

export const fetchCityInfo = (id,name) => {
	// Федеративный запрос
	/*
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX foaf: <http://xmlns.com/foaf/0.1/>
		PREFIX dbo: <http://dbpedia.org/ontology/>
		PREFIX ps: <http://www.wikidata.org/prop/statement/>
		PREFIX owl: <http://www.w3.org/2002/07/owl#>
		PREFIX wd: <http://www.wikidata.org/entity/>
		PREFIX wdt: <http://www.wikidata.org/prop/direct/>
		SELECT (?ru_comm AS ?city_comment)  (?homepage AS ?city_link) (?thumbnail AS ?city_img) (?population AS ?city_population)
		WHERE {
			SERVICE <http://dbpedia.org/sparql> {
				?uri rdfs:label "Владивосток"@ru .
				OPTIONAL {
					?uri rdfs:comment ?ru_comm.
					FILTER (lang(?ru_comm) = 'ru')
				}
				OPTIONAL{
					?uri foaf:homepage ?homepage
				}
				OPTIONAL {
					?uri dbo:thumbnail ?thumbnail
				}
				?uri owl:sameAs ?uri_wikidata.
				FILTER(regex(str(?uri_wikidata), "http://www.wikidata.org/entity" ) )
			}
			OPTIONAL {
				SERVICE <https://query.wikidata.org/sparql> {
					?uri_wikidata wdt:P1082 ?population.
				}
			}
		}
	*/
	const query = `PREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX+foaf%3A+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0APREFIX+dbo%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0APREFIX+ps%3A+%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2Fstatement%2F%3E%0APREFIX+owl%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0APREFIX+wd%3A+%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F%3E%0APREFIX+wdt%3A+%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2Fdirect%2F%3E%0ASELECT+(%3Fru_comm+AS+%3Fcity_comment)++(%3Fhomepage+AS+%3Fcity_link)+(%3Fthumbnail+AS+%3Fcity_img)+(%3Fpopulation+AS+%3Fcity_population)%0AWHERE+%0A%7B%0ASERVICE+%3Chttp%3A%2F%2Fdbpedia.org%2Fsparql%3E%0A%7B%0A%3Furi+rdfs%3Alabel+%22${name}%22%40ru+.%0AOPTIONAL%0A%7B%0A%3Furi+rdfs%3Acomment+%3Fru_comm.%0AFILTER+(lang(%3Fru_comm)+%3D+'ru')%0A%7D%0AOPTIONAL%0A%7B%0A%3Furi+foaf%3Ahomepage+%3Fhomepage%0A%7D%0AOPTIONAL%0A%7B%0A%3Furi+dbo%3Athumbnail+%3Fthumbnail%0A%7D%0A%3Furi+owl%3AsameAs+%3Furi_wikidata.+%0AFILTER(regex(str(%3Furi_wikidata)%2C+%22http%3A%2F%2Fwww.wikidata.org%2Fentity%22+)+)%0A%7D%0AOPTIONAL%0A%7B%0ASERVICE+%3Chttps%3A%2F%2Fquery.wikidata.org%2Fsparql%3E%0A%7B%0A%3Furi_wikidata+wdt%3AP1082+%3Fpopulation.%0A%7D%0A%7D%0A%7D`;
	return dispatch => {
		dispatch(loadCityData(id,name));
		return axios
			.get(`${API_URL}/?query=${query}`,queryConfig)
			.then(response=>{
				const cityData = response.data.results.bindings[0];
				console.log(cityData);
				if(typeof cityData !== 'undefined'){
					dispatch(addCityInfo({id,name, data: cityData }));
				}else{
					dispatch(removeLoadingCityDataState());
				}
			})
	}
};
