package com.microwaves.careergraph.service;

import com.microwaves.careergraph.domain.Node;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.*;

@Getter
@Service
public class GraphStructure {
    private int nodeCount;
    private int edgeCount;

    private Node[] vertices;
    private Node[] adjacencyList;
    private int capacity = 10;

    public GraphStructure() {
        this.nodeCount = 0;
        this.edgeCount = 0;
        this.vertices = new Node[capacity];
        this.adjacencyList = new Node[capacity];
    }

    private int indexOf(String id) {
        if (id == null) return -1;
        for (int i = 0; i < nodeCount; i++) {
            if (vertices[i].getId().equals(id)) return i;
        }
        return -1;
    }

    private void expandCapacity() {
        capacity *= 2;
        Node[] newVertices = new Node[capacity];
        Node[] newAdjacencyList = new Node[capacity];
        System.arraycopy(vertices, 0, newVertices, 0, nodeCount);
        System.arraycopy(adjacencyList, 0, newAdjacencyList, 0, nodeCount);
        vertices = newVertices;
        adjacencyList = newAdjacencyList;
    }

    public void addNode(Node node) {
        if (indexOf(node.getId()) != -1) return;

        if (nodeCount == capacity) expandCapacity();

        vertices[nodeCount] = node;
        adjacencyList[nodeCount] = null;
        nodeCount++;
    }

    public Node findNodeById(String id) {
        int idx = indexOf(id);
        return (idx != -1) ? vertices[idx] : null;
    }

    public boolean hasEdge(Node from, Node to) {
        int idx = indexOf(from.getId());
        if (idx == -1) return false;

        Node current = adjacencyList[idx];
        while (current != null) {
            if (current.getId().equals(to.getId())) return true;
            current = current.prox;
        }
        return false;
    }

    private boolean insertIntoList(Node from, Node to) {
        int idx = indexOf(from.getId());
        if (idx == -1) return false;

        Node current = adjacencyList[idx];
        Node previous = null;

        while (current != null) {
            if (current.getId().equals(to.getId())) return false;
            previous = current;
            current = current.prox;
        }

        Node newNode = to.cloneNode();

        if (previous == null) {
            adjacencyList[idx] = newNode;
        } else {
            previous.prox = newNode;
        }
        return true;
    }

    public void addEdge(Node nodeA, Node nodeB) {
        if (indexOf(nodeA.getId()) == -1) addNode(nodeA);
        if (indexOf(nodeB.getId()) == -1) addNode(nodeB);

        boolean added1 = insertIntoList(nodeA, nodeB);
        boolean added2 = insertIntoList(nodeB, nodeA);

        if (added1 || added2) edgeCount++;
    }

    private boolean removeFromList(Node from, Node to) {
        int idx = indexOf(from.getId());
        if (idx == -1) return false;

        Node current = adjacencyList[idx];
        Node previous = null;

        while (current != null && !current.getId().equals(to.getId())) {
            previous = current;
            current = current.prox;
        }

        if (current != null) {
            if (previous == null) {
                adjacencyList[idx] = current.prox;
            } else {
                previous.prox = current.prox;
            }
            return true;
        }
        return false;
    }

    public void removeEdge(Node nodeA, Node nodeB) {
        boolean removed1 = removeFromList(nodeA, nodeB);
        boolean removed2 = removeFromList(nodeB, nodeA);

        if (removed1 || removed2) edgeCount--;
    }

    public void removeNode(Node target) {
        int idx = indexOf(target.getId());
        if (idx == -1) return;

        Node current = adjacencyList[idx];
        while (current != null) {
            Node neighbor = findNodeById(current.getId());
            if (neighbor != null) {
                removeFromList(neighbor, target);
                edgeCount--;
            }
            current = current.prox;
        }

        for (int i = idx; i < nodeCount - 1; i++) {
            vertices[i] = vertices[i + 1];
            adjacencyList[i] = adjacencyList[i + 1];
        }
        vertices[nodeCount - 1] = null;
        adjacencyList[nodeCount - 1] = null;
        nodeCount--;
    }

    public boolean isConnected() {
        if (nodeCount == 0) return false;

        Node start = vertices[0];
        Set<String> visited = new HashSet<>();
        Queue<Node> queue = new LinkedList<>();

        queue.add(start);
        visited.add(start.getId());

        while (!queue.isEmpty()) {
            Node current = queue.poll();
            int idx = indexOf(current.getId());

            if (idx != -1) {
                Node neighbor = adjacencyList[idx];
                while (neighbor != null) {
                    if (!visited.contains(neighbor.getId())) {
                        visited.add(neighbor.getId());
                        queue.add(findNodeById(neighbor.getId()));
                    }
                    neighbor = neighbor.prox;
                }
            }
        }

        return visited.size() == nodeCount;
    }

    public Set<Node> getNeighbors(Node node) {
        Set<Node> neighbors = new HashSet<>();
        int idx = indexOf(node.getId());

        if (idx != -1) {
            Node current = adjacencyList[idx];
            while (current != null) {
                neighbors.add(findNodeById(current.getId()));
                current = current.prox;
            }
        }
        return neighbors;
    }

    public boolean containsNode(Node node) {
        return indexOf(node.getId()) != -1;
    }

    public Set<Node> getAllNodes() {
        Set<Node> allNodes = new HashSet<>();
        for (int i = 0; i < nodeCount; i++) {
            allNodes.add(vertices[i]);
        }
        return allNodes;
    }

    public Map<Node, Set<Node>> getAdjacencyMap() {
        Map<Node, Set<Node>> map = new HashMap<>();
        for (int i = 0; i < nodeCount; i++) {
            map.put(vertices[i], getNeighbors(vertices[i]));
        }
        return map;
    }

    public void reset() {
        this.nodeCount = 0;
        this.edgeCount = 0;
        this.capacity = 10;
        this.vertices = new Node[capacity];
        this.adjacencyList = new Node[capacity];
    }
}