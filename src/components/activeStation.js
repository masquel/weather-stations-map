import React, { Component } from 'react';

import './station_table.styl';

export default class ActiveStation extends Component {
	render() {
		console.log(this.props);
		const {loading,station} = this.props;
		return (
			<div>
				{
					
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
														<th><strong>Мин. t</strong></th>
														<th><strong>Макс. t</strong></th>
														<th><strong>Ср. t</strong></th>
													</tr>
												</thead>
												<tbody>
													{
														station.data.map(({date,tmin,tmax,tmean},index)=>(
															<tr key={index}>
																<td>{date.value}</td>
																<td>{tmin.value}</td>
																<td>{tmax.value}</td>
																<td>{tmean.value}</td>
															</tr>
														))
													}
												</tbody>
											</table>
										</div>
									) : (
										<p className="text-center lead">Данных о станции нет.</p>
									)
								}
							</div>
						) : (
							<p className="lead text-center">Выберите метеостанцию на карте для отображения информации</p>
						)
				}
			</div>
			
		);
	}
}
