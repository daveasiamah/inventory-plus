import React, { Component } from 'react'
import spinner from './spinner.gif';

class Spinner extends Component{
	render() {
		return (
			<div>
				<img src={spinner} alt="spinner..." style={spinnerStyle}/>
			</div>
		)
	}
}

const spinnerStyle = {
	paddingTop: '100px',
	paddingBottom: '500px',
	width: '100px',
	margin: 'auto',
	display: 'block'
}

export default Spinner