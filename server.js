const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();
const { auth, requiresAuth} = require('express-openid-connect');

let ticketsCollection;

const port = process.env.Port || 3000

MongoClient.connect('mongodb+srv://capstonebuddies:capstonegroup@cluster0.jmk06.mongodb.net/ticket-tracker-db?retryWrites=true&w=majority', {
    useUnifiedTopology: true
}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('ticket-tracker-db')
    ticketsCollection = db.collection('tickets')
    //see if you can make it for another collection

})

app.set('view engine', 'ejs')

   auth({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.issuer_base_url,
        baseURL: process.env.base_url,
        clientID: process.env.client_id,
        secret: process.env.secret

   })//may need to change
  
app.use(express.urlencoded({ extended: false }))



app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

app.get('/',requiresAuth(),(req, res) => {
    res.send(JSON.stringify(req.oidc.user))
})


app.get('/create', (req, res) => {
  ticketsCollection.find().toArray()
      .then(results => {
          res.render('createForm', { tickets: results })
      })
      .catch(error => console.error(error))
})


app.post('/create', (req, res) => {
  ticketsCollection.insertOne(req.body)
      .then(result => {
          //sends back to ticket page
          res.render('createForm');
      })
      .catch(error => console.error(error))
})



app.get('/tickets', (req, res) => {
    ticketsCollection.find().toArray()
        .then(results => {
            res.render('tickets', { tickets: results })
        })
        .catch(error => console.error(error))
})


app.post('/tickets', (req, res) => {
    ticketsCollection.insertOne(req.body)
        .then(result => {
            //sends back to ticket page
            res.render('tickets');
        })
        .catch(error => console.error(error))
})


app.delete('/tickets', (req, res) => {
    ticketsCollection.deleteOne({ _id: ObjectID(req.body.id)})
    .then(results => {
    res.redirect('/');
    })
    .catch(error => console.error(error))
   })
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})