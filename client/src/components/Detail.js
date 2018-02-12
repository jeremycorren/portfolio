import React, { Component } from 'react';
import DetailStats from './DetailStats';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { getDetail } from '../reducers/index';
import { Line } from 'react-chartjs-2';

class Detail extends Component {
	render() {
		const { detail, clearDetail } = this.props;

		if (detail != null) {
			const { chart } = detail;
			const chartData = {
				labels: chart.map(dataPoint => formatDate(dataPoint.date)),
				datasets: [{
					label: ['Share Price'],
					backgroundColor: 'rgba(75,192,192,0.4)',
      		borderColor: 'rgba(75,192,192,1)',
		      pointBorderColor: 'rgba(75,192,192,1)',
		      pointBackgroundColor: '#fff',
		      pointBorderWidth: 1,
		      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
		      pointHoverBorderColor: 'rgba(220,220,220,1)',
		      pointHoverBorderWidth: 2,
					data: chart.map(dataPoint => dataPoint.price)
				}]
			};

			return (
				<div className='card'>
					<div className='card-body'>
						<h4 className='card-title'>
							<a 
								href={detail.website} 
								className='card-link'
								style={{display: 'inline-block'}}
							>
								{detail.companyName}
							</a>
							<button
								className='btn btn-secondary btn-sm'
								style={{
									padding: '.10rem',
		    					fontSize: '.575rem',
		    					lineHeight: '.5',
		    					borderRadius: '.2rem',
		    					float: 'right'
								}}
								onClick={clearDetail}
							>
								<span
									title='Clear'
									className='oi oi-minus' 
									aria-hidden='true'></span>
							</button>
						</h4>
						<h6 className='subtitle mb-2 text-muted'>{detail.industry}</h6>
						<DetailStats detail={detail} />
						<Line data={chartData} />
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state) => ({
	detail: getDetail(state)
});

Detail = connect(
	mapStateToProps,
	actions
)(Detail)

export default Detail;

const formatDate = (date) => {
	return new Date(date).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric'
	});
};