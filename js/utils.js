/* 
  We can't use any libraries, so we'll define a low-level ajax routine,
  and some 'underscore'-like helper methods (for less verbose, more
  'functional' style of code in our tree), and wrap them in an IIFE to
  demonstrate modularity and attention to separation of concerns
*/

( function( API ) {


  // Ajax GET request
  API.ajaxGet = function( url, callback ) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if( xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200 ) {
        callback( JSON.parse( xmlhttp.responseText ) );
      }
    };
    xmlhttp.open( 'GET', url, true );
    xmlhttp.send();
  };


  // return first matching element, or undefined
  API.find = function( collection, predicate ) {
    /*
     for completeness sake, we'll include array support,
     even though we're only operating on objects...
    */
    if( Array.isArray(collection) ) {
      for( var i = 0; i < collection.length; i++ ) {
        if( predicate(collection[i]) ) {
          return collection[i];
        }
      }
    }
    else {
      for( var key in collection ) {
        if( predicate(collection[key]) ) {
          return collection[key];
        }
      }
    }
  };


  if( typeof(module) !== 'undefined' )
    module.exports = API; // node support
  else
    window.utils = API;

}( {} ));