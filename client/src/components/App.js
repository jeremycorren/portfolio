import React from 'react';
import AddStock from './AddStock';
import Portfolio from './Portfolio';
import Detail from './Detail';

const App = () => (
  <div className='container mt-5'>
    <AddStock />
    <div className='row'>
			<div className='col-6'>
				<Portfolio />
			</div>
			<div className='col-6'>
				<Detail />
			</div>
		</div>
  </div>
);

export default App;
