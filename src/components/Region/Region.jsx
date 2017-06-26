import React from 'react';
//import ArrowRight from 'react-icons/io/arrow-right-a';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import './region.styl';

const Region = ({ id, url, title, mor, subMor }) => {
	const morClasses = cx({
		'icon-user': true,
		'region__mor-name': true,
		'region__mor-name--is-sub-mor': subMor
	});
	return (
		<div className='region'>

			<Link to={{
				pathname: `/regions/${id}`,
				state: {
					url
				}
			}} className='region__href'
			>
				<div className='region__title'>{title}</div>
				<div className='region__mors'>
					{mor && <span className={morClasses}>{mor.name}</span>}
					{subMor && <span className='region__icon' />}
					{subMor &&
						<span className='region__sub-mor-info'>
							<span className='icon-user region__sub-mor-name'>{subMor.name}</span>
							<span className='region__sub-mor-alternate-date'>{subMor.alternate_date}</span>
						</span>
					}
				</div>
				<span className='region__icon-go icon-right-open-big'/>
			</Link>
		</div>
	);
};

export default Region;
