import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import './env';
import { connect } from './db';
import authRoutes from './routes/auth-routes';
import todosRoutes from './routes/todos-routes';
//import passportSetup from './config/passport-setup';

const app = express();
//3000 used by webpack dev server
app.set('port', process.env.PORT || 3001);
/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set up vidw engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));

//same port as client use http://localhost:3000
app.use('*', cors({ origin: 'http://localhost:3000' }));
//set up routes
// All routes in the end
app.use('/auth', authRoutes);
app.use('/todos', todosRoutes);
//create home route
app.get('/', function(req, res) {
  res.render('home');
});

app.listen(app.get('port'), () =>
  console.log(`Server is now running on http://localhost:${app.get('port')}`)
);
