import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import axios from 'axios';
// import SupplierTable from './SupplierTable';

class Brand extends Component {
	render() {
		return (
			<div>
				<h1>Brands</h1>

				<div className="row">
                   <div className="col-sm-12">
                       <Link to={'/brand/add'} className="btn btn-primary btn-sm pull-right mb-2">
							Add New
						</Link>
                   </div>
                </div>
			</div>
		)
	}
}

export default Brand