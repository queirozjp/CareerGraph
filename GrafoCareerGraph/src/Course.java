public class Course extends Node {
    public Course(String name) { super(name); }
    public Course(String id, String name) { super(id, name); }

    @Override
    public Node cloneNode() {
        return new Course(this.getId(), this.getName());
    }
}