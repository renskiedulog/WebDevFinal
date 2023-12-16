<?php
// Check if it's an OPTIONS request and handle it
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    http_response_code(200);
    exit;
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

$conn = mysqli_connect('localhost', "root", "", "animesensei");

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        if (isset($_GET['user'])) {
            $action = $_GET['user'];
            if ($action === 'login') {
                authLogin($conn);
            } else if ($action === 'register') {
                authRegister($conn);
            } else if ($action === 'change') {
                changeUserPassword($conn);
            }
        }
        if (isset($_GET['bookmark'])) {
            $action = $_GET['bookmark'];
            if ($action === 'add') {
                addBookmark($conn);
            } else if ($action === 'delete') {
                deleteBookmark($conn, $_GET['id']);
            }
        }
        break;
    case "GET":
        if (isset($_GET['fetch'])) {
            $action = $_GET['fetch'];
            if ($action === 'user') {
                fetchUserDetails($conn, $_GET['email']);
            } else if ($action === 'bookmarks') {
                fetchBookmarks($conn, $_GET['email']);
            }
        }
        break;
    default:
        header("HTTP/1.1 405 Method Not Allowed");
        header("Allow: POST");
        break;
}
function authLogin($conn)
{
    $user_data = json_decode(file_get_contents('php://input'));

    $check_user_query = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $check_user_query->bind_param("s", $user_data->email);

    if ($check_user_query->execute()) {
        $result = $check_user_query->get_result();
        $user = $result->fetch_assoc();

        if ($user) {
            if ($user_data->password == $user['password']) {
                $response = ['status' => 1, 'user' => $user];
            } else {
                $response = ['status' => 0, 'error' => 'Incorrect password'];
            }
        } else {
            $response = ['status' => 0, 'error' => 'User not found', 'password' => $user_data->password];
        }
    } else {
        $response = ['status' => 0, 'error' => 'Query execution error'];
    }

    $check_user_query->close();
    $conn->close();
    header('Content-Type: application/json');
    echo json_encode($response);
}

function authRegister($conn)
{
    $user_data = json_decode(file_get_contents('php://input'));
    $checkEmailQuery = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $checkEmailQuery->bind_param("s", $user_data->email);
    $checkEmailQuery->execute();
    $existingUser = $checkEmailQuery->get_result()->fetch_assoc();
    $checkEmailQuery->close();
    if ($existingUser) {
        $response = ['status' => 0, 'error' => 'Email already exists.'];
    } else {
        $insertQuery = $conn->prepare("INSERT INTO users(firstname,lastname,email,password) VALUES(?, ?, ?, ?)");
        $insertQuery->bind_param("ssss", $user_data->firstname, $user_data->lastname, $user_data->email, $user_data->password);
        if ($insertQuery->execute()) {
            $seekUser = $conn->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
            $seekUser->bind_param("ss", $user_data->email, $user_data->password);
            if ($seekUser->execute()) {
                $result = $seekUser->get_result();
                $user = $result->fetch_assoc();
                $response = ['status' => 1, 'user' => $user];
                $seekUser->close();
            } else {
                $response = ['status' => 0, 'error' => 'Something went wrong. Please try again.'];
            }
        } else {
            $response = ['status' => 0, 'error' => 'Something went wrong. Please try again.'];
        }
        $insertQuery->close();
    }

    $conn->close();
    header('Content-Type: application/json');
    echo json_encode($response);
}

function addbookmark($conn)
{
    $bookmark_data = json_decode(file_get_contents('php://input'));

    $checkBookmarkQuery = $conn->prepare("SELECT * FROM bookmarks WHERE name = ? AND email = ?");
    $checkBookmarkQuery->bind_param("ss", $bookmark_data->name, $bookmark_data->email);
    $checkBookmarkQuery->execute();
    $existingBookmark = $checkBookmarkQuery->get_result()->fetch_assoc();
    $checkBookmarkQuery->close();

    if ($existingBookmark) {
        $response = ['status' => 0, 'message' => 'Bookmark already exists.'];
    } else {
        $insertBookmarkQuery = $conn->prepare("INSERT INTO bookmarks(name, email) VALUES(?, ?)");
        $insertBookmarkQuery->bind_param("ss", $bookmark_data->name, $bookmark_data->email);

        if ($insertBookmarkQuery->execute()) {
            $response = ['status' => 1, 'message' => 'Bookmark added successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Something went wrong. Please try again.'];
        }

        $insertBookmarkQuery->close();
    }

    $conn->close();
    header('Content-Type: application/json');
    echo json_encode($response);
}

function fetchUserDetails($conn, $email)
{
    $getUserQuery = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $getUserQuery->bind_param("s", $email);
    $getUserQuery->execute();
    $user = $getUserQuery->get_result()->fetch_assoc();
    $getUserQuery->close();

    if ($user) {
        $response = ['status' => 1, 'message' => 'User details retrieved successfully.', 'user' => $user];
    } else {
        $response = ['status' => 0, 'message' => 'No user found for the given email.'];
    }

    $conn->close();
    header('Content-Type: application/json');
    echo json_encode($response);
}

function changeUserPassword($conn)
{
    $user_data = json_decode(file_get_contents('php://input'));
    if (isset($user_data->current) && isset($user_data->new)) {
        $getCurrentPasswordQuery = $conn->prepare("SELECT password FROM users WHERE email = ?");
        $getCurrentPasswordQuery->bind_param("s", $user_data->email);
        $getCurrentPasswordQuery->execute();
        $getCurrentPasswordResult = $getCurrentPasswordQuery->get_result();

        if ($getCurrentPasswordResult->num_rows > 0) {
            $currentPassword = $getCurrentPasswordResult->fetch_assoc()['password'];

            if ($user_data->current === $currentPassword) {
                $updatePasswordQuery = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
                $updatePasswordQuery->bind_param("ss", $user_data->new, $user_data->email);
                $updatePasswordQuery->execute();

                $response = ['status' => 1, 'message' => 'Password updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Incorrect existing password.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'User not found.'];
        }
    } else {
        $response = ['status' => 0, 'message' => 'Both existing and new passwords are required.'];
    }

    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($response);
}


function fetchBookmarks($conn, $email)
{
    $getBookmarksQuery = $conn->prepare("SELECT * FROM bookmarks WHERE email = ?");
    $getBookmarksQuery->bind_param("s", $email);
    $getBookmarksQuery->execute();
    $result = $getBookmarksQuery->get_result();

    $bookmarks = [];
    while ($bookmark = $result->fetch_assoc()) {
        $bookmarks[] = $bookmark;
    }

    $getBookmarksQuery->close();

    if ($bookmarks) {
        $response = ['status' => 1, 'message' => 'User bookmarks retrieved successfully.', 'bookmarks' => $bookmarks];
    } else {
        $response = ['status' => 0, 'message' => 'No bookmarks found for the given email.'];
    }

    $conn->close();
    header('Content-Type: application/json');
    echo json_encode($response);
}

function deleteBookmark($conn, $id)
{
    $deleteQuery = $conn->prepare("DELETE FROM bookmarks WHERE id = ?");
    $deleteQuery->bind_param("i", $id);
    $deleteQuery->execute();
    $result = $deleteQuery->get_result();

    $deleteQuery->close();

    if ($result) {
        $response = ['status' => 1, 'message' => 'Bookmark deleted successfully.'];
    } else {
        $response = ['status' => 0, 'message' => 'Something went wrong.'];
    }

    $conn->close();
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>