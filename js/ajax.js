/* 
  We can't use any libraries, so we use a low-level ajax routine
  and wrap it in an IIFE to demonstrate modularity and attention
  to separation of concerns
*/

( function( API ) {

  API.GET = function( url, callback ) {
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
    window.ajax = API;

}( {} ));