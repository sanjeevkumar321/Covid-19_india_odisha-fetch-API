const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const request = require('request');
const cheerio = require("cheerio");

app.get('/india', (req, res) =>
request("https://www.mygov.in/covid-19/?cbps=1", function (error, response, body) {
    if (error) {
        res.send(response.statusCode);
    }
    var india = {};
    var $ = cheerio.load(body);
    india.Name="India";
    india.Active_Cases= $("#\\#dashboard > div.iblock.active-case > div > span").text();
    india.Cured_Discharged  = $("#\\#dashboard > div.iblock.discharge > div > span").text();
    india.Deaths= $("#\\#dashboard > div.iblock.death_case > div > span").text();
    india.Migrated = $("#\\#dashboard > div.iblock.migared_case > div > span").text();
   
	res.json(india);
   
})

    

),
app.get('/odisha', (req, res) =>
request("https://www.mygov.in/corona-data/covid19-statewise-status", function (error, response, body) {
    if (error) {
        res.send(response.statusCode);
    }
    var odisha = {};
    var $ = cheerio.load(body);
    odisha.Name="Odisha";
    odisha.Total_Confirmed = $("#node-287111 > div > div.field-collection-container.clearfix > div > div.field-items > div:nth-child(19) > div > div > div > div.field.field-name-field-total-confirmed-indians.field-type-number-integer.field-label-above > div.field-items > div").text();
    odisha.Cured_Discharged_Migrated = $("#node-287111 > div > div.field-collection-container.clearfix > div > div.field-items > div:nth-child(19) > div > div > div > div.field.field-name-field-cured.field-type-number-integer.field-label-above > div.field-items > div").text();
    odisha.Death = $("#node-287111 > div > div.field-collection-container.clearfix > div > div.field-items > div:nth-child(19) > div > div > div > div.field.field-name-field-deaths.field-type-number-integer.field-label-above > div.field-items > div").text();

    
	res.json(odisha);


   
})

    

);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))