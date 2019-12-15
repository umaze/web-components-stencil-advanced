/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface UmStockFinder {}
  interface UmStockPrice {
    'stockSymbol': string;
  }
}

declare global {


  interface HTMLUmStockFinderElement extends Components.UmStockFinder, HTMLStencilElement {}
  var HTMLUmStockFinderElement: {
    prototype: HTMLUmStockFinderElement;
    new (): HTMLUmStockFinderElement;
  };

  interface HTMLUmStockPriceElement extends Components.UmStockPrice, HTMLStencilElement {}
  var HTMLUmStockPriceElement: {
    prototype: HTMLUmStockPriceElement;
    new (): HTMLUmStockPriceElement;
  };
  interface HTMLElementTagNameMap {
    'um-stock-finder': HTMLUmStockFinderElement;
    'um-stock-price': HTMLUmStockPriceElement;
  }
}

declare namespace LocalJSX {
  interface UmStockFinder {
    'onUmSymbolSelected'?: (event: CustomEvent<string>) => void;
  }
  interface UmStockPrice {
    'stockSymbol'?: string;
  }

  interface IntrinsicElements {
    'um-stock-finder': UmStockFinder;
    'um-stock-price': UmStockPrice;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'um-stock-finder': LocalJSX.UmStockFinder & JSXBase.HTMLAttributes<HTMLUmStockFinderElement>;
      'um-stock-price': LocalJSX.UmStockPrice & JSXBase.HTMLAttributes<HTMLUmStockPriceElement>;
    }
  }
}


