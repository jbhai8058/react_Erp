import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import Header from './Component/Header';
import Menu from './Component/Menu';
import Dashboard from './Component/Dashboard';
import Footer from './Component/Footer';

function App() {
  return (
    <Fragment>
      <Header />
      <Menu />
      <Dashboard />
      <Footer />
    </Fragment>
  );
}

export default App;
