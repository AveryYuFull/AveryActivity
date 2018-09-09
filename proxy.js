//rule scheme :

var http = require('http');
var fs = require('fs');
var ip = require('ip');
var child = require('child_process')
console.log(ip.address())

module.exports = {
  summary: 'my customized rule for AnyProxy',  
  // replaceRequestOption: function (req, option) {
  //   //replace request towards http://www.taobao.com
  //   //                     to http://www.taobao.com/about/

  //   /*
  //   option scheme:
  //   {
  //       hostname : "www.taobao.com"
  //       port     : 80
  //       path     : "/"
  //       method   : "GET"
  //       headers  : {cookie:""}
  //   }
  //   */

  //   console.log(22222, option.path)
  //   if (option.path.indexOf('/list.html') > -1) {
  //     option.port = 3000;
  //     option.hostname = ip.address();
  //     option.path = '/index.html';
  //     console.log(123456, option)
  //   } else if (option.path === '/react/lib/react-dom.15.4.2.js') {
  //     option.path = '/react/lib/react-dom.15.4.2.min.js'
  //   } else if (/static\//.test(option.path)) {
  //     option.port = 3000;
  //     option.hostname = ip.address();
  //     option.path = option.path.replace(/.+?(\/static\/.+\/)(.+?)\..+?\.(.+)/, '$1$2.$3');
  //   }

  //   console.log(option.path)
  //   // if(/\/static\//.test(option.path) &&
  //   //     (option.path.indexOf('.js') > -1 || option.path.indexOf('.css') > -1 || option.path.indexOf('.html') > -1)
  //   // ){
  //   //      option.port = 5000;
  //   //      option.hostname = ip.address();
  //   //  }
  //   return option;
  // },
  replaceResponseHeader: function (req, res, header) {
    header = header || {};
    header["Cache-Control"] = "no-cache, no-store, must-revalidate";
    header["Pragma"] = "no-cache";
    header["Expires"] = 0;

    return header;
  },
  replaceServerResDataAsync: function (req, res, serverResData, callback) {
    //append "hello world" to all web pages

    //for those non-unicode response , serverResData.toString() should not be your first choice.
    //this issue may help you understanding how to modify an non-unicode response: https://github.com/alibaba/anyproxy/issues/20
    var address = ip.address()
    console.log(2143143, address)
    if (/html/i.test(res.headers['content-type']) && /staticpage|react/i.test(req.url)) {
      // var newDataStr = serverResData.toString();
      // newDataStr += "hello world!";
      var newDataStr = child.execSync(`curl http://${address}:8080`).toString().replace(/<script[^<]+?src="(\/\w[^"]+?)".+?<\/script>/g, function (item0, item1) {
        var url = `http://${address}:8080${item1}`
        var content = child.execSync(`curl ${url}`).toString()
        return `<script>${content}</script>`
      }).replace(/<link[^<]+?href="(\/\w[^"]+?)".*?>/g, function (item0, item1) {
        var url = `http://${address}:8080${item1}`
        var content = child.execSync(`curl ${url}`).toString()
        return `<style>${content}</style>`
      })
      callback(newDataStr);
    } else {
      callback(serverResData);
    }

  }
};
