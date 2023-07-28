package com.example;

import java.io.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import org.jooq.impl.DSL;

public final class RunEngine {
    public static String searchTutors(String role, String subject, int grade) {
        String json = "";
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/tutapp?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC",
                    "myuser", "1986");
            Statement stmt = conn.createStatement();

            String action1 = "SELECT id from grades WHERE grade = '" + Integer.toString(grade) + "';";
            ResultSet rset1 = stmt.executeQuery(action1);
            rset1.next();
            String grade_id = rset1.getString("id");

            String action2 = "SELECT id from subjects WHERE subject = '" + subject + "';";
            ResultSet rset2 = stmt.executeQuery(action2);
            rset2.next();
            String subject_id = rset2.getString("id");

            String action3 = "SELECT id from roles WHERE role = '" + role + "';";
            ResultSet rset3 = stmt.executeQuery(action3);
            rset3.next();
            String role_id = rset3.getString("id");

            String action4 = "SELECT `users-with-role`.user_id\n" +
                    "\tFROM `users-with-role` INNER JOIN `user-subjects`\n" +
                    "    ON `users-with-role`.id = `user-subjects`.r_user_id AND `users-with-role`.role_id = " + role_id + " AND `user-subjects`.subject_id = " + subject_id + " AND `user-subjects`.grade_id = " + grade_id + ";";
            ResultSet rset4 = stmt.executeQuery(action4);
            List<String> user_ids = new ArrayList<String>();
            while(rset4.next()){
                String user_id = rset4.getString("user_id");
                user_ids.add(user_id);
            }

            String id_string = user_ids.toString().replace("[", "(").replace("]", ")");
            String action5 = "SELECT * FROM users WHERE id IN " + id_string + ";";
            ResultSet rset5 = stmt.executeQuery(action5);
            json = DSL.using(conn).fetch(rset5).formatJSON();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return json;
    }
}
