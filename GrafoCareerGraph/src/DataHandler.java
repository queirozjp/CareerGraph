import java.io.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DataHandler {

    // Agora o método não retorna um Map, ele injeta os dados direto no objeto GraphModel
    public void loadGraph(String filePath, GraphModel graph) {
        Map<String, Node> nodeMap = new HashMap<>(); // Auxiliar para buscar os nós pelo ID rapidamente
        boolean readingEdges = false;

        Pattern nodePattern = Pattern.compile("^(\\d+)\\s+\"(.*)\"$");

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            System.out.println("\nIniciando leitura em \"" + filePath + "\"...");

            String line;
            while ((line = br.readLine()) != null) {
                // Remove caracteres de escape de aspas e espaços extras
                line = line.replaceAll("\\\\", "").trim();

                if (line.isEmpty()) {
                    continue;
                }

                // Identifica o início da sessão de nós
                if (line.equals("n")) {
                    readingEdges = false;
                    continue;
                }

                // Identifica o início da sessão de arestas
                if (line.equals("m")) {
                    readingEdges = true;
                    continue;
                }

                if (!readingEdges) {
                    // Lendo os Nós
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

                        nodeMap.put(id, node); // Guarda no mapa rápido
                        graph.addNode(node);   // Salva na estrutura oficial do grafo
                    }
                } else {
                    // Lendo as Arestas
                    String[] parts = line.split("\\s+");
                    if (parts.length == 2) {
                        String sourceId = parts[0];
                        String targetId = parts[1];

                        Node sourceNode = nodeMap.get(sourceId);
                        Node targetNode = nodeMap.get(targetId);

                        // O método addEdge do GraphModel já cuida de criar a via de mão dupla
                        if (sourceNode != null && targetNode != null) {
                            graph.addEdge(sourceNode, targetNode);
                        }
                    }
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading the graph file: " + e.getMessage());
        }
        System.out.println("\nGrafo carregado com sucesso!");
    }

    public void saveGraph(String filename, GraphModel graph) {
        // Pega todos os nós do grafo e ordena numericamente pelo ID
        List<Node> sortedNodes = new ArrayList<>(graph.getAllNodes());
        sortedNodes.sort(Comparator.comparingInt(n -> Integer.parseInt(n.getId())));

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            System.out.println("\nGravando em \"" + filename + "\"...");

            writer.write("n");
            writer.newLine();

            // Escreve os vértices
            for (Node node : sortedNodes) {
                String nodeLine = String.format("%s \"%s\"", node.getId(), node.getName());
                writer.write(nodeLine);
                writer.newLine();
            }

            writer.write("m");
            writer.newLine();

            // Escreve as arestas
            for (Node sourceNode : sortedNodes) {
                Set<Node> neighbors = graph.getNeighbors(sourceNode);
                int sourceId = Integer.parseInt(sourceNode.getId());

                for (Node targetNode : neighbors) {
                    int targetId = Integer.parseInt(targetNode.getId());

                    // Como o grafo é não-direcionado, evitamos duplicatas no arquivo (.txt)
                    // gravando a aresta apenas se o ID de origem for menor que o de destino.
                    if (sourceId < targetId) {
                        writer.write(sourceNode.getId() + " " + targetNode.getId());
                        writer.newLine();
                    }
                }
            }

        } catch (IOException e) {
            System.err.println("Erro ao salvar o arquivo de grafo: " + e.getMessage());
        }
        System.out.println("\nGrafo gravado com sucesso em \"" + filename + "\"!");
    }

    public void printFile(String filename) {
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.err.println("Error reading the file: " + e.getMessage());
        }
    }
}