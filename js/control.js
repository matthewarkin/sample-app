//
// Requires jQuery, the ui and cart objects
//

$(document).ready(function() {

  var control = window.control || {

    config: {
      log: true,

      publishableKey: 'pk_test_7891f09e86196e4cca15b93141df3c4df7a92063',

      paymentToken: {
        stripe: {
          publishableKey: 'pk_test_nMd9IihA9sjwaMMeJAyZz7OZ'
        }
      }
    },

    //
    // Data validation
    //
    validators: {

      //
      // Validate the item data
      //
      // Takes a item object as it comes from the UI, and a callback of the form
      // function (invalidFields, item) { ... } where "invalidFields" will be an
      // array of selector strings to identify elements in the UI with invalid
      // data (or empty array if data is valid), and the "item" is a pass through
      // param.
      validateData: function (item, callback) {
        // TODO: implement
        callback([], item);
      }
    },

    //
    // Initialize the services
    init: function (params) {
      $.extend(this.config, params);

      // Initialize Airbrite
      Airbrite.setPublishableKey(this.config.publishableKey);
      Airbrite.setPaymentToken(this.config.paymentToken);
    },

    //
    // Handler for the remove item event
    removeItem: function (elem) {
      var $a = $(elem);

      // Build an item
      var item = {
        quantity: $a.data('quantity'),
        price: $a.data('price'),
        sku: $a.data('sku')
      }

      // Remove the item from the cart
      window.cart.removeItem(item, function (err) {
        if (err) {
          console.log('could not add the following item to the cart:');
          console.dir(itemData);
          return;
        }

        // Remove the item from the item list in the UI
        window.ui.removeItem($a, window.cart.order.fullPrice);
      });
    }
  }

  window.control = control;

  //
  // Hook up navigation between pages.
  //

  //
  // "Checkout" button takes user to "#order-buy"
  $('#btn-goto-checkout').on('click', function(e) {
    e.preventDefault();

    window.ui.routeTo('#order-buy');
  });

  //
  // "Modify order" link takes you back to "#order-product"
  $('#a-modify-order').on('click', function(e) {
    e.preventDefault();

    // Show Order Confirmation (third) page
    window.ui.routeTo('#order-product', '#order-items');
  });

  //
  // "Place Order" link takes you to "#order-confirmation"
  $('#btn-checkout').on('click', function(e) {
    e.preventDefault();

    // Show Order Confirmation (third) page
    window.ui.routeTo('#order-confirmation');
  });

  //
  // Hook up shopping cart events
  //

  //
  // React to changes in "choose color" of the item form
  $('#order-product #select-color').on('change', function (e) {
    console.log('Not implemented yet');
  });

  //
  // React to changes in quantity of the item form
  $('#order-product .select-quantity').on('change', function (e) {
    console.log('Not implemented yet');
  });

  //
  // "Add To Order"
  $('.btn-add').on('click', function (e) {
    // Fetch the data from the UI
    window.ui.itemData(function (err, item) {
      if (err) throw new Error('Error while fetching data from UI');

      // Validate the raw data
      window.control.validators.validateData(item, function (invalidFields, item) {
        // If data is invalid, inform the UI using the element selectors
        if (invalidFields && (invalidFields.length > 0)) {
          window.ui.invalidData(invalidFields);
          return;
        }

        // Build an item object for the cart
        var itemData = {
          sku: item.sku,
          price: parseInt(item.price, 10),
          quantity: parseInt(item.quantity, 10),
        }

        // Send item to cart
        window.cart.addItem(itemData, function (err) {
          if (err) {
            console.log('could not add the following item to the cart:');
            console.dir(itemData);
            return;
          }

          // Update the items list in the UI
          window.ui.addItem(item, window.cart.order.fullPrice);
        });
      });
    });
  });


  //
  // Initialization
  //
  window.cart.init();
  window.ui.init();
  window.control.init();

});
