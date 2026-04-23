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
    private final GraphModel graphModel;
    private final DataHandler dataHandler;

    @Value("${graph.file.path:src/main/resources/grafo.txt}")
    private String graphFilePath;

    public GraphService(GraphModel graphModel, DataHandler dataHandler) {
        this.graphModel = graphModel;
        this.dataHandler = dataHandler;
    }

    @PostConstruct
    public void initialize() {
        loadGraphFromFile();
    }

    public void loadGraphFromFile() {
        graphModel.reset();
        dataHandler.loadGraph(graphFilePath, graphModel);
    }

    public void saveGraphToFile() {
        dataHandler.saveGraph(graphFilePath, graphModel);
    }

    public GraphDTO getGraphData() {
        List<NodeDTO> nodes = graphModel.getAllNodes().stream()
                .map(this::convertToNodeDTO)
                .sorted(Comparator.comparingInt(n -> Integer.parseInt(n.getId())))
                .collect(Collectors.toList());

        List<EdgeDTO> edges = new ArrayList<>();
        Map<Node, Set<Node>> adjacencyList = graphModel.getAdjacencyList();

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
                graphModel.getNodeCount(),
                graphModel.getEdgeCount(),
                nodes,
                edges,
                graphModel.isConnected()
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

        graphModel.addNode(node);
        return convertToNodeDTO(node);
    }

    public EdgeDTO createEdge(CreateEdgeRequest request) {
        Node source = graphModel.findNodeById(request.getSourceId());
        Node target = graphModel.findNodeById(request.getTargetId());

        if (source == null || target == null) {
            throw new IllegalArgumentException("Source or target node not found");
        }

        if (source.getId().equals(target.getId())) {
            throw new IllegalArgumentException("Cannot create edge from a node to itself");
        }

        if (graphModel.hasEdge(source, target)) {
            throw new IllegalArgumentException("Edge already exists between these nodes");
        }

        if (source instanceof Category && target instanceof Category) {
            throw new IllegalArgumentException("Cannot create edge between two categories");
        }

        graphModel.addEdge(source, target);
        return new EdgeDTO(request.getSourceId(), request.getTargetId());
    }

    public void deleteNode(String nodeId) {
        Node node = graphModel.findNodeById(nodeId);
        if (node == null) {
            throw new IllegalArgumentException("Node not found");
        }
        graphModel.removeNode(node);
    }

    public void deleteEdge(String sourceId, String targetId) {
        Node source = graphModel.findNodeById(sourceId);
        Node target = graphModel.findNodeById(targetId);

        if (source == null || target == null) {
            throw new IllegalArgumentException("Source or target node not found");
        }

        graphModel.removeEdge(source, target);
    }

    public NodeDTO getNodeById(String nodeId) {
        Node node = graphModel.findNodeById(nodeId);
        if (node == null) {
            throw new IllegalArgumentException("Node not found");
        }
        return convertToNodeDTO(node);
    }

    public List<NodeDTO> getNeighbors(String nodeId) {
        Node node = graphModel.findNodeById(nodeId);
        if (node == null) {
            throw new IllegalArgumentException("Node not found");
        }

        return graphModel.getNeighbors(node).stream()
                .map(this::convertToNodeDTO)
                .sorted(Comparator.comparingInt(n -> Integer.parseInt(n.getId())))
                .collect(Collectors.toList());
    }

    public boolean isGraphConnected() {
        return graphModel.isConnected();
    }

    public String getFileContent() {
        return dataHandler.readFile(graphFilePath);
    }

    private NodeDTO convertToNodeDTO(Node node) {
        String type = node instanceof Category ? "CATEGORY" : "COURSE";
        return new NodeDTO(node.getId(), node.getName(), type);
    }
}
