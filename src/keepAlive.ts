import express from 'express';

const server = express();

server.all('/', (req, res) => {
  res.send('Good Morning! Bot is alive! Beep boop!');
});

export function keepAlive() {
  server.listen(process.env.PORT || 3000, () => {
    console.log('Server is ready.');
  });
}
