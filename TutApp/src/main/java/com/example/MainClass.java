package com.example;
public class MainClass {
    public static void main(String[] args) {
        RunEngine.NewUser("Tutor", "jim1", "he/him",
                "abcd@gmail.com", "1231@yrdsb.ca", "abcd@gmail.com");
        RunEngine.AssignSubject("jim1", "Math", 11);
        String out = RunEngine.searchTutors("Tutor", "Math", 11);
        System.out.println(out);
    }

}

