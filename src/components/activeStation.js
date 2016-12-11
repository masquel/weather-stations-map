import React, { Component } from 'react';

import './station_table.styl';

export default class ActiveStation extends Component {
	render() {
		console.log(this.props);
		const {loading,station} = this.props;
		return (
			<div>
				{
					loading ? (
						station && station.name ? (
							<div>
								<div className="h3 text-center">Выбранная станция: <strong>{station.name}</strong></div>
								<p className="text-center lead">Загрузка данных о станции...</p>
							</div>
						) : null
					) : (
						station && station.name ? (
							<div>
								<div className="h3 text-center">Выбранная станция: <strong>{station.name}</strong></div>
								{
									station.data.length ? (

										<div className="station-table">
											<table className="table table-striped table-bordered table-hover table-responsive">
												<thead>
													<tr>
														<th><strong>Дата</strong></th>
														<th><strong>t мин.</strong></th>
														<th><strong>t макс.</strong></th>
														<th><strong>t ср.</strong></th>
														<th><strong>Осадки</strong></th>
													</tr>
												</thead>
												<tbody>
													{
														station.data.map(({date,tmin,tmax,tmean,precipitation},index)=>(
															<tr key={index}>
																<td>{date.value}</td>
																<td>{tmin.value} <sup>o</sup>C</td>
																<td>{tmax.value} <sup>o</sup>C</td>
																<td>{tmean.value} <sup>o</sup>C</td>
																<td>{precipitation.value} мм</td>
															</tr>
														))
													}
												</tbody>
											</table>
										</div>
									) : (
										<p className="text-center lead">Данных о станции нет. Попробуйте выбрать другой месяц.</p>
									)
								}
							</div>
						) : (
							<p className="lead text-center">Выберите метеостанцию на карте для отображения информации</p>
						)
					)	
				}
			</div>
			
		);
	}
}
