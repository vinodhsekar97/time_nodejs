const fs = require('fs');
const path = require('path')
const express = require('express');

const app = express();
var port=3000;
let server = app.listen(port, function() {
      console.log(`App listening at PORT ${port}`);
});

app.get('/', (req, res) => {
    let today = new Date();
    let fileName="";
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let time = today.getHours() + "-" + today.getMinutes();
    fileName += `${date}(${time})`;
    fs.writeFile(`${fileName}.txt`, `Created at ${today}`, 'utf8', (err) => {
        if (err) throw err;
        res.send("Date File created");
    })
});
app.get('/files', (req, res) => {
    let files = [];
    fs.readdir('D:\GUVI ASSIGNMENTS\nodejs\TAsk1', (err, data) => {
        if (err) throw err;
        data.forEach((item) => {
            if (String(path.extname(item)) === '.txt') {
                files.push(item);
            }
        })
        res.json(files);
    })
});