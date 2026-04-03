/*
 * Henrique Brainer Costa RA: 10420717
 * João Pedro Queiroz de Andrade RA: 10425822
 * João Victor Vidal Barbosa RA: 10410165
 * */
public class Category extends Node {
    public Category(String name) { super(name); }
    public Category(String id, String name) { super(id, name); }

    @Override
    public Node cloneNode() {
        return new Category(this.getId(), this.getName());
    }
}