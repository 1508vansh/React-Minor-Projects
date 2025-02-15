import React from 'react';
import reactDOM from 'react-dom/client';
import Header from './header.js';
import Body from './body.js';
const App = () => {
    return(
       <>
       <Header/>
       <Body/>
       </>
    );
}
const root = reactDOM.createRoot(document.getElementById('root'));  
root.render(<App />);