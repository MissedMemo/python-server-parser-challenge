var url = window.location + 'js/data.json';

utils.ajaxGet( url, function(results) {

  if( results && Array.isArray( results.data ) ) {
    var hierarchy = translate( results.data );
    var node = document.getElementById('processes');
    node.appendChild( createTable( hierarchy ) );
  }
});


function translate( data ) {

  var tree = new structures.Tree();

  data.forEach( function( processInfo ) {
    tree.insertNode( processInfo );
  });

  tree.renderToConsole(); // debugging...
  
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

  tableRows += '<tbody>';

  tree.dfTraverse( function( data, indent ) {
    
    tableRows += '<tr>'
              +    '<td>' + data.name + '</td>'
              +    '<td>' + data.pid  + '</td>'
              +    '<td>' + data.ppid + '</td>'
              +  '</tr>';
  });

  tableRows += '</tbody>';
  
  var table = document.createElement('table');
  table.className = 'hierarchy';

  table.innerHTML = tableRows;

  return table;
}

