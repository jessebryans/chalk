import React from 'react';

export default React.createClass({
	render() {
		return (
			<footer className="mainFooter">
				<h3>HackerYou</h3>
				<ul>
					<li><i className="chalk-github"></i><a href='http://github.com/hackeryou'>github.com/hackeryou</a></li>
					<li><i className='chalk-link'></i><a href='http://hackeryou.com'>hackeryou.com</a></li>
					<li><i className='chalk-email'></i><a href='mailto:info@hackeryou.com'>info@hackeryou.com</a></li>
					<li><i className='chalk-twitter'></i><a href='http://twitter.com/hackeryou'>@hackeryou</a></li>
				</ul>
				<p>Copyright 2015 HackerYou</p>
				<p>The contents of this site are the property of HackerYou. No portion of this site is to be shared without permission.</p>
			</footer>
		)
	}
});