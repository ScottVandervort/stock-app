# StockApp

## This web application will allow the end user to ...

1. Manage a list of ticker symbols
2. View current market conditions through a line chart. 
3. View current price and percentage change of each symbol ( for the day ).
4. Manage news for ticker symbols.

## Here are some detailed requirements.

* The Application will be made up of 6 widgets - Navigation, Chart, Ticker, News, Ticker_Add, Ticker_Details, News_Add.

* Devices with small viewports will display the widgets in one column. 

* Devices with larger viewports will display the widgets as two columns. 

* The "Ticker" Widget will always be the first displayed ( top and/or top-right ).

* Initially only the "Ticker" Widget will be displayed. 

* The "Ticker" Widget will load symbols from Local Storage.

* Clicking on "Add" on the "Navigation" Widget will display the "Ticker_Add" in a Modal Dialog.

* Clicking "OK" on the "Ticker_Add" Modal Dialog will add the Ticker Symbol to Local Storage and display it in the "Ticker" widget.

* Clicking on a ticker symbol on the "Ticker" Widget will display the "Chart", "Ticker_Details", and "News" for the symbol.

* The "News" widget will load news for the ticker symbol from Local Storage.

* Clicking on "Add" on the "Navigation" Widget will display "News_Add" in a Modal Dialog.

* Clicking "OK" on the "News_Add" Modal Dialog will add the news to Local Storage and display it whenever the ticker symbol is selected.

