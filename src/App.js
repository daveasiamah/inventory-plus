import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Home from "./components/admin/Home";

// Product
import Product from "./components/product/Product";
import ProductCreate from "./components/product/ProductCreate";
import ProductShow from "./components/product/ProductShow";
import ProductEdit from "./components/product/ProductEdit";

// Supplier
import Supplier from "./components/supplier/Supplier";

// Brand
import Brand from "./components/brand/Brand";

// Category
import Category from "./components/category/Category";

// Customer
import Customer from "./components/customer/Customer";

// Agent
import Agent from "./components/agent/Agent";

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
                  {/* Products */}
                  <Route path="/" exact component={Home} />
                  <Route path="/product" exact component={Product} />
                  <Route path="/product/create" component={ProductCreate} />
                  <Route path="/product/:id" exact component={ProductShow} />
                  <Route path="/product/:id/edit" component={ProductEdit} />

                  {/* Supplier */}
                  <Route path="/supplier" exact component={Supplier} /> 

                  {/* Brand */}
                  <Route path="/brand" exact component={Brand} />

                  {/* Category */}
                  <Route path="/category" exact component={Category} />

                  {/* Customer */}
                  <Route path="/customer" exact component={Customer} />

                  {/* Agent */}
                  <Route path="/agent" exact component={Agent} />

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
