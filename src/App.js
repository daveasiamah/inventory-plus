import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Home from "./components/admin/Home";

// Product
import Product from "./components/product/Product";

// Supplier
import Supplier from "./components/supplier/Supplier";

// Brand
import Brand from "./components/brand/Brand";

// Category
import Category from "./components/category/Category";

// Customer
import Customer from "./components/customer/Customer";

// Purchase Order (PO)
import PurchaseOrder from "./components/purchase_order/PO";
import POCreate from './components/purchase_order/POCreate';

import PageNotFound from "./components/layouts/PageNotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            {/* Products */}
            <Route path="/" exact component={Home} />
            <Route path="/product" exact component={Product} />
            {/* Supplier */}
            <Route path="/supplier" exact component={Supplier} /> 

            {/* Brand */}
            <Route path="/brand" exact component={Brand} />

            {/* Category */}
            <Route path="/category" exact component={Category} />

            {/* Customer */}
            <Route path="/customer" exact component={Customer} />

            {/* purchase order (PO) */}
            <Route path="/po" exact component={PurchaseOrder} />
            <Route path="/po/create" component={POCreate}/>

            <Route component={PageNotFound} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
