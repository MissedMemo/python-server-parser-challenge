var _ = require('./utils.js');

var Tree = function( data ) {
  this.value = data;
  this.children = [];
};

Tree.prototype.addNode = function( data ) {
  this.children.push( new Tree(data) );
};

Tree.prototype.insertNode = function( data, comparator ) {
  var predicate = comparator(data);
  console.log( 'predicate:', predicate );
  var target = _.find( this.children, predicate );
  if( target ) {
    target.addNode( data );
  }
  else {
    this.addNode(data);
  }
};

Tree.prototype.toString = function( offset ) {

  var spaces = offset || '';
  var string = spaces + 'I am node: '   + this.value.name
                            + '(pid:'   + this.value.pid
                            + ', ppid:' + this.value.ppid
                            + '), and ';

  if( this.children.length === 0 ) {
    string += 'I am childless\n';
  } else {
    string += 'these are my kids:\n';

    this.children.forEach( function(child) {
      string += child.toString( spaces + '   ' );
    });
  }

  return string;
};

/*
[
  { name: 'explorer.exe', pid: 1, ppid: 5 },
  { name: 'cmd.exe', pid: 2, ppid: 1 },
  { name: 'python.exe', pid: 3, ppid: 2 },
  { name: 'notepad.exe', pid: 4, ppid: 2 }
]
*/

var nodeMatch = function( newNodeData ) {
  return function( existingNodeData ) {
    return newNodeData.ppid === existingNodeData.pid;
  };
};

var tree = new Tree( { name: 'explorer.exe', pid: 1, ppid: 5 } );

tree.insertNode( { name: 'cmd.exe', pid: 2, ppid: 1 }, nodeMatch );
tree.insertNode( { name: 'python.exe', pid: 3, ppid: 2 }, nodeMatch );

console.log( tree.toString() );



