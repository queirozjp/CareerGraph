package com.microwaves.careergraph.service;

import com.microwaves.careergraph.domain.Category;
import com.microwaves.careergraph.domain.Course;
import com.microwaves.careergraph.domain.Node;
import com.microwaves.careergraph.dto.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GraphService {
    private final GraphStructure graphStructure;
    private final DataHandler dataHandler;

    @Value("${graph.file.path:src/main/resources/grafo.txt}")
    private String graphFilePath;

    public GraphService(GraphStructure graphStructure, DataHandler dataHandler) {
        this.graphStructure = graphStructure;
        this.dataHandler = dataHandler;
    }

    @PostConstruct
    public void initialize() {
        loadGraphFromFile();
    }

    public void loadGraphFromFile() {
        graphStructure.reset();
        dataHandler.loadGraph(graphFilePath, graphStructure);
    }

    public void saveGraphToFile() {
        dataHandler.saveGraph(graphFilePath, graphStructure);
    }

    public GraphDTO getGraphData() {
        List<NodeDTO> nodes = graphStructure.getAllNodes().stream()
                .map(this::convertToNodeDTO)
                .sorted(Comparator.comparingInt(n -> Integer.parseInt(n.getId())))
                .collect(Collectors.toList());

        List<EdgeDTO> edges = new ArrayList<>();
        Map<Node, Set<Node>> adjacencyList = graphStructure.getAdjacencyMap();

        for (Map.Entry<Node, Set<Node>> entry : adjacencyList.entrySet()) {
            Node source = entry.getKey();
            int sourceId = Integer.parseInt(source.getId());

            for (Node target : entry.getValue()) {
                int targetId = Integer.parseInt(target.getId());
                // Avoid duplicates in undirected graph
                if (sourceId < targetId) {
                    edges.add(new EdgeDTO(source.getId(), target.getId()));
                }
            }
        }

        return new GraphDTO(
                graphStructure.getNodeCount(),
                graphStructure.getEdgeCount(),
                nodes,
                edges,
                graphStructure.isConnected()
        );
    }

    public NodeDTO createNode(CreateNodeRequest request) {
        Node node;
        String name = request.getName().toUpperCase();

        if ("CATEGORY".equalsIgnoreCase(request.getType())) {
            String categoryName = name.startsWith("CATEGORIA_") ? name : "CATEGORIA_" + name;
            node = new Category(categoryName);
        } else if ("COURSE".equalsIgnoreCase(request.getType())) {
            node = new Course(name);
        } else {
            throw new IllegalArgumentException("Invalid node type. Must be CATEGORY or COURSE");
        }

        graphStructure.addNode(node);
        return convertToNodeDTO(node);
    }

    public EdgeDTO createEdge(CreateEdgeRequest request) {
        Node source = graphStructure.findNodeById(request.getSourceId());
        Node target = graphStructure.findNodeById(request.getTargetId());

        if (source == null || target == null) {
            throw new IllegalArgumentException("Source or target node not found");
        }

        if (source.getId().equals(target.getId())) {
            throw new IllegalArgumentException("Cannot create edge from a node to itself");
        }

        if (graphStructure.hasEdge(source, target)) {
            throw new IllegalArgumentException("Edge already exists between these nodes");
        }

        if (source instanceof Category && target instanceof Category) {
            throw new IllegalArgumentException("Cannot create edge between two categories");
        }

        graphStructure.addEdge(source, target);
        return new EdgeDTO(request.getSourceId(), request.getTargetId());
    }

    public void deleteNode(String nodeId) {
        Node node = graphStructure.findNodeById(nodeId);
        if (node == null) {
            throw new IllegalArgumentException("Node not found");
        }
        graphStructure.removeNode(node);
    }

    public void deleteEdge(String sourceId, String targetId) {
        Node source = graphStructure.findNodeById(sourceId);
        Node target = graphStructure.findNodeById(targetId);

        if (source == null || target == null) {
            throw new IllegalArgumentException("Source or target node not found");
        }

        graphStructure.removeEdge(source, target);
    }

    public NodeDTO getNodeById(String nodeId) {
        Node node = graphStructure.findNodeById(nodeId);
        if (node == null) {
            throw new IllegalArgumentException("Node not found");
        }
        return convertToNodeDTO(node);
    }

    public List<NodeDTO> getNeighbors(String nodeId) {
        Node node = graphStructure.findNodeById(nodeId);
        if (node == null) {
            throw new IllegalArgumentException("Node not found");
        }

        return graphStructure.getNeighbors(node).stream()
                .map(this::convertToNodeDTO)
                .sorted(Comparator.comparingInt(n -> Integer.parseInt(n.getId())))
                .collect(Collectors.toList());
    }

    public boolean isGraphConnected() {
        return graphStructure.isConnected();
    }

    public String getFileContent() {
        return dataHandler.readFile(graphFilePath);
    }

    private NodeDTO convertToNodeDTO(Node node) {
        String type = node instanceof Category ? "CATEGORY" : "COURSE";
        return new NodeDTO(node.getId(), node.getName(), type);
    }
}
