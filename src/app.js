//core modules
const path = require('path')

//npm modules
const express = require('express')
const hbs = require('hbs')


//hbs setup pathnames
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//custom functions import 
const getWeather =require('./apiCalls').getWeather

//const html files 
const publicDirectoryPath = path.join(__dirname, '../public')


const app = express()

//setup HBS 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
  res.render('index',{title:'Home',name:'Dins'})
})

//app.com/weather
app.get('/weather', async (req,res)=>{

  if(!req.query.address){
    return res.send({
      error:'You must provide address'
    })
  }

  //wait for response from getWeather call
  const response = await getWeather(req.query.address)
  //if error return error
  if(response.error){
    return res.send(response)
  }
  //success send this small response!!!!
  res.send({
    forecast: response.current.temp_c,
    location: `${response.city},${response.country}`,
    address: req.query.address
  })
})
//app.com/about
app.get('/about',(req,res)=>{
  res.render('about',{title:'About',name:'Dins'})
})

//app.com/help
app.get('/help',(req,res)=>{
  res.render('help',{name:'Dins',title:'Help'})
})

//app.com/help/undefined
app.get('/help/*',(req,res)=>{
  res.render('404',{message:'Help article does not exist!',name:'Dins'})
})

//app.com/undefined
app.get('*',(req,res)=>{
  res.render('404',{title:'404!',message:'The page you are looking for,Doesn\'t exist please try valid page',name:'Dins'})
})

app.listen(3000,()=>{
  console.log('server is running!');
  
})