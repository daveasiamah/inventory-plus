import React from 'react'

const AffiliateAdd = () => {
    return (
        <div>
            <div className="mb-2">
                <h2>Add New Affiliate</h2>
            </div>
            <form id="addAffiliate" method="POST" action="#">
                <h4 className="form-section"><i className="ft-clipboard"></i> Affiliate Details</h4>
                <div className="card card-body">
                    <section className="row">
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-md-3 label-control">ID</label>
                                <div className="col-md-9">
                                    <input type="text" id="identification" name="identification" className="form-control" placeholder="ID"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">First Name</label>
                                <div className="col-md-9">
                                    <input type="text" id="first_name" name="first_name" className="form-control" placeholder="First Name"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Last Name</label>
                                <div className="col-md-9">
                                    <input type="text" id="last_name" name="last_name" className="form-control" placeholder="Last Name"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Address</label>
                                <div className="col-md-9">
                                    <textarea id="address" name="description" rows="2" className="form-control" placeholder="Address"></textarea>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Contact</label>
                                <div className="col-md-9">
                                    <input type="text" id="contact" name="contact" className="form-control" placeholder="Contact"/>
                                </div>
                            </div>


                            <div className="form-group row">
                                <label className="col-md-3 label-control">Email</label>
                                <div className="col-md-9">
                                    <input type="text" id="email" name="email" className="form-control" placeholder="Email"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Remarks</label>
                                <div className="col-md-9">
                                    <input type="text" id="remarks" name="remarks" className="form-control" placeholder="Remarks"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Rate</label>
                                <div className="col-md-9">
                                    <input type="text" id="rate" name="rate" className="form-control" placeholder="Rate"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3 offset-md-3">
                            <div className="form-group">
                                <img src="/square.jpg" className="img-fluid"/>
                            </div>
                            
                            <div className="text-center">
                                <div className="form-group">
                                    <button className="btn btn-primary btn-sm">Upload</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>


                <h4 className="form-section"><i className="ft-clipboard"></i> Company Details</h4>

                <div className="card card-body">
                    <section className="row">
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-md-3 label-control">Name</label>
                                <div className="col-md-9">
                                    <input type="text" id="company_name" name="company_name" className="form-control" placeholder="Company Name"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Address</label>
                                <div className="col-md-9">
                                    <textarea id="company_address" name="company_address" rows="2" className="form-control" placeholder="Company Address"></textarea>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Contact</label>
                                <div className="col-md-9">
                                    <input type="text" id="company_contact" name="company_contact" className="form-control" placeholder="Contact"/>
                                </div>
                            </div>
                        </div>

                
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-md-3 label-control">Contact</label>
                                <div className="col-md-9">
                                    <input type="text" id="company_contact_person" name="company_contact_person" className="form-control" placeholder="Contact Person"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Remarks</label>
                                <div className="col-md-9">
                                    <input type="text" id="company_remarks" name="company_remarks" className="form-control" placeholder="Remarks"/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <h4 className="form-section"><i className="ft-clipboard"></i> Bank Details</h4>

                <div className="card card-body">
                    <section className="row">
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-md-3 label-control">Bank Name</label>
                                <div className="col-md-9">
                                    <input type="text" id="bank_name" name="bank_name" className="form-control" placeholder="Bank Name"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Bank Branch</label>
                                <div className="col-md-9">
                                    <input type="text" id="bank_branch" name="bank_branch" className="form-control" placeholder="Bank Branch"/>
                                </div>
                            </div>
                        
                            <div className="form-group row">
                                <label className="col-md-3 label-control">Contact</label>
                                <div className="col-md-9">
                                    <input type="text" id="company_contact_person" name="company_contact_person" className="form-control" placeholder="Contact Person"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control">Acct Number</label>
                                <div className="col-md-9">
                                    <input type="text" id="acct_number" name="acct_number" className="form-control" placeholder="Acct Number"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 label-control" for="projectinput7">Account Type</label>
                                <div className="col-md-9">
                                    <select id="acct_type" name="acct_type" className="form-control">
                                        <option value="0" selected="" disabled="">Choose Account Type</option>
                                        <option value="less than 5000$">Account Type 1</option>
                                        <option value="less than 5000$">Account Type 2</option>
                                        <option value="less than 5000$">Account Type 3</option>
                                    </select>
                                </div>
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
    );
}

export default AffiliateAdd;
