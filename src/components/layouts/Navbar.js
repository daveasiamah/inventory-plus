import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-dark">
                <div className="navbar-wrapper">
                    <div className="navbar-container content">
                        <div className="collapse navbar-collapse show" id="navbar-mobile">
                            <ul className="nav navbar-nav mr-auto float-left">
                                <li className="nav-item mobile-menu d-md-none mr-auto">
                                    <a className="nav-link nav-menu-main menu-toggle hidden-xs" href="#">
                                        <i className="ft-menu font-large-1"></i>
                                    </a>
                                </li>
                            </ul>

                            <ul className="nav navbar-nav float-right">
                                <li className="dropdown dropdown-user nav-item">
                                    <a className="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown">
                                         <span className="avatar avatar-online">
                                             <img src="/theme/app-assets/images/portrait/small/avatar-s-19.png" alt="avatar"/>
                                             <i></i>
                                        </span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <div className="arrow_box_right">
                                            <a className="dropdown-item" href="#">
                                                <span className="avatar avatar-online">
                                                    <img src="/theme/app-assets/images/portrait/small/avatar-s-19.png" alt="avatar"/>
                                                    <span className="user-name text-bold-700 ml-1">John Doe</span>
                                                </span>
                                            </a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="user-profile.html"><i className="ft-user"></i>Profile</a>
                                            <a className="dropdown-item" href="email-application.html"><i className="ft-mail"></i> Account</a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item" href="login.html">
                                                <i className="ft-power"></i> Logout
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
  
            <div className="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true" data-img="/theme/app-assets/images/backgrounds/04.jpg">
                <div className="navbar-header">
                    <ul className="nav navbar-nav flex-row position-relative">
                        <li className="nav-item mr-auto"><a className="navbar-brand" href="#"><img className="brand-logo" alt="Chameleon admin logo" src="/theme/app-assets/images/logo/logo.png"/>
                                <h3 className="brand-text">Bluehive Inc.</h3>
                            </a></li>
                        <li className="nav-item d-none d-md-block nav-toggle"><a className="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i className="toggle-icon ft-disc font-medium-3" data-ticon="ft-disc"></i></a></li>
                        <li className="nav-item d-md-none"><a className="nav-link close-navbar"><i className="ft-x"></i></a></li>
                    </ul>
                </div>
                <div className="navigation-background"></div>
                <div className="main-menu-content">
                    <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                        <li className=" nav-item">
                            <Link to="/"><i className="la la-home"></i>
                                <span className="menu-title" data-i18n="">Dashboard</span>
                            </Link>
                        </li>
                        <li className=" nav-item">
                            <a href="#">
                                <i className="la la-rocket"></i><span className="menu-title" data-i18n="">Products</span>
                            </a>
                            <ul className="menu-content">
                                <li><Link className="menu-item" to="/product" data-i18n="nav.starter_kit.fixed_layout">Products</Link></li>
                                <li><a className="menu-item" href="/brand" data-i18n="nav.starter_kit.boxed_layout">Brands</a>
                                </li>
                                <li><a className="menu-item" href="/category" data-i18n="nav.starter_kit.static_layout">Categories</a>
                                </li>
                            </ul>
                        </li>
                        <li className=" nav-item">
                            <Link to="/supplier">
                                <i className="la la-random"></i><span className="menu-title" data-i18n="">Supplier</span>
                            </Link>
                        </li>
                        <li className=" nav-item">
                            <Link to="/inventory">
                                <i className="la la-folder"></i><span className="menu-title" data-i18n="">Inventory</span>
                            </Link>
                        </li>
                        <li className=" nav-item">
                            <Link to="/agent">
                                <i className="la la-users"></i><span className="menu-title" data-i18n="">Agents</span>
                            </Link>
                        </li>
                        <li className=" nav-item"><a href="#"><i className="la la-users"></i><span className="menu-title" data-i18n="">Customers</span></a>
                            <ul className="menu-content">
                                <li>
                                    <Link className="menu-item" to="/customer" data-i18n="nav.starter_kit.fixed_layout">Customers</Link>
                                </li>
                                <li>
                                    <Link className="menu-item" to="/customer/history" data-i18n="nav.starter_kit.boxed_layout">History</Link>
                                </li>
                            </ul>
                        </li>
                        <li className=" nav-item"><a href="#"><i className="la la-rocket"></i><span className="menu-title" data-i18n="">Affiliates</span></a>
                            <ul className="menu-content">
                                <li><Link className="menu-item" to="/affiliates" data-i18n="nav.starter_kit.fixed_layout">Affiliates</Link>
                                </li>
                                <li><Link className="menu-item" to="/affiliates/add" data-i18n="nav.starter_kit.fixed_layout">Add Affiliates</Link>
                                </li>
                                <li><Link className="menu-item" to="/affiliates/history" data-i18n="nav.starter_kit.boxed_layout">History</Link>
                                </li>
                                <li><Link className="menu-item" to="/affiliates/commissions" data-i18n="nav.starter_kit.boxed_layout">Commissions</Link>
                                </li>
                            </ul>
                        </li>
                        <li className=" nav-item"><a href="#"><i className="la la-file-text"></i><span className="menu-title" data-i18n="">Invoices</span></a>
                            <ul className="menu-content">
                                <li><Link className="menu-item" to="/invoice" data-i18n="nav.starter_kit.fixed_layout">Invoice</Link>
                                </li>
                                <li><Link className="menu-item" to="/invoice/add" data-i18n="nav.starter_kit.fixed_layout">Add Invoice</Link>
                                </li>
                                <li><Link className="menu-item" to="/invoice/templates" data-i18n="nav.starter_kit.boxed_layout">Templates</Link>
                                </li>
                            </ul>
                        </li>
                        <li className=" nav-item"><a href="https://themeselection.com/demo/chameleon-admin-template/documentation">
                            <i className="la la-truck"></i><span className="menu-title" data-i18n="">Deliveries</span></a>
                        </li>
                        <li className=" nav-item"><a href="https://themeselection.com/demo/chameleon-admin-template/documentation">
                            <i className="la la-file-text"></i><span className="menu-title" data-i18n="">Quotations</span></a>
                        </li>
                        <li className=" nav-item"><a href="https://themeselection.com/demo/chameleon-admin-template/documentation">
                            <i className="la la-mobile-phone"></i><span className="menu-title" data-i18n="">SMS Blaster</span></a>
                        </li>
                        <li className=" nav-item"><a href="https://themeselection.com/demo/chameleon-admin-template/documentation">
                            <i className="la la-users"></i><span className="menu-title" data-i18n="">Users</span></a>
                        </li>
                        <li className=" nav-item"><a href="https://themeselection.com/demo/chameleon-admin-template/documentation">
                            <i className="la la-gear"></i><span className="menu-title" data-i18n="">Settings</span></a>
                        </li>
                    </ul>
                </div>
            </div>
    
    </div>
    )
}

export default Navbar;
