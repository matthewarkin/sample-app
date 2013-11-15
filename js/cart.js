//
// HTML5 Local Storage Support
//

(function () {try{if (!this.localStorage)if (this.globalStorage)try {this.localStorage=this.globalStorage}catch(e) {}else{var a=document.createElement("div");a.style.display="none";document.getElementsByTagName("head")[0].appendChild(a);if (a.addBehavior) {a.addBehavior("#default#userdata");var d=this.localStorage={length:0,setItem:function (b,d) {a.load("localStorage");b=c(b);a.getAttribute(b)||this.length++;a.setAttribute(b,d);a.save("localStorage")},getItem:function (b) {a.load("localStorage");b=c(b);return a.getAttribute(b)},
removeItem:function (b) {a.load("localStorage");b=c(b);a.removeAttribute(b);a.save("localStorage");this.length=0},clear:function () {a.load("localStorage");for (var b=0;attr=a.XMLDocument.documentElement.attributes[b++];)a.removeAttribute(attr.name);a.save("localStorage");this.length=0},key:function (b) {a.load("localStorage");return a.XMLDocument.documentElement.attributes[b]}},c=function (a) {return a.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,
"-")};a.load("localStorage");d.length=a.XMLDocument.documentElement.attributes.length}}}catch(e){}})();


//
// Requires jQuery, and benefits from the local storage
//

(function ($, localStorage) {

  // IE8 issue
  $.support.cors = true;

  var cart = window.cart || {
    config: {
      log: true
    },

    //
    // Namespace to identify cart objects in the local storage
    namespace: 'cart',

    //
    // Line items in the cart
    items: [],

    //
    // Full price for the entire cart (no discounts applied)
    fullPrice: 0,

    //
    // Constructor
    init: function (options) {
      // Adapt the config
      $.extend(this.config, options);

      // Load cart from local storage if exists
      this.load();

      this.config.log && console.log('window.cart component initialized');
    },

    //
    // Load the line items from the local storage, if it exists
    load: function () {
      try {
        var jsonItems = localStorage.getItem(cart.namespace + "_items");
        var jsonItems = localStorage.getItem(cart.namespace + "_fullPrice");
        if (jsonItems) {
          cart.items = JSON.parse(jsonItems);
          this.config.log && console.log('loaded cart data from local storage');
        }
      } catch(e) {}
    },

    //
    // Save the line items to the local storage, if it exists
    save: function () {
      try {
        localStorage.setItem(cart.namespace + "_items", JSON.stringify(cart.items));
        localStorage.setItem(cart.namespace + "_fullPrice", JSON.stringify(cart.fullPrice));
        this.config.log && console.log('saved cart data to local storage');
      } catch(e) {}
    },

    //
    // Clear the line items from the local storage, if it exists
    clear: function () {
      try {
        localStorage.removeItem(cart.namespace + "_items");
        localStorage.removeItem(cart.namespace + "_fullPrice");
        this.config.log && console.log('cleared cart data in local storage');
      } catch(e) {}
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
      if (item.sku !== undefined) callback('item has no SKU');
      if (item.price !== undefined) callback('item has no price');
      if (item.quantity !== undefined) callback('item has no quantity');

      // Acculumulate the price of this item/s
      this.fullPrice += item.price * item.quantity;
      // Add to the line items.
      this.items.push({
        sku: item.sku,
        quantity: item.quantity
      });

      this.config.log && console.log('window.cart: added item to the cart')

      callback(null);
    }
  }

  // Put the cart in the global namespace
  window.cart = cart;

})(jQuery, window.localStorage);
