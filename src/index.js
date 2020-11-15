import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css'
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux/reducers";

ReactDOM.render(
<Provider store={store}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
</Provider>,
  document.getElementById('root')
);
