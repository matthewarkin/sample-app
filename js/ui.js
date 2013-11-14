$(document).ready(function() {

  var ui = window.ui || {

    defaults: {
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
      // Adapt the defaults
      $.extend(this.defaults, options);

      // Set the starting route to be the products page
      this.routes.current = this.routes.products;

      this.defaults.log && console.log('window.ui component initialized');
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

      this.defaults.log && console.log('Navigating from %s to %s', this.routes.current, route);

      // Hide the current route page
      $(this.routes.current).hide('fast');

      // Show the next page
      $(route).show('fast');

      // Reset the current page
      this.routes.current = route;

      // Scroll the page
      $('html, body').animate({
        scrollTop: (params.elementToScrollTo) ? $(params.elementToScrollTo).offset().top : 0
      }, this.defaults.routeTransitionDuration);
    }

  };

  // Hook the UI controller to the global object
  window.ui = ui;
});
