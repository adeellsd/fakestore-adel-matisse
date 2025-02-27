<?php
class Auth {
    public static function login($token) {
        setcookie("auth", $token, time() + 3600, "/"); // Stocke le token comme en React
    }

    public static function isAuthenticated() {
        return isset($_COOKIE["auth"]); // Vérifie si l'utilisateur est connecté
    }

    public static function logout() {
        setcookie("auth", "", time() - 3600, "/"); // Supprime le cookie
    }
}
?>
