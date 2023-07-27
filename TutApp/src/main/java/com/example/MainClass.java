package com.example;
public class MainClass {
    public static void main(String[] args){
        RunEngine r = new RunEngine();
        r.NewUser("Tutor", "jim", "he/him",
                "abcd@gmail.com", "123@yrdsb.ca", "abcd@gmail.com");
        r.AssignSubject("jim", "Math", 11);
    }
}
