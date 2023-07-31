package com.example;
public class MainClass {
    public static void main(String[] args) {
        RunEngine.NewUser("Tutor", "nikag", "she/her",
                "nika_g@gmail.com", "43134@yrdsb.ca", "nika_a@gmail.com");
        RunEngine.AssignSubject("nikag", "Math", 11);
        String out = RunEngine.searchTutors("Tutor", "Math", 11);
        System.out.println(out);
    }

}

