import logo from './logo.svg';
import React from 'react';
import axios from 'axios';
import DateTime from './components/DateTime.js';
import Headlines from './components/Headlines.js';
import EmailForm from './components/EmailForm.js';
import './App.css';



function Header() {
  return(
    <>
      <h1 className="Briefly-header">briefly</h1>
      <div className="Datetime-container">
        <DateTime />
      </div>
    </>
  );
}

function About( {description} ) {
  return(
    <>
      <div className="About-section">
        <h2 className="about-header">about briefly</h2>
        <p> {description} </p>
      </div>
    </>
  );
}



function App() {
  let description = "stay informed effortlessly with briefly! our app delivers concise and engaging summaries of the latest headlines from the New York Times directly to your inbox every morning. save time and stay ahead with our curated updates, tailored for busy professionals and news enthusiasts alike. subscribe today and transform your daily news experience!"

  const handleSubscribe = async(email) =>{
    try {
      await axios.post('http://localhost:3001/subscribe', { email });
      //alert('Subscribed sucessfully!');
    } catch (error) {
      console.error('There was an error subscribing:', error);
    }
  };

  return (
    <div className="App">
      <Header/>
      <div className="Body-section">
        <About description = { description }/>
        <Headlines />
        <EmailForm onSubmit={handleSubscribe} />
      </div>
    </div>
  );
}

export default App;
