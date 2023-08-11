package com.baeldung.springbootreact.controller;

import java.sql.*;
import java.util.Objects;

import com.mysql.cj.jdbc.exceptions.CommunicationsException;
import org.jooq.impl.DSL;

public final class RunEngine {
    public static String searchTutors(String role, String subject, String grade) {
        String json;
        try {
            Connection conn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/tutapp",
                    "myuser", "1986");
            Statement stmt = conn.createStatement();
            String action;
            if (Objects.equals(subject, "All") && Objects.equals(grade, "All")) {
                action = "SELECT * FROM tutapp.new_view;";
            } else {
                action = "SELECT * FROM tutapp.new_view WHERE role = '" + role + "' and subject = '" + subject + "' and grade = " + grade + ";";
            }
            ResultSet results = stmt.executeQuery(action);
            json = DSL.using(conn).fetch(results).formatJSON();

        } catch (SQLException e) {
            e.printStackTrace();

            if (e instanceof CommunicationsException) {
                return "{\"records\":\"Database Connection Error\"}";
            } else if (e instanceof SQLSyntaxErrorException) {
                return "{\"records\":\"You messed up your syntax or are trying to inject sql\"}";
            } else {
                return "{\"records\":\"How you got this error message is beyond me ;-;\"}";
            }

        }
        System.out.println(json);
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
