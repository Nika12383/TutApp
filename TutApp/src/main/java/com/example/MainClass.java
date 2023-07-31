package com.example;
public class MainClass {
    public static void main(String[] args){
        // RunEngine.NewUser("Tutor", "Nika", "she/her",
                // "nika.gulbit@gmail.com", "2357235@yrdsb.ca", "sdiana@gmail.com");
        // RunEngine.AssignSubject("nika.gulbit@gmail.com", "Math", 11);

        String out = RunEngine.searchTutors("Tutor", "Math", 11);
        System.out.println(out);
    }
}
