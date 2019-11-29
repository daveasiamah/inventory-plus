import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SupplierForm from './SupplierForm';
import Spinner from "../layouts/Spinner";
import axios from 'axios';

class SupplierAdd extends Component {
	
	state = {
		loading: false,
		redirect: false,
	}

	supplierPost = async (supplier) => {
		this.setState({ loading: true });

		let postData = {
			name: supplier.name,
			business_name: supplier.business_name,
			address: supplier.address,
			landline: supplier.landline,
			fax: supplier.fax,
			email: supplier.email,
			mobile: supplier.mobile,
			contact_person: supplier.contact_person,
		}
	
		let res = await axios.post(`http://inventory.test/api/admin/supplier`, postData)
				.catch(err => console.log(err));
				
		this.setState({ loading: false, redirect: true });
	}

	render() {
		if(this.state.loading){
			return <Spinner />
		}else if (this.state.redirect){
			return <Redirect to='/supplier' />
		}else{
			return (
				<div>
					<h1>Add Supplier</h1>

					<SupplierForm supplierPost={this.supplierPost}/>
				</div>
			)
		}
	}
}

export default SupplierAdd