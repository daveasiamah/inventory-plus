import React, { Component } from 'react';
import '../styles/Product.css';
import axios from 'axios';

class ProductAdd extends Component {
  state = {
    sku: '',
    product_name: '',
    brand: '',
    product_category: '',
    description: '',
    supplier: '',
    barcode: '',
    dimension_length: '',
    dimension_width: '',
    dimension_height: '',
    color: '',
    specs_category: '',
    material_tags: [],
    fitting_type: '',
    fitting_qty: '',
    weight_kg: '',
    packing_length: '',
    packing_width: '',
    packing_height: '',
    cost: '',
    srp: '',
    delivery_fee: '',
    stock_overwrite: '',
    stock_alarm: '',
    sales_price: '',
    product_image: ''
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  onFormSubmit = e => {
    e.preventDefault();

    if( e.target.value !== ''){
        this.postProduct(this.state);
    }    
  };

  postProduct = async product => {
    let res = await axios.post(`http://inventory.test/api/admin/product`, {
      product
    });
    console.log(res.data);
  };

  // Adding material tags
  addTag = e => {
    if (e.key === 'Enter' && e.target.value !== '') {
      const value = e.target.value;

      // check the duplicate value in array
      if (this.state.material_tags.find(tag => tag.toLowerCase() === value.toLowerCase())){
        return;
      }

      let newTag = this.state.material_tags.concat(value);
      this.setState({material_tags: newTag});
      e.target.value = '';
    }
  }

  removeTag = (id) => {
    // console.log(id)
    const tags = this.state.material_tags;
    tags.splice(id, 1);
    this.setState({tags});
  }

  render(){
    return (
      <div>
        <div className="mb-2">
          <h2>Add New Product</h2>
        </div>
        <form
          id="addProduct"
          encType="multipart/form-data"
          onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}
          onSubmit={e => this.onFormSubmit(e)}
        >
          <h4 className="form-section">
            <i className="ft-clipboard"></i> Details
          </h4>

          <div className="card card-body">
            <section className="row">
              <div className="col-sm-6">
                <div className="form-group row">
                  <label className="col-md-3 label-control">SKU</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="sku"
                      name="sku"
                      className="form-control"
                      placeholder="SKU"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">Product Name</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="product_name"
                      name="product_name"
                      className="form-control"
                      placeholder="Product Name"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">Brand</label>
                  <div className="col-md-9">
                    <select
                      id="brand"
                      name="brand"
                      className="form-control"
                      onChange={this.handleInputChange}
                    >
                      <option value="" disabled="">
                        Choose Brand
                      </option>
                      <option value="Brand 1">Brand 1</option>
                      <option value="Brand 2">Brand 2</option>
                      <option value="Brand 3">Brand 3</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">Category</label>
                  <div className="col-md-9">
                    <select
                      id="product_category"
                      name="product_category"
                      className="form-control"
                      onChange={this.handleInputChange}
                    >
                      <option value="" disabled>
                        Choose Category
                      </option>
                      <option value="Category 1">Category 1</option>
                      <option value="Category 2">Category 2</option>
                      <option value="Category 3">Category 3</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">Description</label>
                  <div className="col-md-9">
                    <textarea
                      id="description"
                      name="description"
                      rows="2"
                      className="form-control"
                      placeholder="Description"
                      onChange={this.handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group row">
                  <label className="col-md-3 label-control">Suppliers</label>
                  <div className="col-md-9">
                    <select
                      id="supplier"
                      name="supplier"
                      className="form-control"
                      onChange={this.handleInputChange}
                    >
                      <option value="" disabled>
                        Choose Supplier
                      </option>
                      <option value="Supplier 1">Supplier 1</option>
                      <option value="Supplier 2">Supplier 2</option>
                      <option value="Supplier 3">Supplier 3</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">Barcode</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="barcode"
                      name="barcode"
                      className="form-control"
                      placeholder="Barcode"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <h4 className="form-section">
            <i className="ft-clipboard"></i> Specification
          </h4>

          <div className="card card-body">
            <section className="row">
              <div className="col-sm-6">
                <div className="form-group row">
                  <label className="col-md-3 label-control">Dimension</label>
                  <div className="col-md-3">
                    <input
                      type="text"
                      id="dimension_length"
                      name="dimension_length"
                      className="form-control"
                      placeholder="L"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="text"
                      id="dimension_width"
                      name="dimension_width"
                      className="form-control"
                      placeholder="W"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="text"
                      id="dimension_height"
                      name="dimension_height"
                      className="form-control"
                      placeholder="H"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">Color</label>
                  <div className="col-md-9">
                    <select
                      id="color"
                      name="color"
                      className="form-control"
                      onChange={this.handleInputChange}
                    >
                      <option value="" disabled>
                        Choose Color
                      </option>
                      <option value="Color 1">Color 1</option>
                      <option value="Color 2">Color 2</option>
                      <option value="Color 3">Color 3</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">Category</label>
                  <div className="col-md-9">
                    <select
                      id="specs_category"
                      name="specs_category"
                      className="form-control"
                      onChange={this.handleInputChange}
                    >
                      <option value="" disabled>
                        Choose Category
                      </option>
                      <option value="Category 1">Category 1</option>
                      <option value="Category 2">Category 2</option>
                      <option value="Category 3">Category 3</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">
                    Material Tags
                  </label>
                  <div className="col-md-9">
                    <div className="form-group">
                        <ul className="containerUl float">
                          {this.state.material_tags ? (
                            this.state.material_tags.map((tag, index) => (
                              <li className="item float-item" key={index}>
                                <span className="badge badge-primary">{tag} 
                                <button type="button" className="btn btn-primary btn-sm" 
                                    onClick={e => this.removeTag(index)}>
                                    <i className="icon la la-times"></i></button>
                                </span>
                              </li>
                            ))
                          ) : (
                            <span>No Tags</span>
                          )}
                        </ul>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Tags"
                          name="material_tags"
                          onKeyUp={e => this.addTag(e)}
                          onKeyPress={e => {
                            if (e.key === 'Enter') e.preventDefault();
                          }}
                        />
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">Fitting Type</label>
                  <div className="col-md-9">
                    <select
                      id="fitting_type"
                      name="fitting_type"
                      className="form-control"
                      onChange={this.handleInputChange}
                    >
                      <option value="" disabled>
                        Choose Fitting
                      </option>
                      <option value="Fitting 1">Fitting 1</option>
                      <option value="Fitting 2">Fitting 2</option>
                      <option value="Fitting 3">Fitting 3</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">Fitting Qty</label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      id="fitting_qty"
                      name="fitting_qty"
                      className="form-control"
                      placeholder="0"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group row">
                  <label className="col-md-3 label-control">Weight (Kg)</label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      id="weight_kg"
                      name="weight_kg"
                      className="form-control"
                      placeholder="0"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">Packing</label>
                  <div className="col-md-3">
                    <input
                      type="text"
                      id="packing_length"
                      name="packing_length"
                      className="form-control"
                      placeholder="L"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="text"
                      id="packing_width"
                      name="packing_width"
                      className="form-control"
                      placeholder="W"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="text"
                      id="packing_height"
                      name="packing_height"
                      className="form-control"
                      placeholder="H"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <h4 className="form-section">
            <i className="ft-clipboard"></i> Pricing & Stock
          </h4>

          <div className="card card-body">
            <section className="row">
              <div className="col-sm-6">
                <div className="form-group row">
                  <label className="col-md-3 label-control">Cost</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="cost"
                      name="cost"
                      className="form-control"
                      placeholder="Cost"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">SRP</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="srp"
                      name="srp"
                      className="form-control"
                      placeholder="SRP"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">Delivery Fee</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="delivery_fee"
                      name="delivery_fee"
                      className="form-control"
                      placeholder="Delivery Fee"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">
                    Customization Fee
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="customization_fee"
                      name="customization_fee"
                      className="form-control"
                      placeholder="Customization Fee"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group row">
                  <label className="col-md-3 label-control">
                    Stock (overwrite)
                  </label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      id="stock_overwrite"
                      name="stock_overwrite"
                      className="form-control"
                      placeholder="Stock (overwrite)"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">Stock Alarm</label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      id="stock_alarm"
                      name="stock_alarm"
                      className="form-control"
                      placeholder="Stock Alarm"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-3 label-control">Sales Price</label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      id="sales_price"
                      name="sales_price"
                      className="form-control"
                      placeholder="Sales Price"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <h4 className="form-section">
            <i className="ft-clipboard"></i> Image
          </h4>
          <div className="card card-body">
            <section className="row">
              <div className="col-md-4">
                <img
                  id="imagePreview"
                  src="/square.jpg"
                  alt="image"
                  className="img-fluid"
                  onChange={this.handleInputChange}
                />
              </div>
              <div id="drop-area" className="col-md-8">
                <div align="center" className="m-5 py-5">
                  <input
                    id="product_image"
                    type="file"
                    name="product_image"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="row justify-content-end">
            <div className="mr-2">
              <div className="form-group">
                <span className="btn btn-danger btn-sm mr-1">Cancel</span>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ProductAdd;