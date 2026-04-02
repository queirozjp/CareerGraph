public class Category extends Node {
    public Category(String name) { super(name); }
    public Category(String id, String name) { super(id, name); }

    @Override
    public Node cloneNode() {
        return new Category(this.getId(), this.getName());
    }
}