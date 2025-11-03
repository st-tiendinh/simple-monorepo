import express from 'express';
import { formatDate } from '@monorepo/packages';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Express server running',
    date: formatDate(new Date(), 'long'),
  });
});

app.get('/api/date', (req, res) => {
  const format = (req.query.format as 'short' | 'long') || 'short';
  res.json({
    date: formatDate(new Date(), format),
  });
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
