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
    // function (invalidFields) { ... } where "invalidFields" will be an array
    // of selector strings to identify elements in the UI with invalid data, or
    // empty array if data is valid.
    validateData: function (item, callback) {
      var invalidFields = [];
      if (!item.color || !item.color.value) {
        invalidFields.push('#select-color');
      }
      callback(invalidFields);
    },

    //
    // Validate the items order before moving on to checkout
    //
    // Takes a callback of the form function (empty) { ... } where "empty" will
    // be a boolean to describe whether there are any items in the item list.
    validateItemsData: function (items, callback) {
      var empty = (items.length == 0) ? true : false;
      callback(empty);
    },

    //
    // User email validation
    //
    // Takes an object 'data' with a string field for each personal data
    // ('email'), and a function of the form function (invalidFields) {...}
    // where "invalidFields" will be an array of selector strings to identify
    // elements in the UI with invalid data, or empty array if data is valid.
    validatePersonalData: function (data, callback) {
      // Check for valid email
      var email = $.trim(data.email);
      var invalidFields = [];

      var emailIsValid =  (email.length > 0 && email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i));
      if (! emailIsValid) {
        invalidFields = ['#user-email'];
      }
      callback(invalidFields);
    },

    //
    // Shipment validation
    //
    // Takes an object 'data' with a string field for each shipment data , and
    // a function of the form function (invalidFields) {...}  where
    // "invalidFields" will be an array of selector strings to identify
    // elements in the UI with invalid data, or empty array if data is valid.
    validateShippingAddress: function (data, callback) {
      var invalidFields = [];

      // Name must not be empty
      if (! data.name) invalidFields.push('input[name=name]');

      // line1 must not be empty
      if (! data.line1) invalidFields.push('input[name=street]');

      // city must not be empty
      if (! data.city) invalidFields.push('input[name=city]');

      // zip must not be empty, and must be a number
      if (! (data.zip && (parseInt(data.zip, 10) && isFinite(data.zip))) ) invalidFields.push('input[name=zip]');

      callback(invalidFields);
    },

    //
    // Payment validation
    validatePaymentData: function (data, callback) {
      var invalidFields = [];

      // Verify card expiration
      if (! $.payment.validateCardExpiry(data.exp_month, data.exp_year)) {
        invalidFields.push('select[name=card_exp_month]');
        invalidFields.push('select[name=card_exp_year]');
      }

      // Verify credit card number
      if (! $.payment.validateCardNumber(data.number)) invalidFields.push('input[name=ccard]');

      // Verify the CVC against
      var cardType = $.payment.cardType(data.number);
      if (! $.payment.validateCardCVC(data.cvc, cardType)) invalidFields.push('input[name=cvc]');

      callback(invalidFields);
    },
  }


  //
  // Hook up navigation between pages.
  //

  //
  // "Checkout" button takes user to "#order-buy"
  $('#btn-goto-checkout').on('click', function(e) {
    e.preventDefault();

    var items = window.cart.order.getItems() || [];

    // Validate the raw data
    validators.validateItemsData(items, function (empty) {
      // If data is invalid, inform the UI using the element selectors
      if (empty) {
        // TODO: use a visual signal to show the item list is empty
        return;
      }

      // Update total before moving to the order-buy page
      $('.label-summary-total').text('$' + window.cart.order.fullPrice / 100 + '.00');

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
  // Hook up shopping cart events
  //

  //
  // React to changes in "choose color" of the item form
  $('#order-product #select-color').on('change', function () {
    // Update the item total
    var price = $('#select-color option:selected').data('price');
    var quantity = parseInt($('.select-quantity').val(), 10);
    $('#item-total-price').text('$' + price * quantity / 100 + '.00');
  });

  //
  // React to changes in quantity of the item form
  $('#order-product .select-quantity').on('change', function (e) {
    // Update the item total
    var price = $('#select-color option:selected').data('price');
    var quantity = parseInt($('.select-quantity').val(), 10);
    $('#item-total-price').text('$' + price * quantity / 100 + '.00');
  });

  //
  // "Add To Order"
  $('.btn-add').on('click', function (e) {
    // Fetch the data from the UI
    window.ui.itemData(function (err, item) {
      if (err) throw new Error('Error while fetching data from UI');

      // Validate the raw data
      validators.validateData(item, function (invalidFields) {
        // If data is invalid, inform the UI using the element selectors
        if (invalidFields.length > 0) {
          window.ui.invalidData(invalidFields);
          return;
        }

        // Show the item list
        $('#order-items').show('fast');

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

      // Hide the item list if there are no items
      if (window.cart.order.getItems().length == 0) {
        $('#order-items').hide('fast');
      }
    });
  });

  //
  // "place Order"
  $('#btn-checkout').on('click', function () {
    var allInvalidFields = [];

    // Validate personal data
    var customerData = {
      email: $('#user-email').val()
    }
    validators.validatePersonalData(customerData, function (invalidFields) {
      // Accumulate any invalid fields found
      if (invalidFields.length > 0) $.merge(allInvalidFields, invalidFields);

      // Validate shipping information
      var shippingAddressData = {
        name: $('input[name=name]').val(),
        line1: $('input[name=street]').val(),
        city: $('input[name=city]').val(),
        state: $('select[name=state]').val(),
        zip: $('input[name=zip]').val(),
        country: $('select[name=country]').val()
      }
      validators.validateShippingAddress(shippingAddressData, function (invalidFields) {
        // Accumulate any invalid fields found
        if (invalidFields.length > 0) $.merge(allInvalidFields, invalidFields);

        // Validate payment information
        var paymentData = {
          currency: 'USD',
          number: $('input[name=ccard]').val(),
          cvc: $('input[name=cvc]').val(),
          exp_month: $('select[name=card_exp_month]').val(),
          exp_year: $('select[name=card_exp_year]').val(),
          amount: window.cart.order.fullPrice,
        }
        validators.validatePaymentData(paymentData, function (invalidFields) {
          // Accumulate any invalid fields found
          if (invalidFields.length > 0) $.merge(allInvalidFields, invalidFields);

          // Resolve validation errors
          if (allInvalidFields.length > 0) {
            window.ui.invalidData(allInvalidFields);

            // TODO: send a visual signal via the "Place Order" button
          }
          else {

            // Disable the checkout button while the order is processed
            $('#btn-checkout').attr('disabled', 'disabled');

            // Associate the data to the order
            window.cart.order.setCustomer(customerData);
            window.cart.order.setShippingAddress(shippingAddressData);
            window.cart.order.addPayment(paymentData, function (response, message) {
              // Failed processing payment information
              if (response === 'error') {
                // TODO: send a visual signal to the user, the service rejected the ccard information
                alert(message);

                // Disable the checkout button while the call is being made
                $('#btn-checkout').removeAttr('disabled');

              } else {

                // Submit the order though Airbrite
                window.cart.placeOrder(function (err) {
                  // TODO: send a visual signal to the user, the service rejected the order
                  alert(err);

                  // Disable the checkout button while the call is being made
                  $('#btn-checkout').removeAttr('disabled');
                });
              }
            });
          }
        });
      });
    });
  });


  //
  // Initialization
  //

  window.cart.init();
  window.ui.init();

  Airbrite.setPublishableKey('pk_test_7891f09e86196e4cca15b93141df3c4df7a92063');
  Airbrite.setPaymentToken({
    stripe: {
      publishableKey: 'pk_test_nMd9IihA9sjwaMMeJAyZz7OZ'
    }
  });
});
