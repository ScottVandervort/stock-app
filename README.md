# StockApp

## This web application will allow the end user to ...

1. Manage a list of ticker symbols
2. View current market conditions through a line chart. 
3. View current price and percentage change of each symbol ( for the day ).
4. Manage news for ticker symbols.

## Here are some detailed requirements.

* The Application will be made up of 6 widgets - Chart, Ticker, News, Ticker_Add, Ticker_Details, News_Add.

* Devices with small viewports will display the widgets in one column. 

* Devices with larger viewports will display the widgets as two columns. 

* The "Ticker" Widget will always be the first displayed ( top and/or top-right ).

* Initially only the "Ticker" Widget will be displayed.

* The "Ticker" Widget will load symbols from Local Storage.

* Clicking on "Add" on the "Ticker" Widget will display the "Ticker_Add" in a Modal Dialog.

* Clicking "OK" on the "Ticker_Add" Modal Dialog will add the Ticker Symbol to Local Storage and display it in the "Ticker" widget.

* Clicking on a ticker symbol on the "Ticker" Widget will highlight it and display the "Chart", "Ticker_Details", and "News" for the symbol.

* The "News" widget will load news for the ticker symbol from Local Storage.

* Clicking on "Add" on the "News" Widget will display "News_Add" in a Modal Dialog.

* Clicking "OK" on the "News_Add" Modal Dialog will add the news to Local Storage and display it whenever the ticker symbol is selected.

![Mockup](https://github.com/ScottVandervort/stock-app/blob/master/mockup.png)

## Additional Notes

### 11/6/2018

#### Live Stock Data

Stock information will be fetched live from a REST API at https://www.alphavantage.co/ The service is free and it will make the application so much more useable that with static data.

The best thing is that the service appears to be CORS-enabled by default so I can call it directly from the client w/o running into cross-domain issues.

#### Generating Typescript classes from JSON

I found a cool tool that generates Typescript classes from JSON. This will come in handy as the JSON returned by https://www.alphavantage.co/ is very poorly formatted ( it's keys have spaces).

### 11/7/2018
I added a Routing Module. with the following routes :

/quote

/quote/{msft}

/quote/{msft}/details

/quote/{msft}/addNews

/quote/{msft}/addSymbol

I only want to show ticker-details, ticker-chart, and ticker-news when a quote is selected so I created a ticker-container and nested the informational components within it. When a symbol is selected from ticker-component I plan on adding it to the url as a param ( ex: msft; above ). I am using the ActivatedRoute class from the Router Module to "sniff" for the param on the url. I only display the quote-container if a symbol exists. This link was a lot of help: [Stack Overflow](https://stackoverflow.com/questions/45309131/angular-2-4-how-to-get-route-parameters-in-app-component)

### 11/08/2018
Persistance to local storage is going to be managed by a Service. 

#### Setting up Debugging in Visual Studio Code

I Added configuration/tasks for running/debugging an Angular application in Visual Studio Code. Microsoft has some nice "recipes" for configuring Visual Studio Code. You can check out the recipe link [here][vs-code Recipes](https://github.com/Microsoft/vscode-recipes/tree/master/Angular-CLI)

Debugging in Visual Studio Code is nice because it automatically maps the stuff that is running in the browser ( ES5 ) with your soruce code ( Typescript / ES6 ). This way you can debug your soruce code directy - not the stuff transpiled by Webpack/Babble. It's also nice to be able to write and debug within the same IDE and not have to switch back and forth from Chrome to Visual Studio Code.

After following the recipes to add the suggested Configurations and Tasks. 

You will need to run "npm start" from the terminal and then run the "ng serve" configuration to debug the application.

You will need to run "npm run test" from the terminal and then run the "ng test" configuration to debug the application.

### 11/09/2018 

#### Angular Routing Module Caused AppComponent Test to Fail.

After implementing Routing and migrating it to a Module I kept getting an error when running my unit tests for the root Component ( appComponent ): "Please provide a value for the APP_BASE_HREF token or add a base element to the document."

Strangely, the error was NOT occuring at runtime. 

To fix the error I followed [these instructions on the Angular website](https://angular.io/api/common/APP_BASE_HREF). The router needs to know which "base url" to use when navigating your routes.

# Angular Seed

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
