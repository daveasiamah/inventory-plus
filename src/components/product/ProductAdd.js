import React, { Component } from "react";
import "../layouts/styles/Product.css";
import axios from "axios";
import Spinner from "../layouts/Spinner";
import ProductForm from "./ProductForm";

class ProductAdd extends Component {
  state = {
    loading: false
  };

  postProduct = async product => {
    this.setState({ loading: true });

    const data = new FormData();
    data.append("sku", product.sku);
    data.append("product_name", product.product_name);
    data.append("brand", product.brand);
    data.append("product_category", product.product_category);
    data.append("description", product.description);
    data.append("supplier", product.supplier);
    data.append("barcode", product.barcode);
    data.append("dimension_length", product.dimension_length);
    data.append("dimension_width", product.dimension_width);
    data.append("dimension_height", product.dimension_height);
    data.append("color", product.color);
    data.append("specs_category", product.specs_category);
    data.append("material_tags", product.material_tags);
    data.append("fitting_type", product.fitting_type);
    data.append("fitting_qty", product.fitting_qty);
    data.append("weight_kg", product.weight_kg);
    data.append("packing_length", product.packing_length);
    data.append("packing_width", product.packing_width);
    data.append("packing_height", product.packing_height);
    data.append("cost", product.cost);
    data.append("srp", product.srp);
    data.append("delivery_fee", product.delivery_fee);
    data.append("stock_overwrite", product.stock_overwrite);
    data.append("customization_fee", product.customization_fee);
    data.append("stock_alarm", product.stock_alarm);
    data.append("sales_price", product.sales_price);
    data.append("product_image", product.product_image);
    
    let res = await axios.post(
      `http://inventory.test/api/admin/product`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    
    this.setState({ loading: false });
  };

  render() {
    if (this.state.loading) {
      // loader
      return <Spinner />;
    } else {
      return (
        <div>
          <ProductForm postProduct={this.postProduct} />
        </div>
      );
    }
  }
}

export default ProductAdd;
