/* const { app } = require('../index');

const { route } =  app; */

const request = require('request-promise');
const { Router } = require('express');
const cheerioModule = require('cheerio');

const api =  Router();

api.get('/scrap', async (req, res) => {
    const { busqueda } = req.query;
    console.log(busqueda);
    const scrap = await scrapper(busqueda);
    res.json(scrap);
});

module.exports = api;



const scrapper = async (find) => {
    try {
        const $ = await request({
            uri: `https://www.milanuncios.com/anuncios/${find}.htm?fromSearch=1&fromSuggester=0&suggestionUsed=0`,
            transform: body => cheerioModule.load(body)
        })
        // console.log($.html());
        // const bodyApp = $('.app');
        const anunciosEncontrados = $('.ma-ContentListing-totalSummary').text();
        const arr = [];
        
        // console.log($('.ma-AdList').html());
        /* const articles = $('AdList');
        const lists = await listArticles(articles, $); */

        await $('article').each(async (i, element) => {
            arr.push({
                title: $(element).find('.ma-AdCard-detail .ma-AdCard-title .ma-AdCard-title-text').text(),
                description: $(element).find('.ma-AdCard-detail .ma-AdCardDescription .ma-AdCardDescription-text').text()
            });
        });
        
        return {
            anunciosEncontrados,
            articulos: arr
        };


    } catch (error) {
        return error;
    }
}
