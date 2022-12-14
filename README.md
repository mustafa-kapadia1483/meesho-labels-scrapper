<!-- Please update value in the {}  -->

<h1 align="center">Meesho Label Scrapper</h1>

![image](https://user-images.githubusercontent.com/60058032/195938359-ddf7f8f6-8195-49a2-bfcd-610d804f320c.png)

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
- [Electron](https://www.electronjs.org/)
- [Electron Forge](https://www.electronforge.io/)
- [pdf2json](https://www.npmjs.com/package/pdf2json)
- [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet)

## How To Use

<!-- Example:  -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

Clone this repository

```bash
git clone https://github.com/mustafa-kapadia1483/meesho-labels-scrapper
```

Install dependencies

```bash
npm install
```

From Google Console Create Service Account and create json key for Google Sheets API, rename json key to secrets.json and place that file in the main directory (outside src folder)

Run the app

```bash
npm start
```

Build Distributable

```bash
npm make
```

## Contact

- Website [mustafak.dev](https://mustafak.dev)
- GitHub [@mustafa-kapadia1483](https://github.com/mustafa-kapadia1483)
- LinkedIn [Mustafa Kapadia](https://www.linkedin.com/in/mustafa-kapadia/)
