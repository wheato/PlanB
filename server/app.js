"use strict";

const http = require('http'),
      formidable = require('formidable'),
      form = new formidable.IncomingForm(),
      is = require('./is.js'),
      htmlParse = require('./parse.js');

function server(req, res) {
  var api_name = req.url,
      p_url,
      resData = {};

  console.log(`当前访问路径 =》${req.url}`);

  if(api_name == '/parse' || req.method == 'POST'){

    res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});

    function send(code, msg, data){
      resData.code = code;
      resData.msg = msg;
      resData.data = data;
      res.end(JSON.stringify(resData));
    }

    /*
      0     成功
      10001 缺少参数
      10002 其他平台
      10003 远程数据请求错误
    */
    form.parse(req, (err, fields) => {
      p_url = fields.url ? decodeURIComponent(fields.url).trim() : '';

      if(!p_url){ //当url参数为空或者不存在时

        console.log("url 参数为空");

        send(10001, '缺少参数', {})

      } else {

        console.log(`当前url参数为： ${p_url}`);

        htmlParse.fetchData(p_url, function (err, platform, data){
          if(err){
            send(10003, '远程数据请求错误', {});
          }
          if(platform){

            send(0, platform, data);

          } else {

            send(10002, '其他平台', {});

          }
        });

      }

    });
  } else {
    res.end('hello PlanB!');
  }
}

http.createServer(server).listen(8668);

console.log('Sever start at "http://localhost:8668/"');
