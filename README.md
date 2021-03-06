# StockApp

The application is now running on Heroku at [https://stock-app-demo.herokuapp.com/stockapp](https://stock-app-demo.herokuapp.com/stockapp)

I am still working out some issues :

1. After adding Stock Symbols you will need to refresh the ["Home" Page](https://stock-app-demo.herokuapp.com/stockapp/). Currently the "Home Page" doesn't subscribe to chages in the users portfolio.

2. The Chart on the "Stock Details" page may not immediately refresh depnding on whether or not the "free" financial REST service is cooperating.

3. After adding Stock News you will need to refresh the "Stock Details" page ( for the same reason as # 1 above).

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
Bootstrap generally requires JQuery for it's collection of widgets ( datepicker, accordian, modal, etc...). Combining JQuery and Angular is generally a non-no: It's generally bad to manipulate the DOM directly within an Angualr application. Yes, it can be done - but generally if you don't have to you shouldn't. Fortunatley, there is a fork of of Bootstrap that can be used that does require JQuery : [ng-bootstrap](https://ng-bootstrap.github.io/)

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

### 11/16/2018

The TickerService now caches any stock quotes that it fetches from the REST service. As I mentioned previously, the "free" REST service I am using puts some pretty rigid restrictions on how often you can consume their endpoints. I created modified getQuote() on the TickerService so that it returns an Observable object. If a quote exists in the cache I immediately resolve it - otherwise it's resolved asynchronously through an actual call to the REST service. getQuote() in TickerService looks something like this:

    public getQuote(symbol: string ) : Observable<Quote> {
        ...
        let observable : Observable<Quote>;
        ...

I call the REST service if the quote DOES NOT exist in the cache :

    observable = this.getQuoteFromRESTService(symbol);
      
    observable.subscribe( 
        newQuote => {
          this.quotes.push(newQuote);
        }, 
        error => {          
          console.error("Error when looking up quote for " + symbol + ". Error: " + error);   
        });

      return observable;

Or, the quote DOES exist I immediately resolve the Observable.

#### Imediately resolving an Observable

Observables are meant to be resolved asynchronously - generally they are used to fetch data from a service. However, if you need to immediately 
resolve an Observable you can do so like this :

    observable = Observable.create(function (observer) {
        observer.next(quote);
        observer.complete();
    });

    return observable;

The consumer of the service, TickerComponent looks like this :

    ```
    this.tickerService.getQuote(symbol).subscribe( 
        newQuote => {
            /* DO something with quote */
        }
    ```
#### Observable versus Promise

observable.next(...) "resolves" the subscriber with the requested data. In this case TickerService sends TickerComponent a new quote,

observable.next(...) can be called multiple times in TickerService. Each time it is invoked TickerComponent is notified with a quote. 

This is a big difference between Promises and Observables. Promises can only be resolved once while Observables can be resolved multiple times - until .complete() is invoked. 

For now I am using Observable like a Promise. The TickerService fetches the quote once, resolves ( i.e., .next() ) it, and immediately .complete()'s it. However, for an application such as this where I want to continuously grab quotes I could modify the service to NOT .complete() and periodically invoke .next(). TickerComponent would keep receiving the latest quotes from TickerService using the same Observable object. Pretty cool, right? Something to ponder for a future enhancement.

#### Initializing and Disposing of Services

Angular supports [lifecycle hooks](https://angular.io/guide/lifecycle-hooks) for it's Components and Services. The most common are Init() and Destroy(). Services are hampered in that they do not support Init(). For TickerService I want to set up an interval to periodically fetch quotes. Without an Init() I'm forced to use the next best thing - the constructor:

    import { OnDestroy } from '@angular/core';

    @Injectable({
    providedIn: 'root'
    })
    export class TickerService implements OnDestroy {

        private portfolioIntervalHandle : any;

        constructor( private http: HttpClient ) { 

            ... 

            this.portfolioIntervalHandle = setInterval( /* Fetch QUotes from RESTful Service */, 
                                                        5000); 
    }

Don't forget to dispose of the interval in Destroy() - which IS supported :

    ```
    ngOnDestroy() {
        clearInterval(this.portfolioIntervalHandle);
    }  
    ```

### 11/19/2018 
The D3.js chart is now displayed when clicking on a Stock Symbol on the "Home" page. Clicking "Home" routes to the TickerContainerComponent - which hosts the TickerChartComponent, the TickerDetailComponent, and the TickerNewsComponent. 

#### Navigation ( with an Argument ) through RouterLink
In TickerComponent I display all of the stocks in the users' portfolio. Clicking on a stock symbol leverages the router to navigate to the "Details" page for the stock. To do this you use the Angular "routerLink". The path I want to route to needs to contains the stock symbol as well, so : "/details/msft" for say, Microsoft. This is how you would do that:

    <tr *ngFor="let quote of quotes">
        <td><a [routerLink]="['/details', quote.symbol]">{{quote.symbol}}</a></td>
        ...
    </tr>

#### Installing D3.js 
As the chart uses D3.js - you need to include it with your application. Run the following to include the library as well as it's type declarations in the application's package.json.

    npm install --save d3
    npm install --save-dev @types/d3

npm installs the latest version of D3.js. The fiddle that I originally created used v3 of the library. This immediately broke the chart. Fortunately, D3.js has lots and lots of examples to pull from. I was able to find a similar chart using the [latest version of the framework here](https://bl.ocks.org/d3noob/402dd382a51a4f6eea487f9a35566de0).

#### What is a Type Library
D3.js and many other libraries extend Javascript with syntax that the Typescript compiler does not understand. If Typescript doesn't understand it - it will throw an error. Communities oftentimes create type declaration files to complement the core libraries. These type declaration files "tell" the Typescript compiler how to handle the core library's extensions.

I created a new method on TickerService to return historical quotes from the [Financial REST service ](https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=demo). As historical quotes generally don't change ( they're historical, right? ) I fetch the data once - and then cache it for subsequent calls. This is different from live quotes which need to be refreshed periodically. 

#### A Historical Quote Class
I created a new HistoricalQuote class to store the data retrieved from the service. The historical data is stored as an array of these objects :

    export class HistoricalQuote {
        
        constructor ( symbol: string, date: string, price: number ) {
            this.symbol = symbol;
            this.date = date;
            this.price = price;
        }

        symbol: string;
        date: string;
        price: number;
    }

#### Caching using a Typescript Map
Typescript compiles down to native Javascript - but it offers some cool data structures which make it a lot like Java, C#, and other strongly-typed languages. I didn't like it at first - but it's definitely growing on me. Behold! A strongly typed Map that I used to store the Historical Quotesin the TickerService :

    private historicalQuotes : Map<string, HistoricalQuote[]> = new Map();

FYI: The "string" (or, key) is the stock symbol.

Unfortunately, D3.js has issues with strongly-typed data in it's nodes. I had to transform the Historical Quotes into POJO's ( Plain-Old-JSON-Object) in order to get D3.js to play nicely with the data.

    ```
    private showChart( historicalQuotes : HistoricalQuote[] ) {

        var data = [];    

        historicalQuotes.forEach( historicalQuote => {
            data.push({"date" : historicalQuote.date, "close" : historicalQuote.price });
        })
        ...
    ```

The data now looks like this :

    ```
    [	{ date: "1998-02-27", close: "84.7500" },
        { date: "1998-03-31", close: "89.5000" },
    	  ...
    ]
    ```

#### Re-trying an Observable
Okay, so the limitations and restrictions of the Financial Service are really annoying. I've tried caching. I've tried throttling. What I REALLY need is a way to re-run the query until I get the data I want back. The good news is that RxJs - the library that Angular uses for Observables supports this [natively](https://www.learnrxjs.io/operators/error_handling/retrywhen.html) by using retryWhen() and delayWhen(). 

The following code is from the TickerService. It will keep attempting to fetch data from the url every 10 seconds. When data is finally returned does the Observable will complete. Throwing an exception will trigger - or an explicit error from http.get() will trigger the retryWhen() block.

    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { HistoricalQuote } from '../models/historical-quote';
    import { timer } from 'rxjs';
    import { map, retryWhen, delayWhen } from 'rxjs/operators';

    ...

        return this.http.get<HistoricalQuote[]>(url).pipe(
        map( res => {

            if (typeof res["Note"] != 'undefined' ) {     
            throw res["Note"];  // This will be picked up by retryWhen() ...
            }
            else {
                ...
            }

            ...
        }),
        retryWhen(errors =>
            errors.pipe(
            delayWhen(val => timer(10000))
            )
        )
        );     
    }  

#### Styling the Chart 
So, I dutifully added some basic styles to the ChartComponent and ... nothing happened. The D3.js chart was still ugly and bland. After reading this article on [Stack Overflow](https://stackoverflow.com/questions/36214546/styles-in-component-for-d3-js-do-not-show-in-angular-2/36214723#36214723) I realized it had everything to do with the dynamic nature of how the chart is generated. Angular re-writes a components' styles to have them only applied to the elements contained within the component. Since the chart rendered by D3.js is generated asynchronously Angular never gets a chance to re-write the styles and as such they never get applied. There are two ways to fix this : include a global style sheet or, turn off the "ViewEncapsualtion" feature for the Component. Turning off "ViewEncapsulation" stops Angular from re-writting the styles. A global stylesheet has the same effect by making the styles ... global:

    import { Component, ViewEncapsulation } from '@angular/core';

    ...

    @Component({
    encapsulation: ViewEncapsulation.None,  
    selector: 'app-ticker-chart',
    templateUrl: './ticker-chart.component.html',
    styleUrls: ['./ticker-chart.component.css']
    })
    export class TickerChartComponent {
        ...

That's it for now. Still to come: 

1. Fleshing out the stock "Details" Page - I still need to display the Stock Details and News.

2. Add the Ability to Add News for a Stock.

3. I would like the "Add News/Symbols" pages to appear as Modal Dialogs on the "Home" and "Details" pages. 

4. The user really needs the ability to delete stock symbols from their portfolio. 

5. Rather than display a empty chart and/or "N/A" for a stock I'd really like to present a loading indicator of sorts.

6. The layout isn't very responsive ( yet ). I'd like make it look equally nice on smaller viewports.

### 11/26/2018 

I finished fleshing out the TickerDetailsComponent so that when you view a stock you can see a whole bunch of cool information about it. I also added the ability to add ( TickerNewsAddComponent ) and view ( TickerNewsComponent ) news articles for a selected stock symbol.

#### Input Sanitation
User input begs the question of input sanitization. Angular automatically encodes anything rendered to HTML. It does not scrub input, however. This means that although I don't have to worry about Angular rendering say, a <script/> tag that a devious user might have hidden away in a news article that they posted - it does not prevent the <script/> from getting saved to the data store. Fortunately, Angular does provide the means to properly scrub input using the [DomSanitizer](https://angular.io/api/platform-browser/DomSanitizer). I decided to perform santitation at the service level rather than directly in the component simply to centralize it in one place. It looks like this

    import { SecurityContext } from '@angular/core';
    import { DomSanitizer } from '@angular/platform-browser';

    ...

    @Injectable({
    providedIn: 'root'
    })
    export class LocalStorageService {

        constructor(private sanitizer : DomSanitizer) {}

        addNews ( symbol: string, news: string )  {
            ...
            symbol = this.sanitizer.sanitize(SecurityContext.HTML,symbol);    
            news = this.sanitizer.sanitize(SecurityContext.HTML,news);  
            ...
        }

        ...
    }

Next up? Presenting the "Add Symbol" and "Add News" views as Modal Dialogs.

### 11/27/2018 

"Add Symbols" and "Add News" are now both modal dialogs or, "pop-ups" as I like to call them. The modal dialogs are implemented using [ng-bootstrap](https://ng-bootstrap.github.io/#/components/modal/examples).

#### Creating a Modal Dialog 

A modal dialog requires a host component as well as a child component. The host component is responsible for invoking the dialog, specifying the child component which should be displayed within the dialog, and ( optionally ) handling any close events when the dialog is closed. 

When perusing the code below be sure to take note of the imports that I have specified in the code snippets as they are required to get this to work correctly.

To make a component display in a modal dialog you will need to do the following :

1. Add the child component that you want to display as a modal dialog  ( TickerAddComponent ) into your AppModule :

    ```
    import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

    ...

    @NgModule({
        declarations: [
            ...
            TickerAddComponent,
            ...
        ],
        imports: [
            ...
            NgbModule,
            ...
        ],
        ...
        entryComponents: [
            TickerAddComponent, 
        ],
        ...
    })
    export class AppModule { }
    ```

2. Add a "click" handler to the component that will be hosting the modal dialog ( NavigationComponent ). modalService.open() displays the dialog. Callback methods can be specified as well. These will be invoked when the user closes or dismisses the dialog :

    ```
    import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
    import { TickerAddComponent } from '../../components/ticker-add/ticker-add.component';

    ...

    @Component({
        ...
        templateUrl: '<a class="nav-link" (click)="showTickerAddDialog()">Add Symbols</a>',
        ...
    })
    export class NavigationComponent implements OnInit {

        ...

        constructor(public navigationService: NavigationService, private modalService: NgbModal) {}

        public showTickerAddDialog () {

            let component = TickerAddComponent;

                this.modalService.open(
                component, 
                { ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
                    // Dialog "closed" handler ...
                }, (reason) => {
                    // Dialog "dismissed" handler ...
                });    
        }    
        ...
    ```
3. Modify the child component so that it imports the proper ng-bootstrap libraries ( NgbActiveModal, NgbModal ). These are necessary to make it a modal dialog. The libraries also provide the ability to dismiss / close the dialog through calling activeModal.dismiss|close(). When either of these methods are called they will trigger the callback methods registered in the host component's .open() method.

    ```
    ...
    import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
    ...

    @Component({
    selector: 'app-ticker-add',
    templateUrl: '  <div class="modal-header">
                        <h4 class="modal-title">Add Symbols</h4>
                        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Dismissed')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
     /               <div class="modal-body">
                        <!-- Dialog body goes here! -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Closed')">Close</button>
                    </div>'
    })
    export class TickerAddComponent implements OnInit {
        ...
        constructor( private localStorageService: LocalStorageService, public activeModal: NgbActiveModal) { }
        ...
    }
    ```

At this point we need to remove the routes for "Add News" and "Add Symbols" from the routing table. So we go from this :

    ```
    const appRoutes: Routes = [
        { path: '', component: TickerComponent },   
        { path: 'addSymbol', component: TickerAddComponent },
        { path: 'details/:id', component: TickerContainerComponent,
            children:[       
            { path: 'addNews', component: TickerNewsAddComponent},       
            ] 
        }      
    ];
    ```

To this :

    ```
    const appRoutes: Routes = [
        { path: '', component: TickerComponent },   
        { path: 'details/:id', component: TickerContainerComponent }      
    ];
    ```

 This of course has some consequences. For starters they are no longer navigable through a url alone. At the very least this makes testing a little more tricky - at the expense of usability, of course. Everything has a trade off. 

### 11/28/2018

The application is now running on Heroku at [https://stock-app-demo.herokuapp.com/stockapp](https://stock-app-demo.herokuapp.com/stockapp)

I am still working out some issues :

1. After adding Stock Symbols you will need to refresh the ["Home" Page](https://stock-app-demo.herokuapp.com/stockapp/). Currently the "Home Page" doesn't subscribe to chages in the users portfolio.

2. The Chart on the "Stock Details" page may not immediately refresh depnding on whether or not the "free" financial REST service is cooperating.

3. After adding Stock News you will need to refresh the "Stock Details" page ( for the same reason as # 1 above).

I will look into these in short order - but first ...

#### Why Heroku?

Well, it's free if you are just dork-ing around. Yes, there are lots of caveats that come along with "free" : the application sleeps after several minutes, it only runs in a single container ( or, "Dyno" if you want to use Heroku-speak ), the runtime hours are restricted. You can read all about it [here](https://www.heroku.com/free).

It also offers free integration with Github. So, as you check-in changes for your project they are automatically picked up and deployed - also all free. So, you get a continuous integration build as well.

Most importantly - it just worked. It took less than 30 minutes to get stock-app running ( more on that in a minute ).

I tried alternatives such as [StackBlitz](https://stackblitz.com/) which allows you to essentially build your application online. It's not a hosting service. Stackblitz is more of a cooperative development tool where you can share, modify, and run an Angular project in real-time ( kind of like [jsFiddle](http://jsfiddle.net/) on steroids). What I didn't like about Stackblitz was that it was lacking Github integration. As my project already existed in Github I would have to re-create it in StackBlitz. 

I also tried Github Pages per the [Angular documentation](https://angular.io/guide/deployment). Let's just say that it didn't "just work". Essentially you build your Angular application and "deploy" it to your Github repoistory from which it can be served. After messing around for over an hour I gave up. I couldn't get the javascript and css files to load properly.

#### Setting Up for Heroku

To set up my Angular application to run on Heroku I followed these two articles : [How to Deploy Angular Application to Heroku](https://medium.com/@hellotunmbi/how-to-deploy-angular-application-to-heroku-1d56e09c5147) and [Deploy Angular 6 app to Heroku](https://medium.com/@shubhsharma10/how-to-deploy-angular-6-app-to-heroku-52b73ac7a3aa).

Essentially you will need to do the following to your Angular application to prepare it for Heroku :

1. Include Express.js as a dependency in your package.json. [Express](https://expressjs.com/) is a web application framework for Node.JS

    ```
    npm install express path --save
    ```

2. Add a server.js file to your project; this sets up a simple web server ( Express ) that will serve the Angular application.

    ```
    //Install express server
    const express = require('express');
    const path = require('path');

    const app = express();

    // Serve only the static files form the dist directory
    app.use(express.static(__dirname + '/dist/stock-app'));

    app.get('/*', function(req,res) {
        
    res.sendFile(path.join(__dirname+'/dist/stock-app/index.html'));
    });

    // Start the app by listening on the default Heroku port
    app.listen(process.env.PORT || 8080);
    ```

3. Add the following to the "scripts" section in your package.json; The "start" command will now launch "server.js"

    ```
    "scripts": {
        ...
        "start": "node server.js",
        "postinstall": "ng build --aot --prod"
        ...
    }
    ```

4. Add an "engines" configuration section to your package.json. Make sure it targets the version of node and npm that you are using for your development.

    ```
    "engines": {
        "node": "8.12.0",
        "npm": "6.4.1"
    }  
    ``` 

5. Add the following "dependencies" to your package.json :

    ```
    "dependencies": {
        ...
        "@angular/cli”: “1.4.9”,
        "@angular/compiler-cli": "^4.4.6",
        "typescript": "~2.9.2",
        ...
    }
    ```

The next step is to create an account on Heroku, add an application, and configure it to watch Github for changes. If changes are detetced Heroku will get the latest, build the application, and run it automatically. Pretty sweet!

#### Exposing Component properties to a Template

If you want to expose properties on a Component to a HTML template the properties need to be marked "public" else they will suffer the wrath of the Typescript validator. I found this out when attempting to build my application using "ng build". As I had my properties marked "private" I got this error :

    src\app\components\ticker-news-add\ticker-news-add.component.html(15,102): : Property 'addedNews' is private and only accessible within class 'TickerNewsAddComponent'.

"protected" didn't work, either. They need to be "public". Honestly, once transpiled into basic Javascript the access modifier doesn't make a heck of a difference. The error is 100% Typescript trying to assert good coding practices.

### 11/29/2018

Okay, so the stock application is deployed to Heroku and feature complete at this point. It's time to start fixing issues and applying some polish. The biggest offender so far? If I add new stock symbols to my portfolio or a news article the views aren't automatically updated. The "Home" page ( TickerComponent ) needs to be notified of these changes and automatically update itself when new stock symbols are added. 

#### How to notify components of changes using the Rxjs Subject
To do this I use the [Rxjs Subject and Subscriber](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/subjects.md). The Rxjs Subject/Subscriber is [more-or-less](https://hackernoon.com/observer-vs-pub-sub-pattern-50d3b27f838c) an implementation of the [Publisher/Subscriber](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern:  a consumer ( TickerComponent ) subscribes to a publisher ( LocalStorageService ) to receive update notifications. 

Currently, stock symbols are managed by a service ( LocalStorageService ). The service exposes addSymbol() and getSymbols() methods. addSymbol() is called by the "Add Symbol" component ( TickerAddComponent ) to add new stock symbols. getSymbols() is called by the "Home" component ( TickerComponent ) to retrieve the current stock symbols in the users portfolio.

To make the "Home" component ( TickerComponent ) aware of changes made through the service ( LocalStorageService ) I made the following changes :

I added a watchSymbols() method to the service which returns a Subject :

    ```
    private addSymbolSubject : Subject<string> = new Subject<string>();

    ...

    public watchSymbols () : Subject<string> { 
        return this.addSymbolSubject;
    }  
    ```  

Next, I modified the existing addSymbol() method to "notify" the Subject that a new stock symbol has been added :

    ```
    this.addSymbolSubject.next(symbol);
    ```

Next, in the component I subscribe to the Subject returned from watchSymbols(). Anytime next(symbol) is called from within the service all of its subscribers will be notified :

    ```
    allSymbols : string[] = [];
    addSymbolSubscription : Subscription;

    ...

    addSymbolSubscription = this.localStorageService.watchSymbols().subscribe( symbol => {        
      this.symbols.push( symbol );
    });
    ```

Lastly, when the component gets disposed of I make sure to unsubscribe from the Subject so that it doesn't keep broadcasting to empty ears.

    ```
    ngOnDestroy() {
        this.addSymbolSubscription.unsubscribe();
    }
    ```

Subject only notifies new subscribers of changes that occured after they subscribed. Alternatively, you may also use the Rxjs [ReplaySubject](https://medium.com/@luukgruijs/understanding-rxjs-behaviorsubject-replaysubject-and-asyncsubject-8cc061f1cfc0) which maintains a history of all changes. When a new subscriber subscribes it will regurgitate everything that occured since the ReplaySubject was created.

So that's it for now. Next up? A loading indicator for components that depend on asynchronous data.

### 12/03/2018 

I added a loading indicator. It required more consideration that I initially expected. For example :

1. Do I display a single solitary loading indicator anytime a asynchronous call is being made, or ...
2. ... do I display a loading indicator per Component? 
3. Do I roll out my own Css - or use a plugin?
4. Should I block user input when someything is loading?

... see? Lot's of questions. I went with "no", "yes", "plugin", and "no" - and found a cool plugin that would take me most of the way there called [ngx-loading](https://github.com/Zak-C/ngx-loading#config-options).

#### A Loading Indicator
It was relatively easy to install as use. You just need to install it :

    '''
    npm install --save ngx-loading
    '''

Reference it in you AppModule :

    '''
    import {NgxLoadingModule, ngxLoadingAnimationTypes} from 'ngx-loading';

    @NgModule({
        ...    
        imports: [
            ...
            NgxLoadingModule.forRoot({     
                animationType: ngxLoadingAnimationTypes.circleSwish
            })
        ],
        ...

Add a toggle ( isLoading ) in the Component ( ChartComponent ) :

    '''
    public isLoading : boolean = false;

    ...

    ngOnInit() {

        // Give the user something to look at for now ...
        this.showChart([]);

        this.isLoading = true;
        this.tickerService.getHistoricalQuote(this.navigationService.ticker).subscribe( res => {      
            this.showChart(res);
            this.isLoading = false;
        })
    }
    '''

And add the selector ( ngx-loading ) to the Components template :

    '''
    <div class="col-lg-12">
        <div id="chart"></div>
        <ngx-loading [show]="isLoading"></ngx-loading>
    </div>
    '''

#### Stop blocking my Modal Dialogs
Works like a charm. Or does it?  The loading spinner has a nasty habit of blocking Bootstrap's Modal Dialogs ( "Add Symbol" and "Add News" ). By default it drapes a semi-transparent overlay on top of a component. This looks great up until a dialog is displayed - and then well, it doesn't look so great anymore. To fix this issue I just ditched the overlay altogether by conifguring the loading indicator to be fully transparent ( backdropBackgroundColour ) : 

    '''
    NgxLoadingModule.forRoot({     
      backdropBackgroundColour: 'rgba(0, 0, 0, 0)',    
      primaryColour: 'steelblue',
      animationType: ngxLoadingAnimationTypes.circleSwish
    })
    '''

The loading indicator animation also displays on top of modal dialog. This prevents a user from adding tickers and news. To fix this issue I had to adjust the "z-index" style for the loading indicator so that it is less than that of Bootstrap's Modal Dialog. I did this in the "styles.css" so that all instances of the loading indicator are effected:

    '''
    ngx-loading .backdrop {
        z-index: 1000 !important;
    }

    ngx-loading .spinner-circle-swish {
        z-index: 1001 !important;
    }
    '''
Next up? Adding the ability to delete stock symbols and news...

### 12/6/2018

We need to give the user a way to delete stock symbols from their portfolio. On the "Home" page ( TickerComponent ) I hooked up a new "Delete" button like so :

    '''
    <tbody>
        <tr *ngFor="let quote of quotes">
            ...     
            <td class="delete-symbol" (click)="deleteSymbol(quote.symbol)">Delete</td>
        </tr>
    </tbody>
    '''

The component calls a new removeSymbol() method of on the Storage Service :

    '''
    public deleteSymbol ( symbol: string) {
        this.localStorageService.removeSymbol(symbol);
    }
    '''

Before I dive into the StorageService let's change the "Home" page to display an icon instead of the word "Delete".

#### Where are my Bootstrap icons ( gylphs )?
Bootstrap used to include a library of icons/glyphs. However, these were removed with the release of Bootstrap 4. Now, we're forced to find an alternative. 

Initially I tried to use [FontAwesome](https://fontawesome.com/). FontAwesome supports scalable (SVG-based) fonts and icons. These are perfect for responsive applications that needs to look good across a variety of devices. Or would have ... Unfortuately, I had some issues getting the FontAwesome icons to display consistently. Although the icons would display properly when the application was first loaded ( or refreshed ) I found that navigating through a router link would make the icons disappear. I have yet to find a solution to the problem. Time for a back-up plan ...

#### UTF-8 Dingbats
Time to use the poor man's icons - [dingbats](https://www.w3schools.com/charsets/ref_utf_dingbats.asp). These are default characters included with UTF-8 that can be substituited for icons in a pinch. They aren't perfect for sure. They don't scale as well and they may not be supported across all devices. However, for now they'll suffice. And? They're easy to use. Just do this :

    '''
    <p>&#x2716;</p>
    '''

So, now the "Home" page ( TickerComponent ) looks like this :

    '''
    <td class="delete-symbol" (click)="deleteSymbol(quote.symbol)">&#x2716;</td>
    '''

... and done!

#### A More Robust Rxjs Subject 

To support the removal of symbols I modified the Rxjs Subject that is exposed through the Local Storage Service ( LocalStorageService ). Whereas before the Subject alerted subscribers of new stock symbols - now I want it to notify of removals as well. 

The Subject broadcasts a payload. Previously, I just broadcasted the stcok symbol ( a string ) and the subscribers assumed that it was always an "add" :

    '''
    Subject<string>
    '''

To support "remove" I created a generic "wrapper" class to wrap the Subject's payload :

    '''
    export class Changed <T> {

        constructor ( obj: T, isAdded: boolean ) {
            this.obj = obj;
            this.isAdded = isAdded;
        }

        obj: T;
        isAdded: boolean;
    }
    '''

Now my Subject for stock symbol changes looks like this :

    '''
    Subject<Changed<string>>
    '''

Now when broadcasting the changes from the StorageService I need to specify whether the symbol was added ( true ) - or removed ( false ) :

    '''
    ...
    export class LocalStorageService {
        ...

        private symbolSubject : Subject<Changed<string>> = new Subject<Changed<string>>();

        ...
        
        addSymbol ( symbol: string ) {    
            ...
            // Notify subscribers that a new stock symbol has been added to the portfolio.
            this.symbolSubject.next(new Changed<string> (symbol, true));
            '''

        removeSymbol ( symbol: string ) {    
            ...
            // Notify subscribers that a new stock symbol has been removed from the portfolio.
            this.symbolSubject.next(new Changed<string> (symbol, false));
            '''            

And the subscriber ( TickerComponent ) needs to handle the additionaly information as well :

    '''
    symbolSubscription : Subscription;
    symbols : string [] = [];

    ...

    // Subscribe to changes to the users' portfolio ...
    this.symbolSubscription = this.localStorageService.watchSymbols().subscribe( msg => {
        if (msg.isAdded) {
            // A stock symbol has been added ...
            this.symbols.push( msg.obj );
            ...
        }
        else {
            // A symbol has been removed ...

            for (var stockSymbolIndex = this.symbols.length-1; stockSymbolIndex>=0;stockSymbolIndex--) {
                if (this.symbols[stockSymbolIndex] == msg.obj) {
                    this.symbols.splice(stockSymbolIndex,1);
                    break;
                }
            }
            ...
        }
    });

    '''

That should do it! Now the user can delete stock symbols from their portfolio. Next up? It's time to make the application responsive across different devices. As we're using Bootstrap this should be a piece-of-cake...

### 12/6/2018

We're almost done! The last thing to do is to clean up some of the styling and make the website more responsive to different devices. 

#### Enabling SASS
First things first is to enable [SASS](https://sass-lang.com/). SASS is a superset of CSS that allows for variables and mixins. The Angular CLI already has support for it built-in and will automatically transpile it into .CSS that can run on the web-browser. All you need to do is :

1. Change the extensions of your "src/style.css" file to .scss.

2. Modify the "src/angular.json" file in the application root to reference the revised file extension from .css to .scss. Like this :

    '''
    "styles": [
        "src/styles.scss"
    ]
    '''
3. For each component you will need to do something similar :

    @Component({
        ...
        styleUrls: ['./ticker-add.component.scss']
    })
    export class TickerAddComponent implements OnInit {

#### SASS Global Variables

Once SASS has been enabled you can create global variables for the entire website. I created a new "src/variables.scss" which I import and used in the ChartComponent, TickerAddNewsComponent, and TickerAddComponent. It looks like this :

    '''
    /* You can add global styles to this file, and also import other style files */
    @import '~bootstrap/dist/css/bootstrap.min.css';

    $info-color: steelblue;

    @mixin textFormat {
        overflow-y: auto;
        overflow-wrap: break-word;
        word-break: break-word;
    }
    '''

And I import it and use it in other SCSS files like this. Here is the TickerAddComponents .scss file :

    '''
    @import '../../../variables.scss';
    @import '../../../styles.scss';

    .list-group{
        max-height: 300px;
        margin-bottom: 10px;
        @include textFormat(); 
    }
    '''

And here is the TickerChartComponents .scss file :

    @import '../../../variables.scss';

    path {
        stroke: $info-color;
        stroke-width: 2;
        fill: none;
    }
    .axis path, .axis line {
        fill: none;
        stroke: grey;
        stroke-width: 1;
        shape-rendering: crispEdges;
    }

Variables are declared and used with a dollar sign($). A mixin is sort of a "code fragment" than can be reused. It is used with a $include declaration. This is just the tip of the iceberg as far as what SASS can do. As a developer its benefical because it normalizes you CSS and provides a lot of reusability. I don't have to keep declaring the same stuff again and again and again ...

#### Alternating row colors

When looking at a long list of data it helps to alternate colors for each row. It is easier on the eyes. Fortunately, Angular makes this very easy. The [ngfor directive has several local variables](https://angular.io/api/common/NgForOf#description) that we can use to flip-flop styling for odd and even rows. For each iteration of of ngfor odd ( or even ) is set to a local variable that triggers the appropriate class. 

Here's the class :

    '''
    .even { background-color: rgba(0,0,0,0); }  /* White */
    .odd { background-color: rgba(0,0,0,.05); } /* Grey */
    '''

The "ng-for" from TickerAddComponent :

    '''
    <ul class="list-group">
        <li [ngClass]="{ odd: odd, even: even }" *ngFor="let stockSymbol of stockSymbols; let odd=odd; let even=even;" class="list-group-item">{{stockSymbol}}</li>
    </ul>  
    '''

And the component ( nothing really interesting here but I thought I'd post it for solidarity ) :
    
    '''
    @Component({
        ...
    })
    export class TickerAddComponent implements OnInit {
        ...
        stockSymbols : string [] = [];
    '''

#### Resizing the D3.js Chart

The D3.js chart is of a fixed size. Ideally, I would like it to scale a little when the viewport changes from desktop to say, a mobile device. To do this I "listen" to the browser's resize events. When the browser's viewport changes I re-render the Chart to fit the new size. The implementation looks like this :

    '''
    import { ..., HostListener } from '@angular/core';

    @Component({
        ...
    })
    export class TickerChartComponent implements OnInit {

        @HostListener('window:resize', ['$event'])
        onResize(event) {
            let chartWidth : number = window.innerWidth;
            this.showChart(chartWidth);
        }
    '''

And that's it! We're done! 

If you'd like to take a look at the application it is running on Heroku at [https://stock-app-demo.herokuapp.com/stockapp](https://stock-app-demo.herokuapp.com/stockapp).


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
