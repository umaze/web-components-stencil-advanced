import { Component, h, State, Event, EventEmitter } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'um-stock-finder',
    styleUrl: './stock-finder.css',
    shadow: true
})
export class StockFinder {
    stockNameInput: HTMLInputElement;

    @State() searchResults = [] as {symbol: string, name: string}[];
    @State() loading = false;

    @Event({bubbles: true, composed: true}) umSymbolSelected: EventEmitter<string>;

    onFindStocks(event: Event) {
        event.preventDefault();
        const stockName = this.stockNameInput.value;
        this.loading = true;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
            .then(res => res.json())
            .then(parsedRes => {
                // console.log(parsedRes);
                this.searchResults = parsedRes['bestMatches'].map(match => {
                    return {symbol: match['1. symbol'], name: match['2. name']};
                });
                this.loading = false;
            })
            .catch(err => {
                console.log(err);
                this.loading = false;
            });
    }

    onSelectSymbol(symbol: string) {
        this.umSymbolSelected.emit(symbol);
    }

    render() {
        let content = (
            <ul>
                {this.searchResults
                    .map(result => (
                        <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
                            <strong>{result.symbol}</strong> - {result.name}
                        </li>
                    ))
                }
            </ul>
        );
        if (this.loading) {
            content = <um-spinner />;
        }
        return [
            <form onSubmit={this.onFindStocks.bind(this)}>
                <input 
                    id="stock-symbol" 
                    ref={el => this.stockNameInput = el}
                />
                <button type="submit">Find!</button>
            </form>,
            content
        ];
    }
}