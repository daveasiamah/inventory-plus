import React from 'react'

const Product = () => {
    return (
        <div>
            <h1>Products</h1>
            <section className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <a className="heading-elements-toggle"><i className="la la-ellipsis-v font-medium-3"></i></a>
                                    <div className="heading-elements">
                                        <ul className="list-inline mb-0">
                                            <li><a data-action="collapse"><i className="ft-minus"></i></a></li>
                                            <li><a data-action="reload"><i className="ft-rotate-cw"></i></a></li>
                                            <li><a data-action="close"><i className="ft-x"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-content collapse show">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <div className="">Low Stock</div>
                                                <img src="square.jpg" className="img-fluid"/>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="">Out of Stock</div>
                                                <img src="square.jpg" className="img-fluid"/>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="">Total Items</div>
                                                <img src="square.jpg" className="img-fluid"/>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="">Others</div>
                                                <img src="square.jpg" className="img-fluid"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Product;
