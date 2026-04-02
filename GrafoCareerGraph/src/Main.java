import java.util.Scanner;

public class Main {

    public static GraphModel graph = new GraphModel();
    private static Scanner scanner = new Scanner(System.in);
    private static String filename = "./src/grafo.txt";

    public static void main(String[] args) {
        int opt;
        do{
            exibirMenu();
             opt = Integer.parseInt(scanner.nextLine());
            getOpcao(opt);
        }while(opt != 0);
    }

    private static void getOpcao(int opt) {
        switch (opt) {
            case 1 -> readFile();
            case 2 -> updateFile();
            case 3 -> inputNode();
            case 4 -> inputEdge();
            case 5 -> removeNode();
            case 6 -> removeEdge();
            case 7 -> printFile();
            case 8 -> showGraph();
            case 9 -> checkConnectivity();
            case 0 -> System.out.println("Encerrando...");
            default -> System.out.println("Opção inválida.");
        }
    }

    private static void exibirMenu() {
        System.out.println("\n--- MENU DE GRAFOS ---");
        System.out.println("1) Ler dados de grafo.txt");
        System.out.println("2) Gravar dados em grafo.txt");
        System.out.println("3) Inserir vértice");
        System.out.println("4) Inserir aresta");
        System.out.println("5) Remover vértice");
        System.out.println("6) Remover aresta");
        System.out.println("7) Mostrar conteúdo do arquivo");
        System.out.println("8) Mostrar grafo (Lista de Adjacência)");
        System.out.println("9) Apresentar conexidade e reduzido");
        System.out.println("0) Encerrar aplicação");
        System.out.print("Escolha uma opção: ");
    }

    private static void readFile(){
        graph.buildFromFile(filename);
    }

    private static void updateFile(){
        graph.writeToFile(filename);
    }

    private static void inputNode(){
        Node newNode;
        String name;
        String nameFinal;
        System.out.println("Qual o tipo de nó a ser adicionado? ");
        System.out.print("1. Categoria 2. Curso: ");
        int type = Integer.parseInt(scanner.nextLine());
        if (type == 1){
            System.out.print("Digite o nome da categoria: ");
            name = scanner.nextLine().toUpperCase();
            nameFinal = "CATEGORIA_" + name;
            newNode = new Category(nameFinal);
            graph.addNode(newNode);
            System.out.println("Vertice " + newNode.getName() + " adicionado com sucesso!");
        } else if (type == 2) {
            System.out.print("Digite o nome do curso: ");
            name = scanner.nextLine().toUpperCase();
            newNode = new Course(name);
            graph.addNode(newNode);
            System.out.println("Vertice " + newNode.getName() + " adicionado com sucesso!");
        }else{
            System.out.println("Opção Inválida!");
            return;
        }
    }

    private static void inputEdge(){
        System.out.print("Digite o id do primeiro nó: ");
        String id1 = scanner.nextLine();
        System.out.print("Digite o id do segundo nó: ");
        String id2 = scanner.nextLine();
        Node n1 = graph.findNodeById(id1);
        Node n2 = graph.findNodeById(id2);
        if( n1 == null || n2 == null){
            System.out.println("Nó não encontrado!");
            return;
        }
        if (n1.equals(n2)) {
            System.out.println("Atenção: Você não pode ligar um nó a ele mesmo!");
            return;
        }
        if (graph.hasEdge(n1, n2)) {
            System.out.println("Atenção: A ligação entre '" + n1.getName() + "' e '" + n2.getName() + "' já existe!");
            return;
        }
        if (n1 instanceof Category && n2 instanceof Category) {
            System.out.println("Acesso Negado: Uma Categoria não pode se ligar a outra Categoria!");
            return;
        }
        int valorId1 = Integer.parseInt(n1.getId());
        int valorId2 = Integer.parseInt(n2.getId());
        if (valorId1 > valorId2) {
            Node temp = n1;
            n1 = n2;
            n2 = temp;
        }
        graph.addEdge(n1, n2);
        System.out.println("Aresta entre " + n1.getName() + " e " + n2.getName() + " criada com sucesso!");
    }

    private static void removeNode(){
        System.out.print("Digite o id do nó: ");
        String id = scanner.nextLine();
        Node rNode = graph.findNodeById(id);
        if (rNode == null){
            System.out.println("Nó não encontrado!");
            return;
        }
        graph.removeNode(rNode);
        System.out.println("Vertice " + rNode.getName() + " removido com sucesso!");
    }

    private static void removeEdge(){
        System.out.print("Digite o id do primeiro nó: ");
        String id1 = scanner.nextLine();
        System.out.print("Digite o id do segundo nó: ");
        String id2 = scanner.nextLine();
        Node n1 = graph.findNodeById(id1);
        Node n2 = graph.findNodeById(id2);
        if( n1 == null || n2 == null){
            System.out.println("Nó não encontrado!");
            return;
        }
        graph.removeEdge(n1,n2);
        System.out.println("Aresta entre " + n1.getName() + " e " + n2.getName() + " removida com sucesso!");
    }

    private static void showGraph(){
        graph.printGraph();
    }

    public static void printFile(){
        DataHandler dr = new DataHandler();
        dr.printFile(filename);
    }

    private static void checkConnectivity(){
        System.out.println(graph.isConnected()?"\nO grafo é conexo" : "\nO grafo não é conexo");
        System.out.println("A redução de um grafo apenas é possível em grafos direcionados");
    }


}