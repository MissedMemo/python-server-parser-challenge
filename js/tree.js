var _ = require('./utils.js');

var Tree = function( data ) {
  this.value = data;
  this.children = [];
};

Tree.prototype.addNode = function( data ) {
  this.children.push( new Tree(data) );
};


Tree.prototype.findNode = function( data ) {
  return _.find( this.children, function(child) {
    return child.value.pid === data.ppid || child.findNode(data);
  });
};

Tree.prototype.insertNode = function( data ) {
  
  var match = this.findNode( data );

  if( match ) {
    match.addNode( data );
  }
  else {
    this.addNode( data );
  }
};

// output formatted hierarchy -- for debugging
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
var matcher = function( node ) {
  return function(newData) {
    return node.value.pid === newData.ppid;
  };
};
*/

var tree = new Tree( { name: 'explorer.exe', pid: 1, ppid: 5 } );
tree.insertNode( { name: 'cmd.exe', pid: 2, ppid: 1 } );
tree.insertNode( { name: 'python.exe', pid: 3, ppid: 2 } );
tree.insertNode( { name: 'notepad.exe', pid: 4, ppid: 2 } );
console.log( tree.toString() );



