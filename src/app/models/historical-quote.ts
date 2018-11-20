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