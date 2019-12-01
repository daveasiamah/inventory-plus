import React, { Component, Fragment } from 'react';

export class SupplierSearch extends Component {
	state = {
		search: ''
	}

	handleKeyUp = (e) => {
		this.setState({ search: this.ref.value})
	}
	
	render() {
		return (
			<Fragment>
				<input 
					name="search" 
					type="text"
					className="form-control w-50"
					placeholder="Search here..."
					onKeyUp={this.handleKeyUp}
					ref={ref => (this.ref = ref)}
				/>
			</Fragment>
		)
	}
}

export default SupplierSearch;