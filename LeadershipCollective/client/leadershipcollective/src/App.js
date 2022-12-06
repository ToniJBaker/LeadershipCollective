import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApplicationViews from './Components/views/ApplicationViews';
import { Header } from './Components/nav/Header';
import Authorize from './Components/views/Authorize';
import './App.css';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);


  useEffect(() => {
    if (!localStorage.getItem("userProfile")) {
      setIsLoggedIn(false)

    }
  }, [isLoggedIn])

  return (

    <Router>
      <>
        {isLoggedIn ?
        <>
       <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
     <ApplicationViews  />
        </>
          :
          <>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <Authorize setIsLoggedIn={setIsLoggedIn}/>
      </>
          }
      </>
    </Router>
  );
}

export default App;
