const express = require('express')
const app = express()
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 3023

app.use(express.json({
  verify: (req, res, buf) => {
      req.rawBody = buf
  }
}));

const crypto = require('crypto');

/* 
    Incase you are using mongodb atlas database uncomment below line
    and replace "mongoAtlasUri" with your mongodb atlas uri.
*/
// mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true})

app.get('/webhook', (req, res) => {
  const challenge = req.query['hub.challenge'];
  const verify_token = req.query['hub.verify_token'];
  
  if (verify_token === process.env.FACEBOOK_VERIFICATION_TOKEN) {
    return res.send(challenge);
  }
  res.send('Hello World!');
})

app.post('/webhook', (req, res) => {
  console.log("headers", req.headers);
  console.log("body");
  console.dir(req.body, {depth: null});
  console.log("rawBody", req.rawBody)
  const calculatedChecksum = crypto.createHmac('sha1', process.env.APP_SECRET)
                            .update(req.rawBody)
                            .digest('hex');
  console.log({calculatedChecksum})

  const calculatedChecksum256 = crypto.createHmac('sha256', process.env.APP_SECRET)
                              .update(req.rawBody)
                              .digest('hex');
  console.log({calculatedChecksum256})


  var buf = Buffer.from(JSON.stringify(req.body));
  const calculatedChecksumBuf = crypto.createHmac('sha256', process.env.APP_SECRET)
                                  .update(buf)
                                  .digest('hex');
  console.log(calculatedChecksumBuf);

  res.status(200).send('Ok!');
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
