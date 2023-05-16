 
const http = require('http');
const express=require("express");
const app=express();
const path=require("path");

const hbs=require("hbs");
const collection=require("./mongodb")
const qs = require('querystring');
const { fork } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async() => {
      const formData = qs.parse(body);
      const data={
        Name:formData.Name,
        email:formData.Email,
        password:formData.Password,
        phone:formData.phoneno
      }
      await collection.insertMany([data]);

     
      res.writeHead(600, {'Content-Type': 'text/html'});
      console.log(`Name: ${formData.Name}\nEmail: ${formData.Email} \n Phone Number: ${formData.Password} \n `);
      //res.end(`Name: ${formData.Name}\nEmail: ${formData.Email} \n Phone Number: ${formData.Password} \n `);
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      not correct
    `);
  }
});

server.listen(5004, () => {
  console.log('Server running on port 5000');
});