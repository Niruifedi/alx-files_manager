import Express from 'express';
import router from './routes/index';

const app = Express();
const port = process.env.PORT || 5000;

app.use('/', router);

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
