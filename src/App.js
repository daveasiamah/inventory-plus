import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Home from "./components/admin/Home";

// Product
import Product from "./components/product/Product";
import ProductCreate from "./components/product/ProductCreate";
import ProductEdit from "./components/product/ProductEdit";

// Supplier
import Supplier from "./components/supplier/Supplier";
import SupplierCreate from "./components/supplier/SupplierCreate";
import SupplierEdit from "./components/supplier/SupplierEdit";

// Brand
import Brand from "./components/brand/Brand";

// Brand
import Category from "./components/category/Category";
import CategoryCreate from "./components/category/CategoryCreate";
import CategoryEdit from "./components/category/CategoryEdit";

// Affiliates
import Affiliate from "./components/affiliate/Affiliate";
import AffiliateAdd from "./components/affiliate/AffiliateAdd";
import AffiliatesCommission from "./components/affiliate/AffiliatesCommission";
import AffiliatesHistory from "./components/affiliate/AffiliatesHistory";

// Customer
import Customer from "./components/customer/Customer";
import CustomerAdd from "./components/customer/CustomerAdd";
import CustomerHistory from "./components/customer/CustomerHistory";

// Inventory
import Inventory from "./components/inventory/Inventory";

// Invoice
import Invoice from "./components/invoice/Invoice";
import InvoiceAdd from "./components/invoice/InvoiceAdd";
import InvoiceTemplate from "./components/invoice/InvoiceTemplate";
import PageNotFound from "./components/layouts/PageNotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div className="app-content content">
            <div className="content-wrapper">
              <div className="content-body">
                <Switch>
                  {/* products */}
                  <Route path="/" exact component={Home} />
                  <Route path="/product" exact component={Product} />
                  <Route path="/product/create" component={ProductCreate} />
                  <Route path="/product/:id/edit" component={ProductEdit} />

                  {/* suppliers */}
                  <Route path="/supplier" exact component={Supplier} />
                  <Route path="/supplier/create" component={SupplierCreate} />
                  <Route path="/supplier/:id/edit" component={SupplierEdit} />

                  {/* brands */}
                  <Route path="/brand" exact component={Brand} />

                  {/* category */}
                  <Route path="/category" exact component={Category} />
                  <Route path="/category/create" component={CategoryCreate} />
                  <Route path="/category/:id/edit" component={CategoryEdit} />

                  {/* affliates */}
                  <Route path="/affiliates" exact component={Affiliate} />
                  <Route path="/affiliates/add" component={AffiliateAdd} />
                  <Route
                    path="/affiliates/commissions"
                    component={AffiliatesCommission}
                  />
                  <Route
                    path="/affiliates/history"
                    component={AffiliatesHistory}
                  />

                  {/* customer */}
                  <Route path="/customer" exact component={Customer} />
                  <Route path="/customer/add" component={CustomerAdd} />
                  <Route path="/customer/history" component={CustomerHistory} />

                  {/* inventory */}
                  <Route path="/inventory" exact component={Inventory} />

                  {/* invoice */}
                  <Route path="/invoice" exact component={Invoice} />
                  <Route path="/invoice/add" component={InvoiceAdd} />
                  <Route
                    path="/invoice/templates"
                    component={InvoiceTemplate}
                  />
                  <Route component={PageNotFound} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
