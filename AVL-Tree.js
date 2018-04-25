/**
* ##AVL Tree 
* 
* This was derived from Recursive add on uni-directional Tree algorithm
*
* ******* 
* ###USAGE
* ```
* var tree = new AVLTree();
* tree.add(value);
* tree.remove(value);
* tree.min(); 
* tree.max(); 
* tree.find(value);
* tree.destroy();
* ```
*/
function AVLTree() {

    // points to the top most of tree
    this.root = null;

    this.clear = this.destroy = function() {
        this.root = null;
    };

    this.insert = this.add = function (val) {
        this.root = add(val, this.root);
    };

    this.delete = this.remove = function(val) {
        this.root = remove(val, this.root);
    };

    this.find = function(val) {
        return find(val, this.root);
    };

    this.min = function() {
        return findMin(this.root);
    };

    this.max = function() {
        return findMax(this.root);
    };

    /**
     * Prints the given tree as a text-pyramid
     * in console
     * @returns {String[][]}
     */
    this.print = function() {
        if(!this.root) return;
        var height, nodeList = [this.root], newList; 
        var strBuffer, gap, legends = []; // These variables are only need to generate a text-pyramid
        for(height = this.root.height; height!=-1; height--) {
            newList = []; 
            strBuffer = fiboncciSpace(height);  // the initial gap
            gap = fiboncciSpace(height + 1);    // gap between nodes
            nodeList.forEach(function(node) {
                node = node || { value: " "};
                strBuffer = strBuffer
                    .concat(getChar(node))
                    .concat(gap);
                newList.push(node.left); newList.push(node.right);
            });
            strBuffer = strBuffer.trimRight();
            console.log(strBuffer);
            nodeList = newList;
        }

        // print the legends if any
        legends.forEach(function(legend) {
            console.log(legend.key, " = ", legend.value);
        });

        // this function was written to replace big numbers by
        // alternate legends so as the pyramid is not disturbed
        function getChar(node) {
            if((node.value + '').length > 1) {
                var key = String.fromCharCode(legends.length + 97);
                legends.push({
                    key: key,
                    value: node.value,
                });
                return key;
            } else {
                return node.value;
            }
        }

    };
    
    /**
     * Adds a given values appropriatly
     * under a given node and returns updated node
     * **********
     * **Note:** This uses recursive-updated BST insert with balancing
     * **********
     * @param {any} val 
     * @param {Node} node 
     * @returns {Node}
     */
    function add(val, node) {
        
        // leaf node condition
        if(!node) return new Node(val);
        
        // where to insert - left or right
        var position = val < node.value ? 'left' : 'right';
        node[position] = add(val, node[position]);

        return balance(node);
    }

    /**
     * Searches and removes a given values 
     * under the given node and returns updated node
     * **********
     * **Note:** This uses recursive-updated BST remove with balancing
     * **********
     * @param {any} val 
     * @param {Node} node 
     * @returns {Node}
     */
    function remove(val, node) {
        if(!node) return null;
        if(val === node.value) {
            // both nodes exist
            if(node.left && node.right) {
                var minNode = findMin(node.right);
                node.value = minNode.value;
                node.right = remove(minNode.value, node.right);  // Since, we have copied the min node, remove it
                return balance(node);

            }
            // only 1 or no nodes exist 
            else {
                return node.left ? node.left : node.right;
            }
        }
        var position = val < node.value ? 'left' : 'right';
        node[position] = remove(val, node[position]);

        return balance(node);
        
    }

    /**
     * Checks if the node is balanced and returns,
     * * < 0 if it is leaning towards left
     * * \> 0 if it is leaning towards right
     * * 0 if node is balanced
     * @param {Node} node 
     * @returns {number}
     */
    function getBalance(node) {
        if(node.left && node.right) {
            return node.right.height - node.left.height;
        } else {
            return node.height * (!node.right ? -1 : 1);
        }
    }

    /**
     * Get height of the given node
     * @param {Node} node 
     * @returns {number}
     */
    function getHeight(node) {
        if(node.right && node.left) {
            return Math.max(node.left.height, node.right.height) + 1;
        } else if(node.right) {
            return node.right.height + 1;
        } else if(node.left) {
            return node.left.height + 1;
        }
        return 0;
    }

    /**
     * An internal function to Left Rotate 
     * a givel AVL Tree
     * @param {Node} node 
     * @returns {Node}
     */
    function leftRotate(node) {
        var right = node.right;
        node.right = right.left;
        right.left = node;
        node.height = getHeight(node); // node is shifted, update its height
        right.right.height = getHeight(right.right);
        right.height = getHeight(right);
        return right;
    }

    /**
     * An internal function to Right Rotate 
     * a givel AVL Tree
     * @param {Node} node 
     * @returns {Node}
     */
    function rightRotate(node) {
        var left = node.left;
        node.left = left.right;
        left.right = node;
        node.height = getHeight(node); // node is shifted, update its height
        left.left.height = getHeight(left.left);
        left.height = getHeight(left);
        return left;
    }

    /**
     * Find the lowest value node in a given tree
     * @param {Node} node 
     * @returns {Node}
     */
    function findMin(node) {
		return node.left ? findMin(node.left) : node;
	}

    /**
     * Find the highest value node in a given tree
     * @param {Node} node 
     * @returns {Node}
     */
	function findMax(node) {
		return node.right ? findMax(node.right) : node;
	}

    /**
     * Finds the node containing given value
     * @param {any} val 
     * @param {Node} node 
     * @returns {Node}
     */
	function find(val, node) {
		if(!node) return "Not Found";
		if(node.value == val) return node;
		return node.value > val ? find(val, node.left) : find(val, node.right);
	}

    /**
     * The main balancer function that balances that
     * updates the height and performs rotation if needed
     * and returns the balanced node
     * @param {Node} node 
     * @returns {Node} 
     */
    function balance(node) {
        // update height
        node.height = getHeight(node);

        // get balance
        var balance = getBalance(node);

        if(balance === -2) {
            // Left Left
            if(node.left && getBalance(node.left) == -1) {
                return rightRotate(node);
            } 
            // Left Right
            else {
                node.left = leftRotate(node.left);
                return rightRotate(node);
            }
        } else if(balance === 2) {
            // Right Right
            if(node.right && getBalance(node.right) == 1) {
                return leftRotate(node);
            }
            // Right Left
            else {
                node.right = rightRotate(node.right);
                return leftRotate(node);
            }
        } 

        return node;
    }

    /**
     * generates spaces at power of 2.
     * Used while printing tree as text-pyramid
     * @param {number} level 
     * @returns {String}
     */
    function fiboncciSpace(level) {
        String()
        return Array(Math.pow(2, level)).join(" ");
    }

    /**
     * The base Node class. Used to construct a uni-directional node
     * with the given value and default height of 0.
     * @param {any} val 
     */
    function Node(val) {
        this.value = val;
        this.right = this.left = undefined;
        Object.defineProperty(this, "height", {
            value: 0,
            enumerable: false,
            writable: true,
        });
    }
}
