import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Table from './components/Table';


function App() {
  return (
    <div className="App overflow-x-hidden">
    
      <Header/>
      <Login/>
      <Table/>
    </div>
  );
}

export default App;
