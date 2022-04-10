const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const newspapers = [
    {
        name: "guardian",
        address: "https://www.theguardian.com/"
    }, 
    {
        name: "nyt",
        address: "https://www.nytimes.com/"
    }
];

const articles = [];

newspapers.forEach(newspaper => {
    axios.get(newspaper.address).then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        $('a:contains("Covid")', html).each(function() {
            const title = $(this).text();
            const url = $(this).attr('href');
            articles.push({
                title,
                url,
                source: newspaper.name
            });
        });
    });
});

app.get('/', (req, res) => {
    res.json("Welcome to our template API. JOE MOMMA");
});

app.get('/news', (req, res) => {
    res.json(articles);
});

app.listen(PORT, () => console.log("Connected on port: ", PORT));