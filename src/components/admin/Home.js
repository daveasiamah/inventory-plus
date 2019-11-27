import React from 'react'

const Home = () => {
    return (
        <div>
            <section className="row mb-3">
                <div className="col-md-3">
                    <div className="mb-1">Low Stock</div>
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
                                <img src="square.jpg" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="mb-1">Out of Stock</div>
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
                                <img src="square.jpg" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="mb-1">Top Affiliates</div>
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
                                <img src="square.jpg" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="mb-1">Top Customer</div>
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
                                <img src="square.jpg" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="row">
                <div className="col-sm-6">
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
                                <div id="line-chart" className="height-300"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6">
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
                                <div id="gradient-line-chart" className="height-300 GradientlineShadow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
