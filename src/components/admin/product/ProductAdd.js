import React from 'react'
import {Link} from 'react-router-dom';

const ProductAdd = () => {
    return (
        <div>
            <div className="mb-2">
                <h2>Add New Product</h2>	
            </div>
                
            <form id="addProduct" method="POST" action="" enctype="multipart/form-data">

                <h4 className="form-section"><i className="ft-clipboard"></i> Details</h4>

                <div className="card card-body">
                    <section className="row">
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-md-3 label-control">SKU</label>
                                <div className="col-md-9">
                                    <input type="text" id="sku" name="sku" className="form-control" placeholder="SKU"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Product Name</label>
                                <div className="col-md-9">
                                    <input type="text" id="product_name" name="product_name" className="form-control" placeholder="Product Name"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Brand</label>
                                <div className="col-md-9">
                                    <select id="brand" name="brand" className="form-control">
                                        <option value="0" selected="" disabled="">Choose Brand</option>
                                        <option value="Brand 1">Brand 1</option>
                                        <option value="Brand 2">Brand 2</option>
                                        <option value="Brand 3">Brand 3</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Category</label>
                                <div className="col-md-9">
                                    <select id="product_category" name="product_category" className="form-control">
                                        <option value="0" selected="" disabled="">Choose Category</option>
                                        <option value="Category 1">Category 1</option>
                                        <option value="Category 2">Category 2</option>
                                        <option value="Category 3">Category 3</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Description</label>
                                <div className="col-md-9">
                                    <textarea id="description" name="description" rows="2" className="form-control" placeholder="Description"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-md-3 label-control">Suppliers</label>
                                <div className="col-md-9">
                                    <select id="supplier" name="supplier" className="form-control">
                                        <option value="0" selected="" disabled="">Choose Supplier</option>
                                        <option value="Supplier 1">Supplier 1</option>
                                        <option value="Supplier 2">Supplier 2</option>
                                        <option value="Supplier 3">Supplier 3</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Barcode</label>
                                <div className="col-md-9">
                                    <input type="text" id="barcode" name="barcode" className="form-control" placeholder="Barcode"/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>


                <h4 className="form-section"><i className="ft-clipboard"></i> Specification</h4>

                <div className="card card-body">
                    <section className="row">
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-md-3 label-control">Dimension</label>
                                <div className="col-md-3">
                                    <input type="text" id="dimension_length" name="dimension_length" className="form-control" placeholder="L"/>
                                </div>
                                <div className="col-md-3">
                                    <input type="text" id="dimension_width" name="dimension_width" className="form-control" placeholder="W"/>
                                </div>
                                <div className="col-md-3">
                                    <input type="text" id="dimension_height" name="dimension_height" className="form-control" placeholder="H"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Color</label>
                                <div className="col-md-9">
                                    <select id="color" name="color" className="form-control">
                                        <option value="0" selected="" disabled="">Choose Color</option>
                                        <option value="Color 1">Color 1</option>
                                        <option value="Color 2">Color 2</option>
                                        <option value="Color 3">Color 3</option>
                                    </select>
                                </div>
                            </div>
                                
                            <div className="form-group row">
                                <label className="col-md-3 label-control">Category</label>
                                <div className="col-md-9">
                                    <select id="category" name="specs_category" className="form-control">
                                        <option value="0" selected="" disabled="">Choose Category</option>
                                        <option value="Category 1">Category 1</option>
                                        <option value="Category 2">Category 2</option>
                                        <option value="Category 3">Category 3</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Material Tags</label>
                                <div className="col-md-9">
                                        <div className="form-group">
                                            <div id="material_tags" name="material_tags" className="edit-on-delete form-control" data-tags-input-name="material_tags">
                                                Aluminum, Wood
                                            </div>
                                        </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Fitting Type</label>
                                <div className="col-md-9">
                                    <select id="fitting_type" name="fitting_type" className="form-control">
                                        <option value="0" selected="" disabled="">Choose Fitting</option>
                                        <option value="Fitting 1">Fitting 1</option>
                                        <option value="Fitting 2">Fitting 2</option>
                                        <option value="Fitting 3">Fitting 3</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Fitting Qty</label>
                                <div className="col-md-6">
                                    <input type="text" id="fitting_qty" name="fitting_qty" className="form-control" placeholder="0"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-md-3 label-control">Weight (Kg)</label>
                                <div className="col-md-6">
                                    <input type="number" id="weight_kg" name="weight_kg" className="form-control" placeholder="0"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Packing</label>
                                <div className="col-md-3">
                                    <input type="text" id="packing_length" name="packing_length" className="form-control" placeholder="L" />
                                </div>
                                <div className="col-md-3">
                                    <input type="text" id="packing_width" name="packing_width" className="form-control" placeholder="W"/>
                                </div>
                                <div className="col-md-3">
                                    <input type="text" id="packing_height" name="packing_height" className="form-control" placeholder="H"/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <h4 className="form-section"><i className="ft-clipboard"></i> Pricing & Stock</h4>

                <div className="card card-body">
                    <section className="row">
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-md-3 label-control">Cost</label>
                                <div className="col-md-9">
                                    <input type="text" id="cost" name="cost" className="form-control" placeholder="Cost"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">SRP</label>
                                <div className="col-md-9">
                                    <input type="text" id="srp" name="srp" className="form-control" placeholder="SRP"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Delivery Fee</label>
                                <div className="col-md-9">
                                    <input type="text" id="delivery_fee" name="delivery_fee" className="form-control" placeholder="Delivery Fee"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Customization Fee</label>
                                <div className="col-md-9">
                                    <input type="text" id="customization_fee" name="customization_fee" className="form-control" placeholder="Customization Fee"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-md-3 label-control">Stock (overwrite)</label>
                                <div className="col-md-6">
                                    <input type="text" id="stock_overwrite" name="stock_overwrite" className="form-control" placeholder="Stock (overwrite)"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Stock Alarm</label>
                                <div className="col-md-6">
                                    <input type="number" id="stock_alarm" name="stock_alarm" className="form-control" placeholder="Stock Alarm"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Sales Price</label>
                                <div className="col-md-9">
                                    <input type="text" id="sales_price" name="sales_price" className="form-control" placeholder="Sales Price"/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <h4 className="form-section"><i className="ft-clipboard"></i> Image</h4>
                <div className="card card-body">
                    <section className="row">
                        <div className="col-md-4">
                            <img id="imagePreview" src="{{ asset('square.jpg')}}" className="img-fluid"/>
                        </div>

                        <div id="drop-area" className="col-md-8">
                            <div align="center" className="m-5 py-5">
                                <input id="product_image" type="file" name="product_image"/>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="row justify-content-end">
                    <div className="mr-2">
                        <div className="form-group">
                            <button className="btn btn-danger btn-sm">Cancel</button>
                            <button type="submit" className="btn btn-primary btn-sm">Save</button>
                        </div>
                    </div>
                </div>   
            </form>
        </div>
    )
}

export default ProductAdd;
