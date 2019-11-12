import React from 'react'

const AffiliatesHistory = () => {
    return (
        <div>
            <div class="mb-2">
                <h2>Affiliate Details</h2>
            </div>

            <div class="row mx-12">	
                <div class="col-md-4">
                    <form>
                        <div class="form-group">
                            <input type="text" id="identification" name="identification" class="form-control round" placeholder="Search Customer"/>
                            {/* {{-- <button type="submit" class="btn btn-primary">Go</button> --}} */}
                        </div>
                    </form>
                </div>
            </div>

            <h4 class="form-section"><i class="ft-clipboard"></i> Customer Details</h4>

            <form action="#" method="POST">

                <div class="card card-body">
                    <section class="row">
                        <div class="col-sm-8">
                            <div class="form-group row">
                                <label class="col-md-2 label-control">First Name</label>
                                <div class="col-md-7">
                                    <input type="text" id="first_name" name="first_name" class="form-control"/>
                                </div>
                                <button class="btn btn-link"><i class="la la-edit"></i></button>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-2 label-control">Last Name</label>
                                <div class="col-md-7">
                                    <input type="text" id="last_name" name="last_name" class="form-control"/>
                                </div>
                                <button class="btn btn-link"><i class="la la-edit"></i></button>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-2 label-control">Address</label>
                                <div class="col-md-7">
                                    <textarea id="address" name="address" rows="2" class="form-control"></textarea>
                                </div>
                                <button class="btn btn-link"><i class="la la-edit"></i></button>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-2 label-control">Contact</label>
                                <div class="col-md-7">
                                    <input type="text" id="contact" name="contact" class="form-control"/>
                                </div>
                                <button class="btn btn-link"><i class="la la-edit"></i></button>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-2 label-control">Rate</label>
                                <div class="col-md-7">
                                    <input type="text" id="rate" name="rate" class="form-control"/>
                                </div>
                                <button class="btn btn-link"><i class="la la-edit"></i></button>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-2 label-control">Bank</label>
                                <div class="col-md-7">
                                    <input type="text" id="bank" name="bank" class="form-control"/>
                                </div>
                                <button class="btn btn-link"><i class="la la-edit"></i></button>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-2 label-control">Acct No.</label>
                                <div class="col-md-7">
                                    <input type="text" id="acct_number" name="acct_number" class="form-control"/>
                                </div>
                                <button class="btn btn-link"><i class="la la-edit"></i></button>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-2 label-control">Remarks</label>
                                <div class="col-md-7">
                                    <input type="text" id="remarks" name="remarks" class="form-control"/>
                                </div>
                                <button class="btn btn-link"><i class="la la-edit"></i></button>
                            </div>
                        </div>

                        <div class="col-sm-3 offset-md-1">
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
            </form>

            <h4 class="form-section"><i class="ft-clipboard"></i> Order History</h4>

            <div class="card card-body">
                <section class="row">
                    <div class="col-sm-12">
                        <h1>TABLE TAKES HERE!</h1>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AffiliatesHistory;
