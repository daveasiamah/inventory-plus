import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SupplierForm from './SupplierForm';
import Spinner from "../layouts/Spinner";
import axios from 'axios';

class SupplierAdd extends Component {
	
	state = {
		loading: false,
		redirect: false,
		errors: null,
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
					switch(res.data.status){
						case 0:
							this.setState({ errors: res.data.errors })
							break;

						case 1:
							this.setState({ loading: false, redirect: true });
							break;

						default:
							break;
					}
		
		this.setState({ loading: false });

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

					<SupplierForm supplierPost={this.supplierPost} errors={this.state.errors}/>
				</div>
			)
		}
	}
}

export default SupplierAdd