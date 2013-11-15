//
// Requires jQuery, the ui and cart objects
//

$(document).ready(function() {

  //
  // Navigation between pages.
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
  // Shopping cart events
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
    alert('Not yet implemented');

    // TODO: collect data
    // window.ui.itemData(function (item) {
    //
    //   TODO: validate product form
    //   that.validateData(item, function (invalidFields, item) {
    //     if (invalidFields.length >= 0) {
    //       // TODO: mark data as invalid in ui
    //       window.ui.invalidData(invalidFields);
    //       return;
    //     }
    //
    //     // TODO: commit to cart
    //     window.cart.addItem(item, function (err) {
    //       if (err) {
    //         console.log('could not add the following item to the cart:');
    //         console.dir(item);
    //         return;
    //       }
    //     });
    //   });
    // });
  });

  //
  // "Remove Item" for each item in the shopping cart
  $('.remove-item').on('click', function (e) {
    alert('Not yet implemented');
  });


  //
  // Initialization
  //
  window.cart.init();
  window.ui.init();

});
