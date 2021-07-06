import './App.css';
/* React bootstrap */
import { Navbar } from 'react-bootstrap';
import BarChart from './components/BarChart'
import HomeScreen from './screens/HomeScreen'
function App() {
  return (
    <div className="App">
      <Navbar bg="danger">
        <div className="container">
          <Navbar.Brand className="text-white">
            React Chart js Integration
          </Navbar.Brand>
        </div>
      </Navbar>
      <HomeScreen/>
    <BarChart/>
    </div>
  );
}

export default App;