![Mockup](https://github.com/ScottVandervort/stock-app/blob/master/mockup.png)

## Additional Notes

### 11/6/2018

#### Live Stock Data

Stock information will be fetched live from a REST API at https://www.alphavantage.co/ The service is free and it will make the application so much more useable that with static data.

The best thing is that the service appears to be CORS-enabled by default so I can call it directly from the client w/o running into cross-domain issues.

#### Generating Typescript classes from JSON

I found a cool [tool](http://json2ts.com/) that generates Typescript classes from JSON. This will come in handy as the JSON returned by https://www.alphavantage.co/ is very poorly formatted ( it's keys have spaces).

### 11/7/2018
I added a Routing Module. with the following routes :

    const appRoutes: Routes = [
    { path: '', component: TickerComponent },   
    { path: 'addSymbol', component: TickerAddComponent },
    { path: 'details/:id', component: TickerContainerComponent,
        children:[       
        { path: 'addNews', component: TickerNewsAddComponent},       
        ] 
    }      
    ];

I only want to show the ticker's details, chart, and news when a quote is selected so I created a container ( TickerContainerComponent ) and nested the informational components within it ( TickerChartComponent, TickerDetailsComponent, and TickerNewsComponent). 

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

### 11/11/2018 

I am using Bootstrap for my layout. Boostrap makes it eas(ier) to create a responsive layout - although CSS Flexbox and CSS Grid are giving it a run for its money.  You can use Bootstrap just to render your layout ( .css-only ). You can also use its library of widgets ( autocomplete, modal dialog, accordiaon, etc ). The later uses JQuery by default. JQuery w/ ANgualr is generally considered bad form ( more on this in a sec' ). Fortunately, there is [also a Angular-native library](https://ng-bootstrap.github.io/#/home) that you can use as well.

To install Boostrap ( latest; or, 4 ) run this: "npm install --save bootstrap"

And then add this to the following files:

    "styles": [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "src/styles.css"
    ],
    [angular.json]

    @import '~bootstrap/dist/css/bootstrap.min.css';
    [styles.css]

Installing Boostrap like this means that the Bootstrap .css will by packaged into your application by Webpack. A more performant way of doing this would be through a CDN.            

#### What is a CDN
A CDN is a "Content Delivery Network". It's a shared repository of common libraries - in this case .css and .js files. For a minor performance gain you might opt to reference boostrap .css and .js files from a common CDN such as [CDNJS](https://cdnjs.com/libraries/twitter-bootstrap). Te benefit of this is that the resources will be cached by the web browser. This means that ANY web application utilizing the same resources will pull from the browser's cache instead of fetching it. So, if the end-user visisted another site that required the SAME resources first prior to visiting your site the resources would be fetched directly from the browser's cache.

#### Bootstrap Widgets
Bootstrap generally requires JQuery for it's collection of widgets ( datepicker, accordian, modal, etc...). Combining JQuery and Angular is generally a non-no: It's generally bad to manipulate the DOM directly within an Angualr application. Yes, it can be done - but generally if you don't have to you shouldn't. Fortunatley, there is a fork of of Bootstrap that can be used that does require JQuery : [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/)

To install ng-bootstrap run thos: "npm install --save @ng-bootstrap/ng-bootstrap"

Then you need to modify your application module by importing the proper libraries :

    import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
    
    ...
    
    imports: [
        ...
        NgbModule  
    ],    
    [app.module.ts]    

### 11/12/2018     

#### A Configurable Navigation Bar
I want to modify my navigation bar based upon the route. Specifically, I only want to display "Add News" in NavigationComponent if TickerContainerComponent has been routed to ( i.e., if the active URL is "details/[msft]" ). Furthermore, the route specified for "Add News" in the NavigationComponent needs to specify the selected ticker symbol, so "details/[msft]/addNews".

If NavigationComponent and TickerContainerComponent had a direct parent/child relationship I could use @input properties to communicate between them. The problem is there is no direct relationship due to the routing. A more robust ( and probably less fragile ) solution is to use a service to share the state between the two components. 

I created a NavigationService to manage the navigation items. The NavigationService is injected into TickerContainerComponent and NavigationComponent. The TickerContainerComponent updates the Service with the selected id ( i.e., ticker ) and the Service in turn updates NavigationComponent.
 
NavigationService :

    import { Injectable } from '@angular/core';

    @Injectable({
    providedIn: 'root'
    })
    export class NavigationService {

        isAddNewsVisible : boolean = false;
        ticker : string = null;

        constructor() {}

        toggleAddNewsNavItem( show : boolean ) {
            this.isAddNewsVisible = show;
        } 

        setTicker( ticker: string) {
            this.ticker = ticker;
        }
    }


NavigationComponent :

    import { Component, OnInit } from '@angular/core';
    import { NavigationService } from 'src/app/services/navigation.service';

    @Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
    })
    export class NavigationComponent implements OnInit {

    isCollapsed: boolean = true;

    constructor(public navigationService: NavigationService) {}

    ngOnInit() {}
    }


NavigationComponent HTML:

    <nav class="navbar navbar-expand-lg navbar-light bg-light"/>
        <ul class="navbar-nav mr-auto"/>
        
            ...
        
            <li *ngIf="navigationService.isAddNewsVisible && navigationService.ticker " class="nav-item"/>
                <a class="nav-link" routerLink="details/{{navigationService.ticker}}/addNews">Add News</a>
            </li>           
        </ul>
        
        ...

    </nav>

#### Determining the Active Route.

To determine which ticker symbol is selected I use the ActivatedRoute class from the Router Module to "sniff" for the param on the url. This [StackOverflow]((https://stackoverflow.com/questions/45309131/angular-2-4-how-to-get-route-parameters-in-app-component) article was a lot of help!

TicketContainerComponent :

    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute } from '@angular/router';
    import { NavigationService } from 'src/app/services/navigation.service';

    @Component({
    selector: 'app-ticker-container',
    templateUrl: './ticker-container.component.html',
    styleUrls: ['./ticker-container.component.css']
    })
    export class TickerContainerComponent implements OnInit {

        constructor(private route: ActivatedRoute, private navigationService: NavigationService) {}

        ngOnInit() {

            if (typeof this.route.snapshot.params['id'] != 'undefined') {
            this.navigationService.toggleAddNewsNavItem(true);
            this.navigationService.setTicker( this.route.snapshot.params['id']);
            }
            else {
            this.navigationService.toggleAddNewsNavItem(false);
            this.navigationService.setTicker(null);
            }
        }
    }

### 11/13/2018     

Today I mocked up the ticker chart in [jsFiddle](http://jsfiddle.net/svandervort/a96n8zyL/). Right now it displays the last few years of Micorosft's stock price.

The fiddle uses the new [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) and [Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) - which both have pretty [good support](https://caniuse.com/#feat=fetch) across the major browsers now. Bonus points to the Fetch API for supporting CORS.

The fiddle fetches data from a free RESTful API offered by [www.alphavantage.co](https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=demo/). The API is CORS-enabled which means it can be accessed directly from your web browser.

The JSON returned by the service is pretty funky. The "keys" have spaces making it impossible to access them using the dot-notation. I ended up reformatting the objects into something a little friend-lier :

    "Monthly Time Series": {
        "2018-11-14": {
            "1. open": "107.0500",
            "2. high": "112.2400",
            "3. low": "104.4800",
            "4. close": "105.0000",
            "5. volume": "307008701"
        },
    ...

What they hey! This ain't gonna' work : 

    var closePrice =  "Monthly Time Series"."2018-11-14"."1. open";

Before running the example on jsFiddle however you will need to register yourself at [www.alphavantage.co](https://www.alphavantage.co/) and copy your own key into the fiddle : 

    const apikey='[YOUR_KEY_HERE]';

...if you don't the fiddle will give you a nasty error to go ahead and do so.

#### What Fetch?
The Fetch API is a native implementation of the XMLHttpRequest that is built into your browser. Prior to this you would need to include an external library such as [JQuery ](http://api.jquery.com/jquery.ajax/). The XMLHttpRequest ( via fetch ) allows you to asynchronoulsy perform an HTTP GET request to pull down "stuff" from your server. Asynchronous is key in that the data can be retreived without refreshing the web page. Without XMLHttpRequest the web page would have to be refreshed - ruining the experience for the end-user. Oh, and the "stuff" returned by XMLHttpRequest isn't tyoically XML - it's JSON. Why? JSON is native-javascript which is easier to work with on the browser. XML woould require a data transformation - into JSON.

#### What is a Promise?
Fetching data from a service isn't immediate. It is performed more-or-less in a seperate process so that the calling application doesn't have to wait around. The problem is that when the data is (finally) retreived the calling application  needs to do something with it. The old way of doing this was using a "callback" method. The calling application supplies a "callback" method to be invoked upon the completion of the asynchronous method :

With a callback :
                    
    function myFunc () {            	
    
            setTimeout(myCallback("Hello World"),1000);
    }

    function myCallback (data) {            
        console.log( data );
    }
    
    myFunc(); // "Hello World".

A better solution is to have the asynchronous method return a Promise - an object. Promises allow chaining and eliminate a lot of the scope/closure issues that callback methods have. 

With a Promise:

    function myPromiseFunc () {            
            return new Promise((resolve, reject) => {  
            setTimeout(resolve("Hello World"),1000)
            })
    }
    
    myPromiseFunc().then( res => console.log( res )); // "Hello World".


#### What is CORS?
Normally you cannot fetch (GET) data from a different domain. For example, if my website is served from www.scottvandervort.com the web browser on which it is running will not let it fetch data from www.dataservices.com. The web browser will only let a web application fetch from the domain upon which it was served - so www.scottvandervort.com. CORS solves this problem. The Fetch API allows you to specify CORS in the HTTP Request Header. If the service running on www.dataservices.com is CORS-enabled as well the web browser will not prevent the data exhchange. And CORS isn't just for fetching data - it also allows other actions as well - POST and HEAD.

Fetch API allows CORS:

    return new Promise((resolve, reject) => {  
    fetch(	url, { mode: "cors"})
        .then(function(response) {
            return response.json();
        })

### 11/15/2018
Today I added the ability to Add Stock Symbols ( TickerAddComponent ) and display them on the "Home" page ( TickerComponent ). TickerAddComponent adds the symbols to local storage using the local storage service ( LocalStorageService ). TickerComponent fetches the symbols from LocalStorageService, displays them, and fetches live stock data from the ticker service ( TickerService ). An interval on TickerComponent polls TickerService at regular intervals to fetch the latest information for each of the stock symbols.

So what can go wrong? Everything!

It works - up until the free RESTful blocks my requests. The "free" account only allows up to 5 requests per minute and 500 total requests per day. In addition, every time I navigate from the "Home" page ( TickerAddComponent ) to the "Add Symbols" page ( TickerAddComponent) the stock quotes get lost. Tomorrow I'll look into throttling the requests to the RESTful service and caching the data in TickerService. In Angular services are singletons and a great place for preserving state. 

#### Disposing of Interval
I am using an interval to make re-occurring requests to the REST service. It is very important to dipose of intervals and timeouts when you are done with them. If you don't the object will persist in memory as long as the page is displayed in the web browser. This will cause a slow memory leak. For web pages that persist for hours, days, or even weeks this leak could quickly become a flood. Fortunatley, Angular Components have a "dispose" method which is a perfect place to perform such housekeeping :

    StockLookupInterval : number = 1000;
    intervalHandle : any;

    ngOnInit() {
        // Save a handle to the interval ...
        this.intervalHandle = setInterval( interval => {      
                this.lookupStockSymbols();
            }, 
            StockLookupInterval);
    }

    ngOnDestroy() {
        // ... and clear it when you are done.
        clearInterval(this.intervalHandle);
    }    


#### Bootstrapping
The best practice for the Bootstrap Grid Layout is to wrap the entire application in a Bootstrap Container like so :

    <app-navigation></app-navigation>
    <div class="container">
        <router-outlet></router-outlet>
    <div class="container">

I kept the navigation component outside of the container so that it spans the whole width of the page. Then each component will exist as a combination of row's and columns in the Container. Here is the markup for adding stock symbols ( TickerAddComponent ). Everything exists in a single row of the Bootstrap Comtainer. However, the number of columns each of the elements span varies based upon the viewport ( col-md-8, col-sm-12, etc...). "md" and "sm" correspond to medium and small viewports respectively  :

    <div class="row">

        <ul class="list-group col-md-8 col-sm-12">
            <li *ngFor="let stockSymbol of stockSymbols" class="list-group-item">{{stockSymbol}}</li>
        </ul>  
        <form (ngSubmit)="onSubmit()" class="col-md-4 col-sm-12">
            <div class="form-group">
            <label for="stockSymbol">Stock Symbol</label>
            <input type="text" class="form-control" id="stockSymbol" name="stockSymbol" placeholder="Enter stock symbol"  [(ngModel)]="addedSymbol">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

    </div>

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
