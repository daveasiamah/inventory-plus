import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Home from './components/admin/Home';

// Product
import Product from './components/admin/product/Product';
import ProductAdd from './components/admin/product/ProductAdd';

// Affiliates
import Affiliate from './components/admin/affiliate/Affiliate';
import AffiliateAdd from './components/admin/affiliate/AffiliateAdd';
import AffiliatesCommission from './components/admin/affiliate/AffiliatesCommission';
import AffiliatesHistory from './components/admin/affiliate/AffiliatesHistory';

// Customer
import Customer from './components/admin/customer/Customer';
import CustomerAdd from './components/admin/customer/CustomerAdd';
import CustomerHistory from './components/admin/customer/CustomerHistory';

// Inventory
import Inventory from './components/admin/inventory/Inventory';

// Invoice
import Invoice from './components/admin/invoice/Invoice';
import InvoiceAdd from './components/admin/invoice/InvoiceAdd';
import InvoiceTemplate from './components/admin/invoice/InvoiceTemplate';

function App() {
  return (
    <Router>
      <div>
          <Navbar/>
          <div class="app-content content">
              <div class="content-wrapper">
                  <div class="content-body">
                    <Switch>
                      {/* products */}
                      <Route path='/' exact component={Home}/>
                      <Route path='/product/add' component={ProductAdd}/>
                      <Route path='/product' exact component={Product}/>
                      
                      {/* affliates */}
                      <Route path='/affiliates' exact component={Affiliate}/>
                      <Route path='/affiliates/add' component={AffiliateAdd}/>
                      <Route path='/affiliates/commissions' component={AffiliatesCommission}/>
                      <Route path='/affiliates/history' component={AffiliatesHistory}/>

                      {/* customer */}
                      <Route path="/customer" exact component={Customer}/>
                      <Route path="/customer/add" component={CustomerAdd}/>
                      <Route path="/customer/history" component={CustomerHistory}/>
                      
                      {/* inventory */}
                      <Route path="/inventory" exact component={Inventory}/>

                      {/* invoice */}
                      <Route path="/invoice" exact component={Invoice}/>
                      <Route path="/invoice/add" component={InvoiceAdd}/>
                      <Route path="/invoice/templates" component={InvoiceTemplate}/>

                    </Switch>      
                  </div>
              </div>
          </div>
          <Footer/>
      </div>
    </Router>
  );
}

export default App;
