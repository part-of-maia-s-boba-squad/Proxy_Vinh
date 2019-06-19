require('newrelic');
const express = require('express');
const path = require('path');
proxy = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, './public');

app.use(express.static(publicDir));
app.use('/API/restaurant/photo', proxy('http://ec2-13-52-178-96.us-west-1.compute.amazonaws.com/API/restaurant/photo'));
app.use('/photo', proxy('http://ec2-13-52-178-96.us-west-1.compute.amazonaws.com/photo'));
app.use('/flag', proxy('http://ec2-13-52-178-96.us-west-1.compute.amazonaws.com/flag'));

app.get('/loaderio-ed289c50a7ca37d416718c84afbbd840/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './loaderio-ed289c50a7ca37d416718c84afbbd840.txt'));
});

app.get('/:id', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/public') + '/index.html');
});

app.listen(port, () => console.log('Listening on Port:', port));
