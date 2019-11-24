import React, { Component } from "react";
import "../layouts/styles/Product.css";
import axios from "axios";
import Spinner from "../layouts/Spinner";
import ProductForm from './ProductForm';

class ProductAdd extends Component {
  
  state = {
      loading: false
  }

  postProduct = async product => {

    this.setState({loading: true});

    let res = await axios.post(`http://inventory.test/api/admin/product`, {
      product
    });

    console.log(res.data);

    this.setState({loading: false});
  };

  render() {
      if(this.state.loading){
          // loader
          return <Spinner />
      }else{
          return (
            <div>
                <ProductForm postProduct={this.postProduct}/>
            </div>
          ) 
      }
  }
}


export default ProductAdd;
