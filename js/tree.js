/* TODO:
  1- node-matching logic should be a passed PARAM!
  2- root-level nodes should be re-tested, and made a child of a
     newly-inserted node if their ppid matches new node's pid 
*/

( function( API ) {

  var Tree = function( data ) {
    this.value = data || null;
    this.children = [];
  };


  Tree.prototype.addNode = function( data ) {
    var node = new Tree(data);
    this.children.push( node );
    return node;
  };


  Tree.prototype.findNode = function( parentId ) {

    if( this.value && this.value.pid === parentId ) {
      return this;
    }

    for( var i = 0; i < this.children.length; i++ ) {
      var match = this.children[i].findNode( parentId );
      if( match ) {
        return match;
      }
    }
  };


  Tree.prototype.insertNode = function( data ) {
      
    var node = this.findNode( data.ppid );
    
    if( node ) {
      node.addNode( data );
    }
    else {
      this.addNode( data );
    }
  };


  Tree.prototype.dfTraverse = function( callback, nesting ) {
    
    if( this.value ) {
      callback( this.value, nesting );
    }

    this.children.forEach( function(child) {
      var level = nesting === undefined ? 0 : nesting +1;
      child.dfTraverse( callback, level );
    }); 
  };

  // console.log indented hierarchy (useful for debugging)
  Tree.prototype.renderToConsole = function() {
    this.dfTraverse( function(data, indent) {
      var spaces = '';
      while( indent-- ) spaces += '     ';
      console.log( spaces, data );
    });
  };


  API.Tree = Tree;

  if( typeof(module) !== 'undefined' )
    module.exports = API; // node support
  else
    window.structures = API;

}( {} ));
