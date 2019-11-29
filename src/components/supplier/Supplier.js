import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import axios from 'axios';
import SupplierTable from './SupplierTable';

class Supplier extends Component {
		
	state = {
		suppliers: [],
		loading: false,
	}

	componentDidMount() {
		this.getSuppliers();
	}
		
	// fetch all suppliers
    getSuppliers = async () => {
        this.setState({ loading: true });
        let res = await axios.get(`http://inventory.test/api/admin/supplier`);

        console.log(res.data);
        this.setState({ suppliers: res.data.suppliers });
        this.setState({ loading: false });
    };
    
    // update archives: 1 if deleted
    moveToArchives = async id => {
        let res = await axios.put(
            `http://inventory.test/api/admin/supplier/archives/${id}`);
        // fetch the new updated data
        this.getSuppliers();
    };

	render() {
		return (
			<div>
				<h1>Supplier</h1>

				<div className="row">
                   <div className="col-sm-12">
                       <Link to={'/supplier/add'} className="btn btn-primary btn-sm pull-right mb-2">
							Add New
						</Link>
                   </div>
                </div>

				<section className="row">
                    <div className="col-sm-12">
                        {this.state.loading ? (
                            <Spinner />
                        ) : this.state.suppliers.length > 0 ? (
                            <SupplierTable
                                suppliers={this.state.suppliers}
                                moveToArchives={this.moveToArchives}
                            />
                        ) : (
                            <h1 align="center" className="mt-5">Sorry there's no data...</h1>
                        )}
                    </div>
            	</section>
			</div>
		)
	}
}

export default Supplier