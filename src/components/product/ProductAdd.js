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
        sku: product.sku,
        product_name: product.product_name,
        brand: product.brand,
        product_category: product.product_category,
        description: product.description,
        supplier: product.supplier,
        barcode: product.barcode,
        dimension_length: product.dimension_length,
        dimension_width: product.dimension_width,
        dimension_height: product.dimension_height,
        color: product.color,
        specs_category: product.specs_category,
        material_tags: product.material_tags,
        fitting_type: product.fitting_type,
        fitting_qty: product.fitting_qty,
        weight_kg: product.weight_kg,
        packing_length: product.packing_length,
        packing_width: product.packing_width,
        packing_height: product.packing_height,
        cost: product.cost,
        srp: product.srp,
        delivery_fee: product.delivery_fee,
        stock_overwrite: product.stock_overwrite,
        customization_fee: product.customization_fee,
        stock_alarm: product.stock_alarm,
        sales_price: product.sales_price,
        product_image: product.product_image,
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
