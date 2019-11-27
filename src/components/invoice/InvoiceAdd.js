import React from 'react'

const InvoiceAdd = () => {
    return (
        <div>
            <div class="mb-2">
                <h2>Add New Invoice</h2>
            </div>

            <form id="addAffiliate" method="POST" action="#">
                <h4 class="form-section"><i class="ft-clipboard"></i> Affiliate Details</h4>
                <div class="card card-body">
                    <section class="row">
                        <div class="col-sm-6">
                            <div class="form-group row mt-3">
                                <label class="col-md-3 label-control">INVOICE ID</label>
                                <div class="col-md-9">
                                    <input type="text" id="invoice_id" name="invoice_id" class="form-control" disabled="true"/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 label-control" for="projectinput7">Customer</label>
                                <div class="col-md-9">
                                    <select id="customer" name="customer" class="form-control">
                                        <option value="0" selected="" disabled="">Choose Customer</option>
                                        <option value="Customer 1">Customer 1</option>
                                        <option value="Customer 2">Customer 2</option>
                                        <option value="Customer 3">Customer 3</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 label-control" for="projectinput7">Affiliates</label>
                                <div class="col-md-9">
                                    <select id="customer" name="customer" class="form-control">
                                        <option value="0" selected="" disabled="">Choose Affiliates</option>
                                        <option value="less than 5000$">Affiliates 1</option>
                                        <option value="less than 5000$">Affiliates 2</option>
                                        <option value="less than 5000$">Affiliates 3</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 label-control">Date</label>
                                <div class="col-md-6">
                                    <input type="date" id="date" name="date" class="form-control" placeholder="{{ Date('m/d/Y')}}"/>
                                </div>
                                <div class="3">
                                    <i class="la la-calendar"></i>
                                </div>
                            </div>

                        </div>

                        <div class="col-sm-6">

                            <div class="form-group row">
                                <label class="col-md-12 label-control mb-2"><b>Address Details:</b></label>

                                <label class="col-md-3 label-control">Street</label>
                                <div class="col-md-9">
                                    <input type="text" id="street" name="street" class="form-control" placeholder="Street"/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 label-control">City</label>
                                <div class="col-md-9">
                                    <input type="text" id="city" name="city" class="form-control" placeholder="City"/>
                                </div>
                            </div>


                            <div class="form-group row">
                                <label class="col-md-3 label-control">Remarks</label>
                                <div class="col-md-9">
                                    <input type="text" id="remarks" name="remarks" class="form-control" placeholder="Remarks"/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 label-control" for="projectinput7">Templates</label>
                                <div class="col-md-9">
                                    <select id="customer" name="customer" class="form-control">
                                        <option value="0" selected="" disabled="">Choose Templates</option>
                                        <option value="less than 5000$">Templates 1</option>
                                        <option value="less than 5000$">Templates 2</option>
                                        <option value="less than 5000$">Templates 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </form>
        </div>
    )
}

export default InvoiceAdd
