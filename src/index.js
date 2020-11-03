import express from 'express';
import router from './router';
import path from 'path';

const app = express();

app.use('/', router);

app.listen(process.env.PORT || 3000, () =>
  console.log(`listening on ${process.env.PORT}`)
);
