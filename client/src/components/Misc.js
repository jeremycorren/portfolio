import React from 'react';

export const Filler = ({ message, color }) => (
	<div>
		<hr />
		<p style={{color: color}}>
			{message}
		</p>
	</div>
);

export const TableHeader = () => (
	<thead>
		<tr>
			<th scope='col'></th>
			<th scope='col'>Symbol</th>
			<th scope='col'>Price</th>
			<th scope='col'>Change %</th>
		</tr>
	</thead>
);