import React from 'react';
import ReactDOM from 'react-dom/client';
/* We need to wrap our app inside of a Provider tag which will give
  to our components access to the redux centralized store */
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>
);