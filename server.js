const { promisify } = require('util');
const fs = require('fs');

const getStat = promisify(fs.stat);

const express = require('express');
const app = express();

app.use(express.static('public'));

const highWaterMark = 2;

app.get('/audio', async (req, res) => {
  const filepath = './audio.ogg';
  const stat = await getStat(filepath);

  res.writeHead(200, {
    'Content-Type': 'audio/ogg',
    'Content-Length': stat.size
  });

  const stream = fs.createReadStream(filepath, { highWaterMark });

  stream.on('end', () => console.log('finish'));

  stream.pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
