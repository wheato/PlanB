"use strict";

module.exports = function (url) {
  var isTaobao = /e22a\.com/.test(url),
      isTmall = /tmall\.com/.test(url),
      isAmazon = /z\.cn/.test(url) || /amazon\.cn/.test(url),
      isJd = /jd\.com/.test(url);

  if(isTaobao){
    return 'taobao';
  } else if(isTmall){
    return 'tmall';
  } else if(isJd){
    return 'jd';
  } else if(isAmazon){
    return 'amazon';
  }
}
