import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import App from './App';
// import 'antd/dist/antd.css';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
if(module.hot){
    module.hot.accept()
}