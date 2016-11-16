"use strict";

const is = require('./is.js');
const url = require('url');
const querystring = require('querystring');
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

var handlers = {
  'taobao': function (html){
    html = iconv.decode(html, 'utf8');

  },
  'jd': function (html){
    html = iconv.decode(html, 'utf8');

    const $ = cheerio.load(html);
    const title = $('#goodName').attr('value')
    const price = $('#jdPrice').attr('value');

    return {
      'title': title,
      'price': price,
    }
  },
  'tmall': function (html){

  },
  'amazon': function (html){

  },

};

function getData(platform, url, cb) {
  request.get({
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2725.0 Safari/537.36'
    },
    gzip: true,
    encoding: null
  }, (err, res, body) => {
    if(err){
      cb && cb(err, {});
    }
    var data = handlers[platform](body);
    data.url = url;
    cb && cb(null, data);
  });
}

exports.fetchData = function (url, cb){

  var platform = is(url);

  if(platform){
    getData(platform, url, function(err, data){
        cb && cb(err, platform, data);
    });
  } else {
    cb && cb(null, platform, {});
  }


};
