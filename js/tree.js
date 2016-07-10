( function( API, _ ) {

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


  /* TODO: node-matching logic should be a passed PARAM!
  var matcher = function( newData ) {
    return function(node) {
      return node.value.pid === newData.ppid;
    };
  };
  */


  Tree.prototype.insertNode = function( data ) {
    
    var match = this.findNode( data );

    if( match ) {
      match.addNode( data );
    }
    else {
      this.addNode( data );
    }
  };


  Tree.prototype.bfTraverse = function( callback ) {

    var traverseSiblings = function(siblings) {
      siblings.forEach( function(sibling) {
        callback(sibling.value);
      });
      siblings.forEach( function(sibling) {
        traverseSiblings( sibling.children );
      });
    };

    traverseSiblings( [this] );  
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


  API.Tree = Tree;

  if( typeof(module) !== 'undefined' )
    module.exports = API; // node support
  else
    window.structures = API;

}( {}, window.utils ));
