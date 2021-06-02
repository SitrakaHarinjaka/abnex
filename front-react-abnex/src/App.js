import React, { memo } from 'react';

import Footer from './component/Footer';
import Header from './component/Header';
import ListCars from './component/ListCars/ListCars';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import './scss/fonts.scss';
import './scss/global.scss';


const App = memo(() => {
  return (
    <Router>
      <div className="containtApp">
        <Header />
        <div className="containerRoot">

          <Route path="/">
            <ListCars />
          </Route>
        </div>
        <Footer />
      </div>
    </Router>
  );
});

export default App;
