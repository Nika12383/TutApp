package mypkg;

import java.io.*;
import java.sql.*;
import javax.servlet.*;            // Tomcat 9
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet("/query")   // Configure the request URL for this servlet (Tomcat 7/Servlet 3.0 upwards)
public class QueryServlet extends HttpServlet {

   // The doGet() runs once per HTTP GET request to this servlet.
   @Override
   public void doGet(HttpServletRequest request, HttpServletResponse response)
               throws ServletException, IOException {
      // Set the MIME type for the response message
      response.setContentType("text/html");
      // Get a output writer to write the response message into the network socket
      PrintWriter out = response.getWriter();
      // Print an HTML page as the output of the query
      out.println("<html>");
      out.println("<head><title>Query Response</title></head>");
      out.println("<body>");

      try (
         // Step 1: Allocate a database 'Connection' object
         Connection conn = DriverManager.getConnection(
               "jdbc:mysql://localhost:3306/flowershop?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC",
               "myuser", "1986");   // For MySQL
               // The format is: "jdbc:mysql://hostname:port/databaseName", "username", "password"

         // Step 2: Allocate a 'Statement' object in the Connection
         Statement stmt = conn.createStatement();
      ) {
         // Step 3: Execute a SQL SELECT query
         String picked_subject = request.getParameter("subject");
         String student_name = request.getParameter("student_name");
         String subject_id = sqlServer.query("select subject_id from subjects where subject_name = '" + picked_subject + "';");
         String student_id = sqlServer.query("select student_id from students where student_name = '" + student_name + "';");
         sqlServer.update("insert into students-subjects (" + subject_id + ", "+ student_id + ");");

         out.println("<h3>Thank you for your query.</h3>");
         out.println("<p>Your SQL statement is: " + sqlStr + "</p>"); // Echo for d ugging
         ResultSet rset = stmt.executeQuery(sqlStr);  // Send the query to the server

         

         // Step 4: Process the query result set
         int count = 0;
         while(rset.next()) {
            // Print a paragraph <p>...</p> for each record
            out.println("<p>" + rset.getString("type")
                  + ", " + rset.getString("color")
                  + ", $" + rset.getDouble("price") + "</p>");
            count++;
         }
         out.println("<p>==== " + count + " records found =====</p>");
      } catch(Exception ex) {
         out.println("<p>Error: " + ex.getMessage() + "</p>");
         out.println("<p>Check Tomcat console for details.</p>");
         ex.printStackTrace();
      }  // Step 5: Close conn and stmt - Done automatically by try-with-resources (JDK 7)
 
      out.println("</body></html>");
      out.close();
   }
}