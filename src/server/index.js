import express  from 'express';
import React from 'react';
import  { renderToString } from 'react-dom/server';
import App from '../app/components/HelloWorld/index';
import template from './template';
import path from 'path';



export default ({ clientStats }) => (req, res) => {
    const appString = renderToString(<App />);
    
        res.send(template({
            body: appString,
            title: "Hello from the server"
        }))
}
//server.use('/assets',express.static(path.resolve(__dirname,'..','public')))
