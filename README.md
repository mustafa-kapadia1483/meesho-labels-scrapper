<!-- Please update value in the {}  -->

<h1 align="center">Meesho Label Scrapper</h1>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Built With](#built-with)
- [How To Use](#how-to-use)
- [Contact](#contact)

<!-- OVERVIEW -->

## Features

This Script will help you:

- Scrape Shipping Details like Shipper Name & Awb Number from Labels generated by Meesho
- Further it also scrapes Product Name & Order ID
- The Scraped Data is the added to Google Sheet for easy tracking and updates

This helps easily track all the shipped orders for Meesho in one place.

## Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [NodeJS](https://nodejs.org/en/)
- [pdf2json](https://www.npmjs.com/package/pdf2json)
- [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet)

## How To Use

<!-- Example:  -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/mustafa-kapadia1483/meesho-labels-scrapper

# Install dependencies
$ npm install

# Create a folder labels in the main directory
# Add daily generated labels to that folder by renaming them to labels_combined
# Create .env file, add your Google Sheet ID
GOOGLE_SHEETS_ID="your-google-sheet-id"

# From Google Console Create Service Account and create json key, rename json key to secrets.json and place that file in the main directory

# Run the app
$ node index.js
```

## Contact

- Website [mustafak.dev](https://mustafak.dev)
- GitHub [@mustafa-kapadia1483](https://github.com/mustafa-kapadia1483)