require('dotenv').config({ path: 'env file path' })
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

const path = require("path")
const SECRET = process.env.SECRET || "strafe panda blinds cool man hame fool haha frame"

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', MONGO_URI => console.log('Connected to Database'))

const port = process.env.PORT || 5000;
        
        app.use('/auth', require('./routes/authRouter.js'))
        
        // gatekeeper 
        app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms:['HS256'] }))
        app.use('/api/issues', require('./routes/issueRouter.js'))
        
        app.use((err, req, res, next) => {
            console.log(err)
            if(err.name === "UnauthorizedError"){
                res.status(err.status)
            }
            return res.send({ errMsg: err.message })
        })
        
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "client", "build", "index.html"));
        });
        
        app.listen(port, () => {
    console.log(`Server is running on local port ${port}`)
})