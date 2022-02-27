const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const puppeteer = require('puppeteer');


app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.PORT;
const chromeOptions = {
    headless:true,
    defaultViewport: null,
    // slowMo:10
  };

app.get('/', (req, res) => {
  res.send('wow')
})

app.get('/:id', async(req, res) => {
    var myid = req.params.id;
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    console.log('This bot will run times')
    await page.goto('https://www.midasbuy.com/midasbuy/sa/buy/pubgm');
 
 await page.waitForTimeout(2000)
 await page.focus(".input"); 
 // await page.$eval('input[type=text]', el => el.value = 'X');
 await page.type('input[type=text]', myid, {delay: 30})
    // await page.evaluate((data) => {
    //     document.querySelector('.input').value = data
    // }, myid);
    // await page.$eval('.input', el => el.value = myid);
    // await page.evaluateOnNewDocument((data) => {
    //     window.TestMe = {};
    //     window.TestMe.data = data;
    //     document.querySelector('.input').value = 'data'
    //   }, myid);
    // await page.$eval('.input', (el, value) => {
    //     alert(myid)
    //     el.value = value
    // }, myid);
     
    await page.waitForTimeout(2000)
    // 
    await page.keyboard.press('Enter'); // Enter Key
    await page.waitForTimeout(2000)
    // let element = await page.$('')
    // let value = await page.evaluate(el => el.textContent, element)
    const spanVal =  await page.$eval('.val', el => el.innerText);

// console.log(spanVal); // test

    res.send(
        spanVal
    )
  })


app.listen(port, () => {
    console.log('connectrd')
})