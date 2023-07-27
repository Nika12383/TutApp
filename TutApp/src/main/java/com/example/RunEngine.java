package com.example;

import java.sql.*;

public class RunEngine {
    public static void NewUser(String role, String name, String pronouns, String p_email, String s_email, String a_email) {
        try {
            Connection conn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/tutapp",
                    "myuser", "1986");
            Statement stmt = conn.createStatement();

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

            String get_uid = "select id from tutapp.users where name = '"+name+"';";
            ResultSet rset_uid = stmt.executeQuery(get_uid);
            rset_uid.next();
            int uid = rset_uid.getInt("id");

            String get_ruid = "select id from tutapp.`users-with-role` where user_id = "+uid+";";
            ResultSet rset_ruid = stmt.executeQuery(get_ruid);
            rset_ruid.next();
            int ruid = rset_ruid.getInt("id");

            String get_subject_id = "select id from tutapp.subjects where name = '"+subject+"';";
            ResultSet rset_subid = stmt.executeQuery(get_subject_id);
            rset_subid.next();
            int subject_id = rset_subid.getInt("id");

            String get_role_id = "select id from tutapp.grades where grade = "+grade+";";
            ResultSet rset_roleid = stmt.executeQuery(get_role_id);
            rset_roleid.next();
            int grade_id = rset_roleid.getInt("id");

            String assign_subject = "insert into tutapp.`users-subjects` values ("+ruid+", "+grade_id+", "+subject_id+")";
            stmt.executeUpdate(assign_subject);
    } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
