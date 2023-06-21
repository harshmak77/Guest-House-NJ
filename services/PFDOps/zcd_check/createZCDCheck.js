'use strict';
// Define font files
const fs = require('fs');
const PdfPrinter = require('pdfmake');
const q = require('q');
const {
    createDocDef
} = require('./zcdcheck_defination');
const path = require('path');

const fonts = {
    Roboto: {
        normal: path.join(__dirname, '/fonts/Roboto/Roboto-Regular.ttf'),
        bold: path.join(__dirname, './fonts/Roboto/Roboto-Medium.ttf'),
        italics: path.join(__dirname, './fonts/Roboto/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, './fonts/Roboto/Roboto-MediumItalic.ttf')
    }
};
const printer = new PdfPrinter(fonts);

function createPDF(content) {
    let promiseQ = q.defer();
    try {
        console.log(path.join(__dirname, '/fonts/Roboto/Roboto-Regular.ttf'))
        createDocDef(content)
            .then(documentDefination => {
                return generatePDFFile(documentDefination)
            }).then(fileBuffer => {
                console.log(fileBuffer);
                promiseQ.resolve(fileBuffer);
            }).catch(error => {
                console.log(error);
                promiseQ.reject(error);
            })
    } catch (error) {
        console.log(error);
        promiseQ.reject(error);
    }
    return promiseQ.promise;
}

// Generate pdf with generated data
async function generatePDFFile(documentDefination) {
    let promiseQ = q.defer();
    try {
        // console.log(fonts);

        const options = {
            pageOrientation: 'landscape'
        }
        let pdfDoc = printer.createPdfKitDocument(documentDefination, options);
        // pdfDoc.pipe(fs.createWriteStream('document1.pdf'));
        pdfDoc.end();
        let buffers = [];
        let pdfData;
        // Generate buffers and stream using listaener
        await pdfDoc.on('data', (buffer) => {
            buffers.push(buffer);
        });
        await pdfDoc.on('end', () => {
            pdfData = Buffer.concat(buffers);
            promiseQ.resolve(pdfData);
            console.log(pdfData)
        })
        
    } catch (error) {
        console.log(error);
        promiseQ.reject(error);
    }
    return promiseQ.promise;
}

function createData(pdfDoc) {
    let promiseQ = q.defer();
    try {
        pdfDoc.on('data', (buffer) => {
            buffers.push(buffer);
            promiseQ.resolve(pdfData);
        });
    } catch (error) {
        console.log(error);
        promiseQ.reject(error);
    }
    return promiseQ.promise;
}

function createBuffer(pdfDoc) {
    let promiseQ = q.defer();
    try {
        pdfDoc.on('end', () => {
            pdfData = Buffer.concat(buffers);
            promiseQ.resolve(pdfData);
        })
    } catch (error) {
        console.log(error);
        promiseQ.reject(error);
    }
    return promiseQ.promise;
}
module.exports.createPDF = createPDF;