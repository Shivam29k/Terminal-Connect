import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Scanner;

import org.json.JSONArray;
import org.json.JSONObject;

public class Tconnect {
    public static final String URL = "https://tc.shivamk.tech/";

    // Function to check if backend is up
    @SuppressWarnings("deprecation")
    public static void checkBackend() throws Exception {
        URL url = new URL(URL);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        connection.setRequestMethod("GET");
        int responseCode = connection.getResponseCode();
        System.out.println("Response Code : " + responseCode);
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        System.out.println(response.toString());
    }


    @SuppressWarnings("deprecation")
    public static boolean verifyUser(String username, String password) throws Exception {
        URL url = new URL(URL + "api/terminal/verify");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        String requestBody = "{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}";

        OutputStream outputStream = connection.getOutputStream();
        outputStream.write(requestBody.getBytes());
        outputStream.flush();
        outputStream.close();

        int responseCode = connection.getResponseCode();
        if (responseCode != 200) {
            return false;
        }

        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        // Parse the JSON response and check if the user is verified
        JSONObject jsonResponse = new JSONObject(response.toString());
        boolean verified = jsonResponse.getBoolean("verified");
        System.out.println(jsonResponse);

        return verified;
    }

    // Function to send chat message to the server

    @SuppressWarnings("deprecation")
    public static void sendChat(String message, String username, String password) throws Exception {
        URL url = new URL(URL + "api/terminal/sendchat");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        String requestBody = String.format(
                "{\"message\":\"%s\", \"sender\":\"terminal\", \"username\":\"%s\", \"password\":\"%s\"}", message,
                username, password);

        OutputStream outputStream = connection.getOutputStream();
        outputStream.write(requestBody.getBytes());
        outputStream.flush();
        outputStream.close();

        int responseCode = connection.getResponseCode();
        if (responseCode != 200) {
            System.out.println("Failed to send chat message");
        } else {
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // print result
            JSONObject jsonResponse = new JSONObject(response.toString());
            System.out.println(jsonResponse.getString("message"));
        }
    }

    // Function to fetch chat messages from the server
    @SuppressWarnings("deprecation")
    public static void fetchChat(String username, String password) throws Exception {
        String queryParameters = String.format("?username=%s&password=%s", URLEncoder.encode(username, "UTF-8"), URLEncoder.encode(password, "UTF-8"));
        URL url = new URL(URL + "api/terminal/getchat" + queryParameters);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Content-Type", "application/json");

        int responseCode = connection.getResponseCode();
        System.out.println("Response Code : " + responseCode);
        if (responseCode != 200) {
            System.out.println("Failed to fetch chat messages");
        } else {
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // print result
            JSONArray jsonResponse = new JSONArray(response.toString());
            for (int i = 0; i < jsonResponse.length(); i++) {
                JSONObject message = jsonResponse.getJSONObject(i);
                System.out.println(message.getString("sender") + " : " + message.getString("message"));
            }
        }
    }

    // function to clear chats at route /clearchat, request type ="DELETE", body =  username, password
    @SuppressWarnings("deprecation")
    public static void clearChat(String username, String password) throws Exception {
        URL url = new URL(URL + "api/terminal/clearchat");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("DELETE");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        String requestBody = String.format("{\"username\":\"%s\", \"password\":\"%s\"}", username, password);

        OutputStream outputStream = connection.getOutputStream();
        outputStream.write(requestBody.getBytes());
        outputStream.flush();
        outputStream.close();

        int responseCode = connection.getResponseCode();
        if (responseCode != 200) {
            System.out.println("Failed to clear chat messages");
        } else {
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // print result
            JSONObject jsonResponse = new JSONObject(response.toString());
            System.out.println(jsonResponse.getString("message"));
        }
    }

    // print choices
    public static void printChoices() {
        System.out.println("\n ---------------------------------");
        System.out.println("Choose an option:");
        System.out.println("1. Send chat message");
        System.out.println("2. Fetch chat messages");
        System.out.println("3. Clear chat messages");
        System.out.println("4. Exit");
        System.out.println("---------------------------------\n");
    }

    // @SuppressWarnings("deprecation")
    public static void main(String[] args) throws Exception {

        // check if the backend is up
        checkBackend();

        @SuppressWarnings("resource")
        Scanner sc = new Scanner(System.in);
        // taka input from user (username and password)
        System.out.println("Enter your username: ");
        String username = sc.nextLine();
        System.out.println("Enter your password: ");
        String password = sc.nextLine();

        verifyUser(username, password);

        // verify the user
        boolean verified = verifyUser(username, password);
        if (verified) {
            System.out.println("User verified successfully!");
        } else {
            System.out.println("User verification failed!");
            return;
        }

        while (true) {
            printChoices();
            int choice = sc.nextInt();
            sc.nextLine();
            if (choice == 1) {
                System.out.println("Enter your message: ");
                String message = sc.nextLine();
                sendChat(message, username, password);
            } else if (choice == 2) {
                fetchChat(username, password);
            } else if (choice == 3){
                clearChat(username, password);
            } else if (choice == 4) {
                break;
            }
        }
    }
}