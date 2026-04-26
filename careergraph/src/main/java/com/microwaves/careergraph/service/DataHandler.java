package com.microwaves.careergraph.service;

import com.microwaves.careergraph.domain.Category;
import com.microwaves.careergraph.domain.Course;
import com.microwaves.careergraph.domain.Node;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class DataHandler {
    private static final Logger logger = LoggerFactory.getLogger(DataHandler.class);

    public void loadGraph(String filePath, GraphStructure graph) {
        Map<String, Node> nodeMap = new HashMap<>(); // Auxiliary to quickly search nodes by ID
        boolean readingEdges = false;

        Pattern nodePattern = Pattern.compile("^(\\d+)\\s+\"(.*)\"$");

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            logger.info("Starting to read from \"{}\"...", filePath);

            String line;
            while ((line = br.readLine()) != null) {
                // Remove escape characters and extra spaces
                line = line.replaceAll("\\\\", "").trim();

                if (line.isEmpty()) {
                    continue;
                }

                // Identifies the start of the nodes section
                if (line.equals("n")) {
                    readingEdges = false;
                    continue;
                }

                // Identifies the start of the edges section
                if (line.equals("m")) {
                    readingEdges = true;
                    continue;
                }

                if (!readingEdges) {
                    // Reading Nodes
                    Matcher matcher = nodePattern.matcher(line);
                    if (matcher.find()) {
                        String id = matcher.group(1);
                        String name = matcher.group(2);
                        Node node;

                        if (name.startsWith("CATEGORIA_")) {
                            node = new Category(id, name);
                        } else {
                            node = new Course(id, name);
                        }

                        nodeMap.put(id, node); // Store in quick map
                        graph.addNode(node);   // Save in official graph structure
                    }
                } else {
                    // Reading Edges
                    String[] parts = line.split("\\s+");
                    if (parts.length == 2) {
                        String sourceId = parts[0];
                        String targetId = parts[1];

                        Node sourceNode = nodeMap.get(sourceId);
                        Node targetNode = nodeMap.get(targetId);

                        // The addEdge method in GraphModel already handles creating the bidirectional edge
                        if (sourceNode != null && targetNode != null) {
                            graph.addEdge(sourceNode, targetNode);
                        }
                    }
                }
            }
        } catch (IOException e) {
            logger.error("Error reading the graph file: {}", e.getMessage());
            throw new RuntimeException("Error reading graph file", e);
        }
        logger.info("Graph loaded successfully!");
    }

    public void saveGraph(String filename, GraphStructure graph) {
        // Get all nodes from the graph and sort numerically by ID
        List<Node> sortedNodes = new ArrayList<>(graph.getAllNodes());
        sortedNodes.sort(Comparator.comparingInt(n -> Integer.parseInt(n.getId())));

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            logger.info("Writing to \"{}\"...", filename);

            writer.write("n");
            writer.newLine();

            // Write vertices
            for (Node node : sortedNodes) {
                String nodeLine = String.format("%s \"%s\"", node.getId(), node.getName());
                writer.write(nodeLine);
                writer.newLine();
            }

            writer.write("m");
            writer.newLine();

            // Write edges
            for (Node sourceNode : sortedNodes) {
                Set<Node> neighbors = graph.getNeighbors(sourceNode);
                int sourceId = Integer.parseInt(sourceNode.getId());

                for (Node targetNode : neighbors) {
                    int targetId = Integer.parseInt(targetNode.getId());

                    // Since the graph is undirected, we avoid duplicates in the file (.txt)
                    // by writing the edge only if the source ID is less than the target ID.
                    if (sourceId < targetId) {
                        writer.write(sourceNode.getId() + " " + targetNode.getId());
                        writer.newLine();
                    }
                }
            }

        } catch (IOException e) {
            logger.error("Error saving graph file: {}", e.getMessage());
            throw new RuntimeException("Error saving graph file", e);
        }
        logger.info("Graph saved successfully to \"{}\"!", filename);
    }

    public String readFile(String filename) {
        StringBuilder content = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                content.append(line).append("\n");
            }
        } catch (IOException e) {
            logger.error("Error reading the file: {}", e.getMessage());
            throw new RuntimeException("Error reading file", e);
        }
        return content.toString();
    }
}
