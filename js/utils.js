/* 
  We can't use any libraries, so we'll define a low-level ajax routine,
  and some 'underscore'-like helper methods (for less verbose, more
  'functional' style of code in our tree), and wrap them in an IIFE to
  demonstrate modularity and attention to separation of concerns
*/

( function( API ) {

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

  if( typeof(module) !== 'undefined' )
    module.exports = API; // node support
  else
    window.utils = API;

}( {} ));