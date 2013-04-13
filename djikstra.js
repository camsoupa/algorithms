



var djikstra = function (nodes, start, destination) {

    var path = []
    var q = [];
    q.push(start); 
    nodes[start].visited = true;
    nodes[start].distance = 0;

    while(q.length > 0) {
    
        var currentNode = nodes[removeShortest(nodes, q)]
        
        if(currentNode.item == destination) {   
            while(currentNode.item != start) {
                path.unshift(currentNode.previous.direction);
                currentNode = nodes[currentNode.previous.item];
            }
            
            break;
        }
        else {
            for(var edge in currentNode.edges)
            {
                var neighbor = nodes[currentNode.edges[edge]]
                
                if(neighbor.visited == null) {
                     var newDistance = currentNode.distance + 1;
                    
                    if(neighbor.distance == null || newDistance < neighbor.distance) {
                        neighbor.distance = newDistance;
                        neighbor.visited = true;
                        q.push(neighbor.item);
                        neighbor.previous = { 
                            item: currentNode.item,
                            direction: edge
                        }
                    }
                }
            }  
        }
    }
    
    clearNodes(nodes);
    
    return path;
}


var removeShortest = function (nodes, arr) {
    
    var nodeWithShortestDistance;
    var index;

    for(var i = 0; i < arr.length; i++) {
        var currentNode = nodes[arr[i]];
        
        if(nodeWithShortestDistance == null || 
            currentNode.distance < nodeWithShortestDistance.distance) {
            
            nodeWithShortestDistance = currentNode;
            index = i;
        }
    }

    arr.splice(index,1);
    
    return nodeWithShortestDistance.item;
}

//TODO: store these breadcrumbs in a separate structure
//to avoid having to clear the nodes
var clearNodes = function (nodes) {

    for(var node in nodes) {
        nodes[node].visited = null;
        nodes[node].distance = null;
        nodes[node].previous = null;
    }
}

var testNodes = { 
    "a" : { 
        item: "a" , 
        edges: {  
            up: 'g',
            down: 'd',
            left: 'c',
            right: 'b'
        }
    },
    "b" : { 
        item: "b" , 
        edges: {  
            up: 'h',
            down: 'e',
            left: 'a',
            right: 'c'
        }
    },
    "c" : { 
        item: "c" , 
        edges: {  
            up: 'i',
            down: 'f',
            left: 'b',
            right: 'a'
        }
    },
    "d" : { 
        item: "d" , 
        edges: {  
            up: 'a',
            down: 'g',
            left: 'f',
            right: 'e'
        }
    },
    "e" : { 
        item: "e" , 
        edges: {  
            up: 'b',
            down: 'h',
            left: 'a',
            right: 'f'
        }
    },
    "f" : { 
        item: "f" , 
        edges: {  
            up: 'c',
            down: 'i',
            left: 'e',
            right: 'd'
        }
    },
    "g" : { 
        item: "g" , 
        edges: {  
            up: 'd',
            down: 'a',
            left: 'i',
            right: 'h'
        }
    },
    "h" : { 
        item: "h" , 
        edges: {  
            up: 'e',
            down: 'b',
            left: 'g',
            right: 'i'
        }
    },
    "i" : { 
        item: "i" , 
        edges: {  
            up: 'f',
            down: 'c',
            left: 'h',
            right: 'g'
        }
    }       
}

djikstra(testNodes, "a", "i");


