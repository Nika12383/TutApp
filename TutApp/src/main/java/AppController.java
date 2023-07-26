import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

@WebServlet("/AppController")
public class AppController extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String userName = request.getParameter("flowerCode").trim();
        if(userName == null || "".equals(userName)){
            userName = "Guest";
        }

        String greetings = "Hello " + userName;


        PrintWriter out = response.getWriter();
        response.setContentType("text/plain");
        out.println(greetings);
    }

}