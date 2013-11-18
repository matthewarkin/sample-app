//
// Requires jQuery, the ui and cart objects
//

$(document).ready(function() {

  //
  // Data validation
  //
  var validators = {

    //
    // Validate the item data
    //
    // Takes a item object as it comes from the UI, and a callback of the form
    // function (invalidFields, item) { ... } where "invalidFields" will be an
    // array of selector strings to identify elements in the UI with invalid
    // data (or empty array if data is valid), and the "item" is a pass through
    // param.
    validateData: function (item, callback) {
      var invalidFields = [];
      if (!item.color || !item.color.value) {
        invalidFields.push('#select-color');
      }
      callback(invalidFields, item);
    },

    //
    // Validate the items order before moving on to checkout
    //
    // Takes a callback of the form function (invalidFields) { ... }
    // where "invalidFields" will be an array of selector strings to identify
    // elements in the UI with invalid data (or empty array if data is valid).
    validateItemsData: function (callback) {
      // TODO: implement. Validate there's at least one item in the list.
      callback([]);
    },

    //
    // User email validation
    //
    // Takes an object 'data' with a string field for each personal data
    // ('email'), and a function of the form function (invalidFields, data)
    // {...}  where "invalidFields" will be an array of selector strings to
    // identify elements in the UI with invalid data (or empty array if data is
    // valid), and the "item" is a pass through param.
    validatePersonalData: function (data, callback) {
      // Check for valid email
      var email = $.trim(data.email);
      var invalidFields = [];

      var emailIsValid =  (email.length > 0 && email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i));
      if (! emailIsValid) {
        invalidFields = ['#user-email'];
      }
      callback(invalidFields, data);
    }
  }


  //
  // Hook up navigation between pages.
  //

  //
  // "Checkout" button takes user to "#order-buy"
  $('#btn-goto-checkout').on('click', function(e) {
    e.preventDefault();

    // Validate the raw data
    validators.validateItemsData(function (invalidFields, item) {
      // If data is invalid, inform the UI using the element selectors
      if (invalidFields.length > 0) {
        window.ui.invalidItems(invalidFields);
        return;
      }

      // The the user to data entry
      window.ui.routeTo('#order-buy');
    });
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
      validators.validateData(item, function (invalidFields, item) {
        // If data is invalid, inform the UI using the element selectors
        if (invalidFields.length > 0) {
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
  // Each "Remove Item"
  $(document).on("click", ".remove-item", function(elem) {
    var $a = $(elem.target);

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
  });


  //
  // "place Order"
  $('btn-checkout').on('click', function (e) {
  });


  //
  // Hook the validation of user information: personal, shipping and payment.
  //

  //
  // Validate personal information: email
  $('#user-email').on('blur', function (e) {
    var data = {
      email: $(e.target).val()
    }

    validators.validatePersonalData(data, function (invalidFields, customerData) {
      // If data is invalid, inform the UI using the element selectors
      if (invalidFields.length > 0) {
        window.ui.invalidData(invalidFields);
        return;
      }

      // Update the customer information in the order
      window.cart.updateCustomer(customerData);
    });
  });


  //
  // Initialization
  //

  window.cart.init();
  window.ui.init();

  //
  // Initialize Airbrite service
  Airbrite.setPublishableKey('pk_test_7891f09e86196e4cca15b93141df3c4df7a92063');
  Airbrite.setPaymentToken({
    stripe: {
      publishableKey: 'pk_test_nMd9IihA9sjwaMMeJAyZz7OZ'
    }
  });
});
