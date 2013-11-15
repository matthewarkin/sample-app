//
// Requires jQuery and Airbrite.js
//

(function ($, localStorage) {

  // IE8 issue
  $.support.cors = true;

  var cart = window.cart || {
    config: {
      log: true
    },

    //
    // Line items in the cart
    order: null,

    //
    // Constructor
    init: function (options) {
      // Adapt the config
      $.extend(this.config, options);

      // Initialize a new order
      this.order = new Airbrite.Order();

      // Full price for the entire cart (no discounts applied)
      this.order.fullPrice = 0;

      this.config.log && console.log('window.cart component initialized');
    },

    //
    // Add an item to the cart. Takes two params.
    // First param is an object:
    //   {
    //     sku: 'some-sky-value',
    //     price: 1000,
    //     quantity: 2
    //   }
    // Second param is a function of type function(err){...}
    addItem: function (item, callback) {
      this.config.log && console.log('window.cart: adding item to cart...');

      // Add item to the order
      try {
        this.order.addItem(item);
      } catch (e) {
        callback(e);
        return;
      }

      // Acculumulate the price of this item/s
      this.order.fullPrice += item.price * item.quantity;

      this.config.log && console.log('window.cart: added item to the cart')

      callback(null);
    },

    //
    // Remove item from Airbrite order
    removeItem: function (item, callback) {
      // Adjust the full price
      this.order.fullPrice -= item.price * item.quantity;

      this.config.log && console.log('window.cart: removing item with SKU: ' + item.sku);

      // Remove item from the order
      this.order.removeItem(item);

      callback(null);
    },

    //
    // Add credit/debit card information to the order
    //
    // Takes an object with card information:;
    //  {
    //    number: ‘4242424242424242’,
    //    cvc: ‘892’,
    //    exp_month: ‘11’,
    //    exp_year: ‘16’,
    //    amount: 123400,
    //    currency: 'usd'
    //  }
    //
    //  The callback takes an error param, which is null if there were no errors.
    addPayment: function (ccard, callback) {
      // Pass the card data through to Airbrite order
      this.order.addPayment(ccard, function (response, message) {
        // Failed registering card information
        if (response === 'error') {
          this.config.log && console.log(message);
          callback(message);
          return;
        }

        // Payment information was accepted
        callback(null);
      });
    },

    //
    // Checkout the order to Airbrite
    //
    //  The callback takes an error param, which is null if there were no errors.
    placeOrder: function (callback) {
      // Submit the order to Airbrite
      this.order.submit(function (response, message) {
        // Failed registering card information
        if (response === 'error') {
          this.config.log && console.log(message);
          callback(message);
          return;
        }

        // Airbrite accepted the order
        callback(null);
      });
    }
  }

  // Put the cart in the global namespace
  window.cart = cart;

})(jQuery, window.localStorage);
