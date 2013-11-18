$(document).ready(function() {

  var ui = window.ui || {

    config: {
      log: true,
      routeTransitionDuration: 1000
    },

    //
    // Use the ID of the page container element to identify the route
    routes: {
      products: '#order-product',
      buy: '#order-buy',
      confirmation: '#order-confirmation',

      current: null
    },

    //
    // Initialize the UI controller
    init: function (options) {
      // Adapt the config
      $.extend(this.config, options);

      // Set the starting route to be the products page
      this.routes.current = this.routes.products;

      this.config.log && console.log('window.ui component initialized');
    },

    //
    // Transition from the current route
    //
    // params (object):
    //   * elementToScrollTo (string): selector for the element to scroll to after route transition
    //
    // params (string): the equivalente of the 'elementToScrollTo' in the object definition
    routeTo: function (route, params) {
      if (typeof params === 'string')
        params = {
          elementToScrollTo: params
        }
      params = params || {};

      this.config.log && console.log('Navigating from %s to %s', this.routes.current, route);

      // Hide the current route page
      $(this.routes.current).hide('fast');

      // Show the next page
      $(route).show('fast');

      // Reset the current page
      this.routes.current = route;

      // Scroll the page
      $('html, body').animate({
        scrollTop: (params.elementToScrollTo) ? $(params.elementToScrollTo).offset().top : 0
      }, this.config.routeTransitionDuration);
    },

    //
    // Fetch data from forms
    //

    //
    // Fetch data from the product form. Returns an object:
    //   {
    //     price: "2000",
    //     sku: "some-sku-value",
    //     quantity: "3",
    //     color: {
    //       selector: '#order-product #select-color',
    //       value: 'Red'
    //     },
    //     size: {
    //       selector: '#order-product #select-size',
    //       value: 'small'
    //     }
    //   }
    itemData: function (callback) {
      // Fetch item color data and its price
      var colorSelector = '#order-product #select-color';
      var $color = $(colorSelector + ' option:selected');
      // Fetch item size data
      var sizeSelector = '#order-product #select-size';
      var $size = $(sizeSelector + ' option:selected');

      var payload = {
        sku: $color.data('sku'),
        quantity: $('#order-product .select-quantity option:selected').val(),
        price: $color.data('price'),
        color: {
          selector: colorSelector,
          value: $color.val(),
        },
        size: {
          selector: sizeSelector,
          value: $size.val()
        }
      }
      this.config.log && console.log('window.ui: built raw data for item');
      this.config.log && console.dir(payload);

      callback(null, payload);
    },


    //
    // Allow to react to user interaction
    //

    //
    // Update the per item sub-total.
    //
    // Takes as input an object like the one returned from itemData(), and a number for the sub-total
    addItem: function (item, total) {

      // The item element inlines the code to call removeItem() in the controller.
      var html  = '<tr>';
      html += '<td colspan="3">';
      html += '<div class="row">';
      html += '<div style="margin-left:10px;" class="fr">';
      html += '<strong>' + item.quantity + ' @ $' + item.price / 100 + '</strong>';
      html += '</div>';
      html += '<div>';
      html += '<strong>KOala</strong>';
      html += '</div>';
      html += '</div> <!-- .row -->';
      html += '<div class="row">';
      html += '<div>';
      html += 'Choose a color<strong>&nbsp;&nbsp;' + item.color.value + '</strong>';
      html += '</div>';
      html += '</div> <!-- .row -->';
      html += '<div class="row">';
      html += '<div>';
      html += 'What Size?<strong>&nbsp;&nbsp;' + item.size.value + '</strong>';
      html += '</div>';
      html += '</div> <!-- .row -->';
      html += '<div class="row">';
      html += '<small><a class="remove-item" data-price="' + item.price + '" data-quantity="' + item.quantity + '" data-sku="' + item.sku + '" href="#order-items">Remove Item</a></small>';
      html += '</div> <!-- .row -->';
      html += '</td>';
      html += '</tr>';

      // Inject the new item to the list
      $('#order-product tbody').append(html);

      // Update the subtotal
      $('#order-product #subtotal').text(total / 100);
    },

    //
    // Remove an item from the order list
    //
    // Takes the element that triggered the remove event, and the new subtotal
    removeItem: function ($removeElem, total) {
      // Get the parent element of the item in the list
      var itemElem = $removeElem.parent().parent().parent().parent();

      // Remove the item element from the list
      itemElem.remove();
      this.config.log && console.log('window.ui: removed item.');

      // Update the subtotal
      $('#order-product #subtotal').text(total / 100);
      this.config.log && console.log('window.ui: updated sub-total.');
    },

    //
    // Validation notifications
    //

    //
    // Invalid item fields
    //
    // Takes a list of selector strings to show messages for
    invalidData: function (invalidFields) {
      // TODO: implement
      this.log && console.log('window.ui: invalid data notitications not yet implemented.');
    },

    //
    // Invalid items in the list
    //
    // Takes a list of selector strings to show messages for
    invalidItems: function (invalidFields) {
      // TODO: implement
      this.log && console.log('window.ui: invalid items data notitications not yet implemented.');
    }
  };

  // Hook the UI controller to the global object
  window.ui = ui;
});
