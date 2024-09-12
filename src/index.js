import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../src/style.css';
import '../src/animation.css';
import '../src/responsive.css';
import '../src/menu.css';
import '../src/post.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import { Provider } from 'react-redux';
import store from './Store';
import { RouterProvider } from 'react-router-dom';
import Routing from '../src/Component/App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={Routing} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

