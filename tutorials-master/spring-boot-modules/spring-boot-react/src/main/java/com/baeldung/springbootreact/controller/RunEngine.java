package com.baeldung.springbootreact.controller;

import java.io.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import org.jooq.SQL;
import org.jooq.impl.DSL;

public final class RunEngine {
    public static String searchTutors(String role, String subject, int grade) {
        String json = "";
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/tutapp?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC",
                    "myuser", "1986");
            Statement stmt = conn.createStatement();

            String action1 = "SELECT id from grades WHERE grade = '" + grade + "';";
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
    
    public static void NewUser(String role, String name, String pronouns, String p_email, String s_email, String a_email) {
        try {
            Connection conn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/tutapp",
                    "myuser", "1986");
            Statement stmt = conn.createStatement();
            conn.setAutoCommit(false);

            try {
                String user_create = "insert into tutapp.users (name, pronouns, personal_email, school_email, adult_email) "
                        + "values ('"
                        + name + "', '"
                        + pronouns + "', '"
                        + p_email + "', '"
                        + s_email + "', '"
                        + a_email + "');";
                stmt.executeUpdate(user_create);

                String get_uid = "select id from tutapp.users where name = '"+name+"';";
                ResultSet rset_uid = stmt.executeQuery(get_uid);
                rset_uid.next();
                int uid = rset_uid.getInt("id");

                String get_rid = "select id from tutapp.roles where role = '"+role+"';";
                ResultSet rset_rid = stmt.executeQuery(get_rid);
                rset_rid.next();
                int rid = rset_rid.getInt("id");

                String assign_role = "insert into tutapp.`users-with-role` (user_id, role_id) values ("+uid+", "+rid+");";
                stmt.executeUpdate(assign_role);

                conn.commit();
            } catch (SQLException e) {
                conn.rollback();
                e.printStackTrace();
            } finally {
                conn.close();
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void AssignSubject(String name, String subject, int grade) {
        try {
            Connection conn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/tutapp",
                    "myuser", "1986");
            Statement stmt = conn.createStatement();
            conn.setAutoCommit(false);

            try {
                String get_uid = "select id from tutapp.users where name = '"+name+"';";
                ResultSet rset_uid = stmt.executeQuery(get_uid);
                rset_uid.next();
                int uid = rset_uid.getInt("id");

                String get_ruid = "select id from tutapp.`users-with-role` where user_id = "+uid+";";
                ResultSet rset_ruid = stmt.executeQuery(get_ruid);
                rset_ruid.next();
                int ruid = rset_ruid.getInt("id");

                String get_subject_id = "select id from tutapp.subjects where subject = '"+subject+"';";
                ResultSet rset_subid = stmt.executeQuery(get_subject_id);
                rset_subid.next();
                int subject_id = rset_subid.getInt("id");

                String get_role_id = "select id from tutapp.grades where grade = "+grade+";";
                ResultSet rset_roleid = stmt.executeQuery(get_role_id);
                rset_roleid.next();
                int grade_id = rset_roleid.getInt("id");

                String assign_subject = "insert into tutapp.`user-subjects` values ("+ruid+", "+grade_id+", "+subject_id+")";
                stmt.executeUpdate(assign_subject);

                conn.commit();
            } catch (SQLException e) {
                conn.rollback();
                e.printStackTrace();
            } finally {
                conn.close();
            }

    } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
