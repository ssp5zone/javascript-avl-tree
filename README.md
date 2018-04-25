 # JavaScript AVL Tree 
 
 A simple pure javascript [AVL Tree](https://en.wikipedia.org/wiki/AVL_tree) structure based on recursive updates on Binary Search Tree.

 ## USAGE
 ```javascript
 var tree = new AVLTree(); // Initialize
 tree.add(value);          // Add a new node
 tree.remove(value);       // Remove an existing node
 tree.print();             // Print the tree as a text-pyramid in console
 tree.min();               // Find smallest node
 tree.max();               // Find largest node
 tree.find(value);         // Find node with given value
 tree.destroy();           // Clears the root
 ```
 
 **Note:** To maintain the spacing while using `tree.print()`, any value greater than 2 digits/characters will be converted to a legend labelled as 'a' to 'z'. The label and key would be printed seperatly. 
 
## Licence
Licenced under GNU GENERAL PUBLIC LICENSE v3.0. It is free to copy, use and distribute.
