$(document).ready(function() {

  //
  // Navigation between pages.
  //

  //
  // "Checkout" button takes user to "#order-buy"
  $('#btn-goto-checkout').click(function(e) {
    e.preventDefault();

    // Hide Order Product (first) page
    $('#order-product').hide('fast');

    // Show Order Buy (second) page
    $('#order-buy').show('fast');

    // Scroll to top of the second page
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

  //
  // "Modify order" link takes you back to "#order-product"
  $('#a-modify-order').click(function(e) {

    // Hide Order Buy (second) page
    $('#order-buy').hide('fast');

    // Show Order Confirmation (third) page
    $('#order-product').show('fast');

    // Scroll to top of the third page
    $('html, body').animate({
      scrollTop: $('#order-items').offset().top
    }, 1000);
  });

  //
  // "Place Order" link takes you to "#order-confirmation"
  $('#btn-checkout').click(function(e) {

    // Hide Order Buy (second) page
    $('#order-buy').hide('fast');

    // Show Order Confirmation (third) page
    $('#order-confirmation').show('fast');

    // Scroll to top of the confirmation page
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });
});
