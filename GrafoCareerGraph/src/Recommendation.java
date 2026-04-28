import java.util.*;

public class Recommendation {

    public List<Node> recommendationEngine(GraphModel grafo, List<String> categorias) {

        Map<String, Integer> somaDistancias = new HashMap<>();

        for (String catId : categorias) {

            Node start = grafo.findNodeById(catId);
            if (start == null)
                continue;

            Queue<Node> fila = new LinkedList<>();
            Map<String, Integer> dist = new HashMap<>();
            Set<String> visitados = new HashSet<>();

            fila.add(start);
            dist.put(start.getId(), 0);
            visitados.add(start.getId());

            while (!fila.isEmpty()) {

                Node atual = fila.poll();
                int d = dist.get(atual.getId());

                for (Node vizinho : grafo.getNeighbors(atual)) {

                    if (!visitados.contains(vizinho.getId())) {

                        visitados.add(vizinho.getId());
                        fila.add(vizinho);
                        dist.put(vizinho.getId(), d + 1);

                        if (vizinho instanceof Course) {
                            somaDistancias.put(
                                    vizinho.getId(),
                                    somaDistancias.getOrDefault(vizinho.getId(), 0) + (d + 1));
                        }
                    }
                }
            }
        }

        List<Map.Entry<String, Integer>> ordenado = new ArrayList<>(somaDistancias.entrySet());

        ordenado.sort(Map.Entry.comparingByValue());

        List<Node> top5 = new ArrayList<>();

        for (int i = 0; i < Math.min(5, ordenado.size()); i++) {
            String id = ordenado.get(i).getKey();
            top5.add(grafo.findNodeById(id));
        }

        return top5;
    }
}