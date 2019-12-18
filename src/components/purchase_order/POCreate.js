import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import Select from "react-select";
import "../layouts/styles/iziToast.css";
import iziToast from "izitoast";
import axios from "axios";

class POCreate extends Component {
	state = {
		isSearchable: true,
		errors: null,
		redirect: false,
		loading: false
	};
	
	handleInput = (e) => {
		
	}

	onFormSubmit = (e) => {
		//
	}

	render() {
		if (this.state.loading) {
			// loading
			return <Spinner />;
		} else if (this.state.redirect) {
			// redirect
			return <Redirect to="/po" />;
		} else {
			return (
				<div>
					<h2 className="mb-2">Create Purchase Order</h2>
					<div>
						{this.state.errors && (
							<div
								className="alert alert-danger alert-dismissible fade show"
								role="alert"
							>
								{this.state.errors.map((error, i) => (
									<li key={i}>{error}</li>
								))}
								<button
									type="button"
									className="close"
									data-dismiss="alert"
									aria-label="Close"
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
						)}
					</div>

					<from
						id="createPO"
						encType="multipart/form-data"
						onKeyPress={e => {
							if (e.key === "Enter") e.preventDefault();
						}}
						onSubmit={e => this.onFormSubmit(e)}
					></from>
				</div>
			);
		}
	}
}

export default POCreate;
