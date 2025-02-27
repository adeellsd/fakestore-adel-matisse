<?php
session_start();

class Auth {
    
    public static function login($token) {
        if (php_sapi_name() === 'cli') {
            $_SESSION["auth"] = $token; 
        } else {
            setcookie("auth", $token, time() + 3600, "/"); 
        }
    }

   
    public static function isAuthenticated() {
        if (php_sapi_name() === 'cli') {
            return isset($_SESSION["auth"]); 
        }
        return isset($_COOKIE["auth"]);
    }

    
    public static function logout() {
        if (php_sapi_name() === 'cli') {
            unset($_SESSION["auth"]); 
        } else {
            setcookie("auth", "", time() - 3600, "/"); 
        }
    }
}
?>
