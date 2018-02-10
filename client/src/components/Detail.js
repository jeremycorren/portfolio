import React from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { getDetail } from '../reducers/index';

let Detail = ({ detail }) => {
	if (detail != null) {
		return (
			<div>
				<h4>Detail</h4>
				<ul>
					<li>{detail.marketCap}</li>
					<li>{detail.peRatio}</li>
				</ul>
			</div>
		);
	} else {
		return null;
	}
};

const mapStateToProps = (state) => ({
	detail: getDetail(state)
});

Detail = connect(
	mapStateToProps,
	actions
)(Detail)

export default Detail;