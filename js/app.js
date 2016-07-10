var url = window.location + 'js/data.json';

utils.ajaxGet( url, function(results) {

  if( results && Array.isArray( results.data ) ) {
    var hierarchy = translate( results.data );
    var node = document.getElementById('processes');
    node.appendChild( createTable( hierarchy ) );
  }
});


function translate( data ) {

  var tree = null;

  data.forEach( function( processInfo, i ) {
    if( i === 0 ) {
      tree = new structures.Tree( processInfo );
    } else {
      tree.insertNode( processInfo );
    }
  });

  console.log( tree.toString() );
  
  return tree;
}


function createTable( tree ) {

  var tableRows = '<thead>'
                +   '<tr>'
                +     '<th>Name</th>'
                +     '<th>ID</th>'
                +     '<th>Parent ID</th>'
                +   '</tr>'
                + '</thead>';

  tree.dfTraverse( function( data, indentAmount ) {
    console.log( 'node:', data, 'indent:', indentAmount );
  });
  
  /*
  processes.forEach( function( data, i ) {
    
    if( i === 0 ) {
      tableRows += '<tbody>';
    }
    
    tableRows += '<tr>'
              +    '<td>' + data.name + '</td>'
              +    '<td>' + data.pid  + '</td>'
              +    '<td>' + data.ppid + '</td>'
              +  '</tr>';

    if( i === (data.length -1) ) {
      tableRows += '</tbody>';
    }

  });
  */

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

