import React, { Component } from 'react';

export default class ActiveStation extends Component {
	render() {
		console.log(this.props);
		const {loading,station} = this.props;
		return (
			<div>
				{
					loading ? (
						<p className="text-center lead">Загрузка данных о стнации...</p>
					) : (
						station && station.name ? (
							<div>
								<div className="h3 text-center">Выбранная станция: <strong>{station.name}</strong></div>
								{
									station.data.length ? (
										<table className="station__table table table-striped table-bordered table-hover table-responsive">
											<thead>
												<tr>
													<th>Дата</th>
													<th>Мин. t</th>
													<th>Макс. t</th>
													<th>Ср. t</th>
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
									) : (
										<p className="text-center lead">Данных о станции нет.</p>
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
