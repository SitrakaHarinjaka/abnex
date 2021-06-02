
import './App.css';
import Footer from './component/Footer';
import Header from './component/Header';
import carsList from './data';
import ListCars from './component/ListCars/ListCars';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import "./scss/fonts.scss";
import "./scss/global.scss";

function App() {
  return (
    <Router>
      <div className="containtApp">
        <Header/>
        <div className="containerRoot">
          <Route path="/list">
            <ListCars data={carsList}/>
          </Route>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
