const request = require("request");
const cheerio = require("cheerio");
const XLSX=require('xlsx');
const fs=require('fs');

const url = 'https://www.moneycontrol.com/';

request(url, cb);
function cb(error, response, html) {
    if (error) {
        console.error('error:', error); // Print the error if one occurred
    } else {
        extractHTML(html); // yaha pe extractor function call hua h
    }
};

const workbook=XLSX.readFile("stockprices.xlsx");

let sheet=workbook.Sheets["stock"];
//console.log(sheet);
let data=XLSX.utils.sheet_to_json(sheet);
//console.log(data);

workbook.data.push({
    'COMPANY NAME':'abs',
    'PRICES':86,
    'CHANGE':'78',
    'PERCENTAGE':78
});

function extractHTML(html){
    let selectorTool=cheerio.load(html);
    let gainArr=selectorTool('.MT15 #tgNifty .rhsglTbl');
    let lossArr=selectorTool('.MT15 #tlNifty .rhsglTbl');
    //console.log(lossArr.length);
    //console.log(headArr);

     //console.log(selectorTool(headArr).html());
    let gaincompanies=selectorTool(gainArr[0]).find('tbody>tr');
   // console.log(companies.length);

   for(let j=0;j<gaincompanies.length;j++){

    let colOfEachCompany=selectorTool(gaincompanies[j]).find('td');
    //console.log(colOfEachCompany.length);

     let companyName=selectorTool(colOfEachCompany[0]).text();
     let prices=selectorTool(colOfEachCompany[1]).text();
     let change=selectorTool(colOfEachCompany[2]).text();
     let gainPercentage=selectorTool(colOfEachCompany[3]).text();
     
     //console.log(companyName);
     
     //console.log(companyName +"--------"+ prices+"-------"+change+"------"+gainPercentage);

      


   }

  // console.log('\n');

   let losscompanies=selectorTool(lossArr[0]).find('tbody>tr');
   for(let j=0;j<losscompanies.length;j++){
        let colOfEachCompanyLoss=selectorTool(losscompanies[j]).find('td');
        //console.log(colOfEachCompanyLoss.length);

     let companyName=selectorTool(colOfEachCompanyLoss[0]).text();
     let prices=selectorTool(colOfEachCompanyLoss[1]).text();
     let change=selectorTool(colOfEachCompanyLoss[2]).text();
     let lossPercentage=selectorTool(colOfEachCompanyLoss[3]).text();

     //console.log(companyName +"--------"+ prices+"-------"+change+"------"+lossPercentage);


   }
}

//console.log(workbook.SheetNames);