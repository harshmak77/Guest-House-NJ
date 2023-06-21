// let ejs = require("ejs");
// let pdf = require("html-pdf");
// let path = require("path");
// const _ = require('underscore');
// const successCodeJson = require('../../utils/successHandling/successCode.json');
// var phantomjs = require('phantomjs-prebuilt');

// function createPDF(payload) {
//     return new Promise((resolve, reject) => {
//         try {
            
//             ejs.renderFile(path.resolve("./template/template_ztrchk.ejs"), {payload: payload}, (error, data) => {
//                 if (error) {
//                     console.log(error);
//                     reject(error);
//                 } else {
//                     console.log(phantomjs.path);

//                     let options = {
//                         "phantomPath": phantomjs.path,
//                         "header": {
//                             "height": "5mm"
//                         },
//                         "footer": {
//                             "height": "20mm",
//                         },
//                         "orientation": "landscape"
//                     };
//                     let now = new Date();
//                     var logfile_name = './reports/ZCDCHECK_' + now.getFullYear() + "-"+ (now.getMonth()+1) + "-" + now.getDate() + "-" + now.getTime() +'.pdf'
//                     pdf.create(data, options).toFile(path.resolve(logfile_name), function (error, data) {
//                         if (error) {
//                             console.log(error);
//                             reject(error);
//                         } else {
//                             console.log(data)
//                             resolve(data);
//                         }
//                     });
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//             reject(error);
//         }
//     });
// }

// module.exports.createPDF = createPDF;