package mypkg;

import java.io.*;
import java.sql.*;
import javax.servlet.*;            // Tomcat 9
import javax.servlet.http.*;
import javax.servlet.annotation.*;


@WebServlet("/update")
public class UpdateServlet extends HttpServlet{
    
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
                throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html>");
        out.println("<head><title>Update Response</title></head>");
        out.println("<body>");

        try (
            Connection conn = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/flowershop?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC",
            "myuser", "1986");

            Statement stmt = conn.createStatement();
        ) {
            String sqlStr = "insert into flowers values ('" 
            + request.getParameter("type") + "', '" 
            + request.getParameter("color") + "', " 
            + request.getParameter("price") + ", "
            + request.getParameter("qty") + ");";

            out.println("<h3>Thank you for your query.</h3>");
            out.println("<p>Your SQL statement is: " + sqlStr + "</p>");
            stmt.executeUpdate(sqlStr);
            out.println("<p>==== 1 records updated =====</p>");


        } catch(Exception ex) {
            out.println("<p>Error: " + ex.getMessage() + "</p>");
            out.println("<p>Check Tomcat console for details.</p>");
            ex.printStackTrace();
        }

        out.println("</body></html>");
        out.close();
    }
}
