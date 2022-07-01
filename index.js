const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT || 3023

/* 
    Incase you are using mongodb atlas database uncomment below line
    and replace "mongoAtlasUri" with your mongodb atlas uri.
*/
// mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true})

app.get('/', (req, res) => {
  const challenge = req.query['hub.challenge'];
  const verify_token = req.query['hub.verify_token'];
  
  if (verify_token === process.env.FACEBOOK_VERIFICATION_TOKEN) {
    return res.send(challenge);
  }
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
