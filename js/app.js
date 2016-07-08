var query = 'http://localhost:8000/js/data.json';


callAjax( query, function(results) {
  var node = document.getElementById('content');
  node.innerText = results.data;
});



function callAjax( url, callback ) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if( xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200 ) {
      callback( JSON.parse( xmlhttp.responseText ) );
    }
  };
  xmlhttp.open( 'GET', url, true );
  xmlhttp.send();
};
