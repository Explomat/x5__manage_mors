import React from 'react';
//import ArrowRight from 'react-icons/io/arrow-right-a';
import { Link } from 'react-router-dom';
import './region.styl';

const Region = ({ id, url, title, mor, subMor }) => {
	return (
		<div className='region'>
			<Link to={{
				pathname: `/regions/${id}`,
				state: {
					url
				}
			}}
			>
				<div className='region__title'>{title}</div>
				{mor && <div>{mor.name}</div>} -> {subMor && <div>{subMor.name}</div>}
			</Link>
		</div>
	);
};

export default Region;
