import java.util.*;

public class Recommendation {

    public Node recommendationEngine(GraphModel grafo, List<String> categorias) {

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

                System.out.println("Visitando: " + atual + " | Nível: " + d);

                for (Node vizinho : grafo.getNeighbors(atual)) {

                    if (!visitados.contains(vizinho.getId())) {

                        visitados.add(vizinho.getId());
                        fila.add(vizinho);
                        dist.put(vizinho.getId(), d + 1);

                        System.out.println("  -> Vizinho: " + vizinho + " | Vai para nível: " + (d + 1));

                        if (vizinho instanceof Course) {
                            somaDistancias.put(
                                    vizinho.getId(),
                                    somaDistancias.getOrDefault(vizinho.getId(), 0) + (d + 1));

                            System.out.println("     [CURSO] somaDistancias[" + vizinho.getId() + "] = "
                                    + somaDistancias.get(vizinho.getId()));
                        }
                    }
                }
            }

        }
        String melhorId = null;
        int menor = Integer.MAX_VALUE;

        for (String id : somaDistancias.keySet()) {
            int valor = somaDistancias.get(id);

            if (valor < menor) {
                menor = valor;
                melhorId = id;
            }
        }

        if (melhorId == null)
            return null;

        return grafo.findNodeById(melhorId);
    }
}