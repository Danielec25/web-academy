import express from 'express';
import validateEnv from './utils/validateEnv';
import 'dotenv/config';
import loggerMiddleware from './middleware/logger';
import path from 'path';
import { engine } from 'express-handlebars';
import * as customHelpers from './helpers/handlebars';
import sassMiddleware from 'node-sass-middleware';


import productRouter from './routes/productRoutes';

validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../views/layouts'),
    helpers: customHelpers,
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

app.use(
  sassMiddleware({
    src: path.join(__dirname, '../sass'),
    dest: path.join(__dirname, '../public/css'),
    outputStyle: 'compressed',
    prefix: '/css',
  }),
);

app.use(loggerMiddleware('completo'));


app.use('/', productRouter);


app.use(express.static(path.join(__dirname, '../public')));
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));


app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}`);
});

