import React from 'react'

const CustomerAdd = () => {
    return (
        <div>
            <div class="mb-2">
                <h2>Add Customer</h2>
            </div>
            <form id="addProduct" method="POST" action="#">
                <h4 class="form-section"><i class="ft-clipboard"></i> Customer Details</h4>
                <div class="card card-body">
                    <section class="row">
                        <div class="col-sm-6">
                            <div class="form-group row">
                                <label class="col-md-3 label-control">First Name</label>
                                <div class="col-md-9">
                                    <input type="text" id="first_name" name="first_name" class="form-control" placeholder="First Name"/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 label-control">Last Name</label>
                                <div class="col-md-9">
                                    <input type="text" id="last_name" name="last_name" class="form-control" placeholder="Last Name"/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 label-control">Address</label>
                                <div class="col-md-9">
                                    <textarea id="address" name="description" rows="2" class="form-control" placeholder="Address"></textarea>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 label-control">Contact</label>
                                <div class="col-md-9">
                                    <input type="text" id="contact" name="contact" class="form-control" placeholder="Contact"/>
                                </div>
                            </div>


                            <div class="form-group row">
                                <label class="col-md-3 label-control">Email</label>
                                <div class="col-md-9">
                                    <input type="text" id="email" name="email" class="form-control" placeholder="Email"/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 label-control">Remarks</label>
                                <div class="col-md-9">
                                    <input type="text" id="remarks" name="remarks" class="form-control" placeholder="Remarks"/>
                                </div>
                            </div>

                        </div>

                
                        <div class="col-sm-3 offset-md-3">
                            <div class="form-group">
                                <img src="/square.jpg" class="img-fluid"/>
                            </div>
                            
                            <div class="text-center">
                                <div class="form-group">
                                    <button class="btn btn-primary btn-sm">Upload</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>


                <h4 class="form-section"><i class="ft-clipboard"></i> Company Details</h4>

                <div class="card card-body">
                    <section class="row">
                        <div class="col-sm-6">
                            <div class="form-group row">
                                <label class="col-md-3 label-control">Name</label>
                                <div class="col-md-9">
                                    <input type="text" id="company_name" name="company_name" class="form-control" placeholder="Company Name"/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 label-control">Address</label>
                                <div class="col-md-9">
                                    <textarea id="company_address" name="company_address" rows="2" class="form-control" placeholder="Company Address"></textarea>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 label-control">Contact</label>
                                <div class="col-md-9">
                                    <input type="text" id="company_contact" name="company_contact" class="form-control" placeholder="Company Contact"/>
                                </div>
                            </div>
                        </div>

                
                        <div class="col-sm-6">
                            <div class="form-group row">
                                <label class="col-md-3 label-control">Contact</label>
                                <div class="col-md-9">
                                    <input type="text" id="company_contact_person" name="company_contact_person" class="form-control" placeholder="Contact Person"/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 label-control">Remarks</label>
                                <div class="col-md-9">
                                    <input type="text" id="company_remarks" name="company_remarks" class="form-control" placeholder="Remarks"/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>


                <div class="row justify-content-end">
                    <div class="mr-2">
                        <div class="form-group">
                            <button class="btn btn-danger btn-sm">Cancel</button>
                            <button type="submit" class="btn btn-primary btn-sm">Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CustomerAdd
