import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [code, setCode] = useState('');
  const [rand, setRandom] = useState([]);
  const [icon, setIcon] = useState(false);

  const generateRandomNumber = () => {
    const min = 100000;
    const max = 999999;
    const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandom((prevNumbers) => [...prevNumbers, newRandomNumber]);

    setTimeout(() => {
      setRandom((prevNumbers) => prevNumbers.filter((num) => num !== newRandomNumber));
    }, 30000);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (rand.length > 0) {
        setRandom((prevNumbers) => prevNumbers.slice(1));
        setIcon(true);
      } else {
        setIcon(false);
      }
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  }, [rand]);

  function Box({ number }) {
    return (
      <div className="number-box">
        <p className="number">{number}</p>
        <span className="countdown-circle"></span>
      </div>
    );
  }


  const Submit=(e)=>{
    e.preventDefault();//ca sa nu lose data dupa reload page 
}

  return (
    <div className="App">
      <div className="form-container">
        <form  onSubmit={Submit}>
          <ul className="text">Authenticator
            <li className="bar1"></li>
            <li className="bar2"></li>
            <li className="bar3"></li>
          </ul>
        
        <label  htmlFor="code">Email</label>
        <input value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="*****@gmail.com" id="code" name="code"/>
        <br></br>
          <button className="Code" type="submit">Submit</button>
          </form>
          <br></br>
          <br></br>
        <button onClick={generateRandomNumber} className="red-button" type="button">Generate</button>
        <div>
          {rand.map((number, index) => (
            <Box key={number} number={number} />
            /*<p key={number}>{number} {index === 0 && icon && <span className="countdown-circle"></span>} </p>*/
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;


















