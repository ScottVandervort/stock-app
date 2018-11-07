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

![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)

## Stock Data

Stock information will be fetched live from a REST API at https://www.alphavantage.co/ The service is free and it will make the application so much more useable that with static data.

## Additional Notes

I found a cool tool that generates Typescript classes from JSON. This will come in handy as the JSON returned by https://www.alphavantage.co/ has 

## Angular Seed

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
