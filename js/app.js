var query = 'http://localhost:8000/js/data.json';


ajax( query, function(results) {
  //var node = document.getElementById('content');
  //node.innerText = results.data;
});



function ajax( url, callback ) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if( xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200 ) {
      callback( JSON.parse( xmlhttp.responseText ) );
    }
  };
  xmlhttp.open( 'GET', url, true );
  xmlhttp.send();
};


/***************************************
  Name               ID     Parent ID
  explorer.exe       1      5
  ↳ cmd.exe          2      1
    ↳ notepad.exe    4      2
    ↳ python.exe     3      2
****************************************/
