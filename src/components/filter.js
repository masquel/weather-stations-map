import React, { Component } from 'react';
import DayPicker, {DateUtils} from 'react-day-picker';
import {Button} from 'react-bootstrap';
import 'react-day-picker/lib/style.css';
import 'react-ios-switch/build/bundle.css';
import Switch from 'react-ios-switch';
import './filter.styl';

export default class Filter extends Component {
	render() {
		const {onSelectDay,activeDay,onToggleHeatMap,showHeatMap,onSubmitFilter, loading} = this.props;
		return (
			<div>
				<DayPicker
					disabledDays={DateUtils.isFutureDay}
					selectedDays={day=>DateUtils.isSameDay(activeDay,day)}
					onDayClick={onSelectDay}
				/>
				<div className="text-center switch__wrapper">
					<label>
						<span className="switch__text">Тепловая карта</span>
						<Switch className="switch__toggler" checked={showHeatMap} onChange={onToggleHeatMap}/>
					</label>
				</div>
				<div className="text-center">
					<Button bsStyle="primary" onClick={onSubmitFilter} disabled={loading}>
						{
							loading ? "Загрузка данных..." : "Подгрузить данные"
						}
					</Button>
				</div>
			</div>
		);
	}
}
