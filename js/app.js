var url = window.location + 'js/data.json';

ajax.GET( url, function(results) {

  if( results && Array.isArray(results.data) ) {
    var node = document.getElementById('processes');
    node.appendChild( createTable(results.data) );
  }
});


function createTable( processes ) {

  var tableRows = '<tr>'
                +   '<th>Name</th>'
                +   '<th>ID</th>'
                +   '<th>Parent ID</th>'
                + '</tr>';
  
  processes.forEach( function( data ) {
    
    tableRows += '<tr>'
              +    '<td>' + data.name + '</td>'
              +    '<td>' + data.pid  + '</td>'
              +    '<td>' + data.ppid + '</td>'
              + '</tr>';
  });

  var table = document.createElement('table');
  table.className = 'hierarchy';

  table.innerHTML = tableRows;

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
    ↳ python.exe     3      2
    ↳ notepad.exe    4      2


*********************************************/

