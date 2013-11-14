//
// Requires jQuery, and benefits from the local storage
//

(function ($, localStorage) {

  // IE8 issue
  $.support.cors = true;

  var cart = window.cart || {
    //
    // Namespace to identify cart objects in the local storage
    namespace: 'cart',

    //
    // Line items in the cart
    items: [],

    //
    // Constructor
    init: function (options) {
      // Load cart from local storage if exists
      this.load();
    },

    //
    // Load the line items from the local storage, if it exists
    load: function () {
      try {
        var jsonItems = localStorage.getItem(cart.namespace + "_items");
        if (jsonItems) {
          cart.items = JSON.parse(jsonItems);
        }
        // Should the UI be updated?
      } catch(e) {}
    },

    //
    // Save the line items to the local storage, if it exists
    save: function () {
      try {
        localStorage.setItem(cart.namespace + "_items", JSON.stringify(cart.items));
      } catch(e) {}
    },

    //
    // Clear the line items from the local storage, if it exists
    clear: function () {
      try {
        localStorage.removeItem(cart.namespace + "_items");
      } catch(e) {}
    }
  }

  // Put the cart in the global namespace
  window.cart = cart;

})(jQuery, window.localStorage);


//
// HTML5 Local Storage Support
//
(function () {try{if (!this.localStorage)if (this.globalStorage)try {this.localStorage=this.globalStorage}catch(e) {}else{var a=document.createElement("div");a.style.display="none";document.getElementsByTagName("head")[0].appendChild(a);if (a.addBehavior) {a.addBehavior("#default#userdata");var d=this.localStorage={length:0,setItem:function (b,d) {a.load("localStorage");b=c(b);a.getAttribute(b)||this.length++;a.setAttribute(b,d);a.save("localStorage")},getItem:function (b) {a.load("localStorage");b=c(b);return a.getAttribute(b)},
removeItem:function (b) {a.load("localStorage");b=c(b);a.removeAttribute(b);a.save("localStorage");this.length=0},clear:function () {a.load("localStorage");for (var b=0;attr=a.XMLDocument.documentElement.attributes[b++];)a.removeAttribute(attr.name);a.save("localStorage");this.length=0},key:function (b) {a.load("localStorage");return a.XMLDocument.documentElement.attributes[b]}},c=function (a) {return a.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,
"-")};a.load("localStorage");d.length=a.XMLDocument.documentElement.attributes.length}}}catch(e){}})();
