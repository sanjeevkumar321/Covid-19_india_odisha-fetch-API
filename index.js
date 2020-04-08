const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const request = require('request');
const cheerio = require("cheerio");

app.get('/india', (req, res) =>
request("https://www.mohfw.gov.in/", function (error, response, body) {
    if (error) {
        res.send(response.statusCode);
    }
    var india = {};
    var $ = cheerio.load(body);
    india.Name="India";
    india.Active_Cases= $("#site-dashboard > div > div > div > div > ul > li.bg-blue > strong").text();
    india.Cured_Discharged  = $("#site-dashboard > div > div > div > div > ul > li.bg-green > strong").text();
    india.Deaths= $("#site-dashboard > div > div > div > div > ul > li.bg-red > strong").text();
    india.Migrated = $("#site-dashboard > div > div > div > div > ul > li.bg-orange > strong").text();
    india.Time=$("#site-dashboard > div > div > div > div > div > h2 > span").text();
	res.json(india);
   
})

    

),
app.get('/odisha', (req, res) =>
request("https://www.mohfw.gov.in/", function (error, response, body) {
    if (error) {
        res.send(response.statusCode);
    }
    var odisha = {};
    var $ = cheerio.load(body);
    odisha.Name="Odisha";
    odisha.Total_Confirmed = $("#state-data > div > div > div > div > table > tbody > tr:nth-child(22) > td:nth-child(3)").text();
    odisha.Cured_Discharged_Migrated = $("#state-data > div > div > div > div > table > tbody > tr:nth-child(22) > td:nth-child(4)").text();
    odisha.Death = $("#state-data > div > div > div > div > table > tbody > tr:nth-child(22) > td:nth-child(5)").text();

    
	res.json(odisha);


   
})

    

);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))