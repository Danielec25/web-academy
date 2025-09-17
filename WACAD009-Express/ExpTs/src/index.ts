import express from 'express';
import validateEnv from './utils/validateEnv';
import 'dotenv/config';
import loggerMiddleware from './middleware/logger';
import path from 'path';
import { engine } from 'express-handlebars';
import * as customHelpers from './helpers/handlebars';
import sassMiddleware from 'node-sass-middleware';
import loremRouter from './routes/lorem';
import hbsRouter from './routes/hbsRoutes';

validateEnv();

const app = express();
const PORT = process.env.PORT;

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

// Configuração do SASS
app.use(
  sassMiddleware({
    src: path.join(__dirname, '../sass'),
    dest: path.join(__dirname, '../public/css'),
    outputStyle: 'compressed',
    prefix: '/css',
  }),
);


app.use(express.static(path.join(__dirname, '../public')));

app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));


app.use(loggerMiddleware('completo'));


app.use('/', loremRouter);
app.use('/', hbsRouter);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}`);
});

