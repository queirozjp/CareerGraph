/*
 * Henrique Brainer Costa RA: 10420717
 * João Pedro Queiroz de Andrade RA: 10425822
 * João Victor Vidal Barbosa RA: 10410165
 * */
import java.util.*;

public class StudentProfile {
    private final String studentId;
    private final List<Category> interestedCategories;

    public StudentProfile(String studentId, List<Category> interestedCategories) {
        this.studentId = studentId;
        this.interestedCategories = interestedCategories;
    }

    public List<Category> getCategories() {
        return interestedCategories;
    }

}