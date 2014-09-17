var fs = require('fs');
var csv = require("fast-csv");
var data = ("data/example.csv");

var stream = fs.createReadStream(data);
var count = {
    gmail: 0,
    yahoo: 0,
    aol: 0,
    outlook: 0,
    mailDOTcom: 0,
    hotmail: 0,
    att: 0,
    verizon: 0,
    edu: 0,
    gov: 0,
    other: 0,
    total: 0
};

var calcPercentage = function(c) {
    return (100 * (c / count.total)).toFixed(1) + '%';
}

var csvStream = csv().on("data", function(data) {
    var emailAddrDomain = data[2].toLowerCase();
    if (emailAddrDomain.indexOf("@gmail") !== -1) {
        count.gmail = count.gmail + 1;
    } else if (emailAddrDomain.indexOf("@yahoo") !== -1 || emailAddrDomain.indexOf("@ymail") !== -1) {
        count.yahoo = count.yahoo + 1;
    } else if (emailAddrDomain.indexOf("@aol") !== -1) {
        count.aol = count.aol + 1;
    } else if (emailAddrDomain.indexOf("@mail.com") !== -1) {
        count.mailDOTcom = count.mailDOTcom + 1;
    } else if (emailAddrDomain.indexOf("@hotmail") !== -1) {
        count.hotmail = count.hotmail + 1;
    } else if (emailAddrDomain.indexOf("@att") !== -1) {
        count.att = count.att + 1;
    } else if (emailAddrDomain.indexOf("@verizon") !== -1) {
        count.verizon = count.verizon + 1;
    } else if (emailAddrDomain.indexOf("@outlook") !== -1) {
        count.outlook = count.outlook + 1;
    } else if (emailAddrDomain.indexOf(".gov") !== -1) {
        count.gov = count.gov + 1;
    } else if (emailAddrDomain.indexOf(".edu") !== -1 | emailAddrDomain.indexOf("school") !== -1 | emailAddrDomain.indexOf("isd") !== -1) {
        count.edu = count.edu + 1;
    } else {
        count.other = count.other + 1;
        console.log('other source #' + count.total + ' #' + emailAddrDomain)
    }
    count.total = count.total + 1;

}).on("end", function() {
    console.dir({
        gmail: calcPercentage(count.gmail),
        yahoo: calcPercentage(count.yahoo),
        aol: calcPercentage(count.aol),
        mailDOTcom: calcPercentage(count.mailDOTcom),
        outlook: calcPercentage(count.outlook),
        hotmail: calcPercentage(count.hotmail),
        att: calcPercentage(count.att),
        verizon: calcPercentage(count.verizon),
        gov: calcPercentage(count.gov),
        edu: calcPercentage(count.edu),
        other: calcPercentage(count.other)
    });
});

stream.pipe(csvStream);