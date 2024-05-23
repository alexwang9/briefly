import logo from './logo.svg';
import DateTime from './components/DateTime.js';
import Headlines from './components/Headlines.js';
import './App.css';



function Header() {
  return(
    <>
      <h1 className="briefly-header">briefly</h1>
      <div className="datetime-container">
        <DateTime />
      </div>
    </>
  );
}

function About( {description} ) {
  return(
    <>
      <div className="about-section">
        <h2>about briefly</h2>
        <p> {description} </p>
      </div>
    </>
  );
}



function App() {
  let description = "stay informed effortlessly with briefly! our app delivers concise and engaging summaries of the latest headlines from the New York Times directly to your inbox every morning. save time and stay ahead with our curated updates, tailored for busy professionals and news enthusiasts alike. subscribe today and transform your daily news experience!"

  return (
    <div className="App">
      <Header />
      <About description = { description } />
      <Headlines />
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
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
