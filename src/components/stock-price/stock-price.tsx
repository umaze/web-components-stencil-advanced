import { Component, h } from "@stencil/core";

@Component({
    tag: 'um-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})
export class StockPrice {
    onFetchStockPrice(event: Event) {
        event.preventDefault();
        console.log('Submitted!');
    }
    //2XZ4PFAKWHEP96RO
    render() {
        return [
            <form onSubmit={this.onFetchStockPrice}>
                <input id="stock-symbol" type="text"/>
                <button type="submit">Fetch</button>
            </form>,
            <div>
                <p>Price: {0}</p>
            </div>
        ];
    }
}