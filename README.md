# Blogger Scraper v1.0
A basic Node.js script for scraping links to every post of a Google Blogger website.

Some Blogger themes have horrible UI/UX that require you to click "Older Posts" repeatedly if you want to see the
oldest post on a blog and read from the beginning. This script uses the native Blogger API to generate an HTML document with every post dumped into a neat page.

You'll need to generate an API key from Google's documentation website https://developers.google.com/blogger/docs/3.0/using

Once you've cloned the repo and have a key, simply run the following command:
```
node blogger.js --url BLOGGER_URL_HERE --apiKey API_KEY_HERE
```
Be warned that sites with a lot of posts may take a while.