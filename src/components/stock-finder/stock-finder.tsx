import { Component, h, State } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'um-stock-finder',
    styleUrl: './stock-finder.css',
    shadow: true
})
export class StockFinder {
    stockNameInput: HTMLInputElement;

    @State() searchResults = [] as {symbol: string, name: string}[];

    onFindStocks(event: Event) {
        event.preventDefault();
        const stockName = this.stockNameInput.value;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
            .then(res => res.json())
            .then(parsedRes => {
                // console.log(parsedRes);
                this.searchResults = parsedRes['bestMatches'].map(match => {
                    return {symbol: match['1. symbol'], name: match['2. name']};
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return [
            <form onSubmit={this.onFindStocks.bind(this)}>
                <input 
                    id="stock-symbol" 
                    ref={el => this.stockNameInput = el}
                />
                <button type="submit">Find!</button>
            </form>,
            <ul>
                {this.searchResults
                    .map(result => (
                        <li><strong>{result.symbol}</strong> - {result.name}</li>
                        )
                    )
                }
            </ul>
        ];
    }
}