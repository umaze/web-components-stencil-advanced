import { Component, h, State, Element, Prop, Watch, Listen } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'um-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})
export class StockPrice {
    stockInput: HTMLInputElement;
    // initialStockSymbol: string;

    @Element() el: HTMLElement;

    @State() fetchedPrice: number;
    @State() stockUserInput: string;
    @State() stockInputValid = false;
    @State() error: string;

    @Prop({ mutable: true, reflect: true }) stockSymbol: string;

    @Watch('stockSymbol')
    stockSymbolChanged(newValue: string, oldValue: string) {
        console.log(newValue);
        if (newValue !== oldValue) {
            this.stockUserInput = newValue;
            this.stockInputValid = true;
            this.fetchStockPrice(newValue);
        }
    }

    onUserInput(event: Event) {
        this.stockUserInput = (event.target as HTMLInputElement).value;
        this.stockInputValid = this.stockUserInput.trim() !== '';
    }

    onFetchStockPrice(event: Event) {
        event.preventDefault();
        // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
        this.stockSymbol = this.stockInput.value;
    }

    @Listen('body:umSymbolSelected')
    onStockSymbolSelected(event: CustomEvent) {
        console.log('stock symbol selected: ' + event.detail);
        if (event.detail && event.detail !== this.stockSymbol) {
            this.stockSymbol = event.detail;
        }
    }

    componentWillLoad() {
        if (this.stockSymbol) {
            this.stockUserInput = this.stockSymbol;
            this.stockInputValid = true;
        }
    }

    componentDidLoad() {
        if (this.stockSymbol) {
            // this.initialStockSymbol = this.stockSymbol;
            // this.stockInputValid = true;
            this.fetchStockPrice(this.stockSymbol);
        }
    }

    componentDidUpdate() {
        // if (this.stockSymbol !== this.initialStockSymbol) {
        //     this.initialStockSymbol = this.stockSymbol;
        //     this.fetchStockPrice(this.stockSymbol);
        // }
    }

    fetchStockPrice(stockSymbol: string) {
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Invalid!');
                }
                return res.json();
            })
            .then(parsedRes => {
                if (!parsedRes['Global Quote']) {
                    throw new Error('Invalid symbol!');
                }
                this.error = null;
                this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
            })
            .catch(err => {
                this.error = err.message;
            });
    }

    render() {
        let dataContent = <p>Please enter a symbol!</p>
        if (this.error) {
            dataContent = <p>{this.error}</p>;
        }
        if (this.fetchedPrice) {
            dataContent = <p>Price: ${this.fetchedPrice}</p>;
        }
        return [
            <form onSubmit={this.onFetchStockPrice.bind(this)}>
                <input 
                    id="stock-symbol" 
                    ref={el => this.stockInput = el} 
                    value={this.stockUserInput}
                    onInput={this.onUserInput.bind(this)}
                />
                <button type="submit" disabled={!this.stockInputValid}>Fetch</button>
            </form>,
            <div>{dataContent}</div>
        ];
    }
}