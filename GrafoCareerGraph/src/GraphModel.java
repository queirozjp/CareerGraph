import java.util.*;

public class GraphModel {
    private int n; // Quantidade atual de vértices
    private int m; // Quantidade de arestas (não direcionadas)

    private Node[] vertices; // Vetor que guarda a referência dos vértices no índice
    private Node[] adj;      // Vetor onde cada entrada guarda o início da lista de adjacência
    private int capacity = 10;

    public GraphModel() {
        this.n = 0;
        this.m = 0;
        this.vertices = new Node[capacity];
        this.adj = new Node[capacity];
    }

    // Busca o índice do vértice baseado no ID
    private int getIndex(String id) {
        if (id == null) return -1;
        for (int i = 0; i < n; i++) {
            if (vertices[i].getId().equals(id)) {
                return i;
            }
        }
        return -1;
    }

    private void expandCapacity() {
        capacity *= 2;
        Node[] newVertices = new Node[capacity];
        Node[] newAdj = new Node[capacity];
        System.arraycopy(vertices, 0, newVertices, 0, n);
        System.arraycopy(adj, 0, newAdj, 0, n);
        vertices = newVertices;
        adj = newAdj;
    }

    public void addNode(Node node) {
        if (getIndex(node.getId()) != -1) return; // Evita duplicatas

        if (n == capacity) {
            expandCapacity();
        }
        vertices[n] = node;
        adj[n] = null;
        n++;
    }

    public Node findNodeById(String id) {
        int idx = getIndex(id);
        return (idx != -1) ? vertices[idx] : null;
    }

    public boolean hasEdge(Node n1, Node n2) {
        int idx = getIndex(n1.getId());
        if (idx == -1) return false;

        Node no = adj[idx];
        while (no != null) {
            if (no.getId().equals(n2.getId())) return true;
            no = no.prox;
        }
        return false;
    }

    // Método interno de inserção na lista encadeada usando a própria classe Node
    private boolean insereNaLista(Node v, Node w) {
        int idx = getIndex(v.getId());
        if (idx == -1) return false;

        Node no = adj[idx];
        Node ant = null;

        while (no != null) {
            if (no.getId().equals(w.getId())) return false; // Aresta já existe
            ant = no;
            no = no.prox;
        }

        // IMPORTANTE: Criamos um clone para que ele tenha seu próprio ponteiro 'prox' livre
        Node novoNo = w.cloneNode();

        if (ant == null) {
            adj[idx] = novoNo;
        } else {
            ant.prox = novoNo;
        }
        return true;
    }

    public void addEdge(Node nodeA, Node nodeB) {
        if (getIndex(nodeA.getId()) == -1) addNode(nodeA);
        if (getIndex(nodeB.getId()) == -1) addNode(nodeB);

        boolean added1 = insereNaLista(nodeA, nodeB);
        boolean added2 = insereNaLista(nodeB, nodeA);

        if (added1 || added2) m++;
    }

    private boolean removeDaLista(Node v, Node w) {
        int idx = getIndex(v.getId());
        if (idx == -1) return false;

        Node no = adj[idx];
        Node ant = null;

        while (no != null && !no.getId().equals(w.getId())) {
            ant = no;
            no = no.prox;
        }

        if (no != null) {
            if (ant == null) {
                adj[idx] = no.prox;
            } else {
                ant.prox = no.prox;
            }
            return true;
        }
        return false;
    }

    public void removeEdge(Node nodeA, Node nodeB) {
        boolean r1 = removeDaLista(nodeA, nodeB);
        boolean r2 = removeDaLista(nodeB, nodeA);

        if (r1 || r2) m--;
    }

    public void removeNode(Node rNode) {
        int idx = getIndex(rNode.getId());
        if (idx == -1) return;

        // 1. Remove todas as conexões (buscando nas listas dos vizinhos)
        Node no = adj[idx];
        while (no != null) {
            // Pegamos a instância original do vértice vizinho
            Node vizinho = findNodeById(no.getId());
            if (vizinho != null) {
                removeDaLista(vizinho, rNode);
                m--;
            }
            no = no.prox;
        }

        // 2. Remove o nó dos vetores deslocando os itens à esquerda
        for (int i = idx; i < n - 1; i++) {
            vertices[i] = vertices[i + 1];
            adj[i] = adj[i + 1];
        }
        vertices[n - 1] = null;
        adj[n - 1] = null;
        n--;
    }

    public boolean isConnected() {
        if (n == 0) return false;

        Node pivot = vertices[0];
        Set<String> visitadosId = new HashSet<>();
        Queue<Node> fila = new LinkedList<>();

        fila.add(pivot);
        visitadosId.add(pivot.getId());

        while (!fila.isEmpty()) {
            Node atual = fila.poll();
            int idx = getIndex(atual.getId());

            if (idx != -1) {
                Node no = adj[idx];
                while (no != null) {
                    if (!visitadosId.contains(no.getId())) {
                        visitadosId.add(no.getId());
                        // Adiciona a instância original na fila, não o clone
                        fila.add(findNodeById(no.getId()));
                    }
                    no = no.prox;
                }
            }
        }

        return visitadosId.size() == n;
    }

    public Set<Node> getNeighbors(Node node) {
        Set<Node> vizinhos = new HashSet<>();
        int idx = getIndex(node.getId());
        if (idx != -1) {
            Node no = adj[idx];
            while (no != null) {
                // Retorna as instâncias originais dos vizinhos
                vizinhos.add(findNodeById(no.getId()));
                no = no.prox;
            }
        }
        return vizinhos;
    }

    public boolean containsNode(Node node) {
        return getIndex(node.getId()) != -1;
    }

    public Set<Node> getAllNodes() {
        Set<Node> allNodes = new HashSet<>();
        for (int i = 0; i < n; i++) {
            allNodes.add(vertices[i]);
        }
        return allNodes;
    }

    public Map<Node, Set<Node>> getAdjacencyList() {
        Map<Node, Set<Node>> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            map.put(vertices[i], getNeighbors(vertices[i]));
        }
        return map;
    }

    public void buildFromFile(String filename) {
        // Reseta o grafo para receber os novos dados do arquivo
        this.n = 0;
        this.m = 0;
        this.capacity = 10;
        this.vertices = new Node[capacity];
        this.adj = new Node[capacity];

        DataHandler reader = new DataHandler();
        // Passa a própria instância (this) para o DataHandler popular
        reader.loadGraph(filename, this);
    }

    public void writeToFile(String filename) {
        DataHandler writer = new DataHandler();
        // Passa a própria instância (this) para o DataHandler salvar
        writer.saveGraph(filename, this);
    }

    public void printGraph() {
        System.out.println("========== ESTRUTURA DO GRAFO ==========");
        if (n == 0) {
            System.out.println("O grafo está vazio.");
            return;
        }

        System.out.println("Total de Vértices (n): " + n);
        System.out.println("Total de Arestas  (m): " + m + "\n");

        for (int i = 0; i < n; i++) {
            System.out.print(vertices[i].toString() + "  -->  ");

            Node no = adj[i];
            if (no == null) {
                System.out.println("(Sem arestas)");
            } else {
                List<String> edges = new ArrayList<>();
                while (no != null) {
                    edges.add(no.toString());
                    no = no.prox;
                }
                System.out.println(String.join(", ", edges));
            }
        }
        System.out.println("========================================");
    }
}