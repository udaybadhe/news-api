const PORT = 8000;
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const url = 'https://www.theguardian.com/international'
axios(url).then(response =>{
	const html = response.data;
	const filter = cheerio.load(html);
	const articles = [];
	var i = 0;
	filter('.fc-item__title' ,html).each(function(){
		const title = filter(this).text();
		//const url = filter(this).find('a').attr('href');
		articles.push({title,url})
	})
	app.get('/',(req,res)=>{
		res.send('Welcome to News Fetch api');
	})
	app.get('/articles',(req,res)=>{
		res.send(articles);
	})
})
app.listen(PORT ,()=>console.log(`server is running on PORT ${PORT}`))
