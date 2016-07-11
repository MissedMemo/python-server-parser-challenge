/* 
  We can't use any 3rd party libraries, so we'll define a low-level ajax routine
  wrapped in an IIFE to demonstrate modularity and attn. to separation of concerns
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

  if( typeof(module) !== 'undefined' )
    module.exports = API; // node support
  else
    window.utils = API;

}( {} ));