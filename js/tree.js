var _ = require('./utils.js');

var Tree = function( data ) {
  this.value = data;
  this.children = [];
};

Tree.prototype.addNode = function( data ) {
  this.children.push( new Tree(data) );
};

Tree.prototype.insertNode = function( data, comparator ) {
  var target = _.find( this.children, comparator );
  if( target ) {
    target.addNode( data );
  }
  else {
    this.addNode(data);
  }
};

/*
[
  { name: 'explorer.exe', pid: 1, ppid: 5 },
  { name: 'cmd.exe', pid: 2, ppid: 1 },
  { name: 'python.exe', pid: 3, ppid: 2 },
  { name: 'notepad.exe', pid: 4, ppid: 2 }
]
*/

var tree = new Tree( { name: 'explorer.exe', pid: 1, ppid: 5 } );

tree.insertNode( { name: 'cmd.exe', pid: 2, ppid: 1 }, function(node) {
  console.log( 'name:', name );
  console.log( 'pid:', pid );
  console.log( 'ppid:', ppid );
  return node.ppid === pid;
});
console.log( 'tree:', tree, tree.children[0] );



