var query = 'http://localhost:8000/js/data.json';


ajax.GET( query, function(results) {

  if( results && Array.isArray(results.data) ) {
    var node = document.getElementById('processes');
    node.appendChild( format(results.data) );
  }
  
  //console.log( results.data );
});


function format( processes ) {

  var table = document.createElement('table');
  table.className = 'hierarchy';

  // HTML5 'template' feature suport still lacking, so we'll hack it...
  table.innerHTML = '<tr>'
                  +   '<th>Name</th>'
                  +   '<th>ID</th>'
                  +   '<th>Parent ID</th>'
                  + '</tr>';
  return table;
}


/*******************************************

example INPUT:

[
  { name: 'explorer.exe', pid: 1, ppid: 5 },
  { name: 'cmd.exe', pid: 2, ppid: 1 },
  { name: 'python.exe', pid: 3, ppid: 2 },
  { name: 'notepad.exe', pid: 4, ppid: 2 }
]

expected OUTPUT:

  Name               ID     Parent ID
  explorer.exe       1      5
  ↳ cmd.exe          2      1
    ↳ notepad.exe    4      2
    ↳ python.exe     3      2

*********************************************/

