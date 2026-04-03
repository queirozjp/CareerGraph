/*
 * Henrique Brainer Costa RA: 10420717
 * João Pedro Queiroz de Andrade RA: 10425822
 * João Victor Vidal Barbosa RA: 10410165
 * */
public class Course extends Node {
    public Course(String name) { super(name); }
    public Course(String id, String name) { super(id, name); }

    @Override
    public Node cloneNode() {
        return new Course(this.getId(), this.getName());
    }
}