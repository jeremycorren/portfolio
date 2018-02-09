import React from 'react';

export const Filler = () => (
	<div>
		<hr />
		<div style={{color: 'grey'}}>
			There are no securities in your portfolio.
		</div>
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