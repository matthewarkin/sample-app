//
// Requires jQuery, the ui and cart objects
//

$(document).ready(function() {

  //
  // Navigation between pages.
  //

  //
  // "Checkout" button takes user to "#order-buy"
  $('#btn-goto-checkout').click(function(e) {
    e.preventDefault();

    window.ui.routeTo('#order-buy');
  });

  //
  // "Modify order" link takes you back to "#order-product"
  $('#a-modify-order').click(function(e) {
    e.preventDefault();

    // Show Order Confirmation (third) page
    window.ui.routeTo('#order-product');
  });

  //
  // "Place Order" link takes you to "#order-confirmation"
  $('#btn-checkout').click(function(e) {
    e.preventDefault();

    // Show Order Confirmation (third) page
    window.ui.routeTo('#order-confirmation');
  });

  //
  // Initialization
  //
  window.cart.init();
  window.ui.init();

});
