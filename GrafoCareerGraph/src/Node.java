public abstract class Node {
    private static int idCounter = 0;
    private String id;
    private String name;

    // O ponteiro para a lista encadeada
    public Node prox;

    public Node(String name) {
        idCounter++;
        this.id = String.valueOf(idCounter);
        this.name = name;
        this.prox = null;
    }

    public Node(String id, String name) {
        this.id = id;
        this.name = name;
        this.prox = null;
        int idInt = Integer.parseInt(id);
        if (idInt > idCounter) idCounter = idInt;
    }

    @Override
    public String toString() {
        return name + " (#" + id + ")";
    }

    public String getId() { return id; }
    public String getName() { return name; }

    // Método essencial para clonar o nó ao inseri-lo na lista de adjacência,
    // garantindo que cada nó na lista tenha seu próprio ponteiro 'prox'.
    public abstract Node cloneNode();
}