import React, { Component } from 'react';
import moment from 'moment';
/*import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';*/
import Picker from 'react-month-picker';
import 'react-month-picker/css/month-picker.css';
import {Button,FormControl,ControlLabel,FormGroup,InputGroup,Glyphicon} from 'react-bootstrap';
/*import Switch from 'react-ios-switch';
import 'react-ios-switch/build/bundle.css';*/
import './filter.styl';

let pickerLang = {
	months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'], 
	from: 'От',
	to: 'До'
}

let makeText = m => {
	if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year);
	return '?';
}

export default class Filter extends Component {
	render() {
		const {
			onSelectMonth,
			activeMonth,
			loading
		} = this.props;
		return (
			<div>
				<Picker
					ref="monthPicker"
					value={activeMonth}
					years={70}
					lang={pickerLang.months}
					onDismiss={onSelectMonth}
				>
					<FormGroup>
						<ControlLabel><strong>Выберите дату:</strong></ControlLabel>
						<InputGroup>
							<div className="form-control" onClick={()=>this.refs.monthPicker.show()}>
								<span>{makeText(activeMonth)}</span>
							</div>	
							<InputGroup.Addon>
								<Glyphicon glyph="calendar"></Glyphicon>
							</InputGroup.Addon>
						</InputGroup>
					</FormGroup>
					
				</Picker>
			</div>
		);
	}
}
