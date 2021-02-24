import logo from './asset/imgs/logo.svg';
import './asset/css/App.css';
import Button from '@material-ui/core/Button';
import './asset/scss/style.scss';
import Items from '../../components/Items.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="red"
        >
          Learn React
        </a>
      </header>
      <Button variant="contained" color="primary">Hello World</Button>
      <Items/>
    </div>
  );
}

export default App;
