const express = require('express');
const hbs = require('hbs');
const fs= require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});


// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})


// handler mapping
app.get('/',(request,response)=>{
    response.render('home.hbs',{
        pageTitle:'Sample Node Application',        
        welcomeMessage:'Welcome to my home page'
    });
    
});

app.get('/about',(req,response)=>{
    response.render('about.hbs',{
        pageTitle:'About Node'
    }
        )
    });


app.get('/projects',(req,response)=>{
    response.render('projects.hbs',{
        pageTitle:'Portfolio Page'
    }
        )
    });

app.get('/bad',(req,res)=>{
    res.send({ err:'Request cannot be processed'});
})

app.listen(port,()=>{
    console.log(`Server is up on port: ${port}`);
});