<?php
use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/../src/Auth.php';

class AuthTest extends TestCase {
    protected function setUp(): void {
        $_SESSION = []; // Réinitialisation de la session
    }

    
    // Test de connexion de l'utilisateur
    
    public function testLogin() {
        Auth::login("test_token");
        if (php_sapi_name() === 'cli') {
            $this->assertTrue(isset($_SESSION["auth"])); // Vérifier la session en mode test
        } else {
            $this->assertTrue(isset($_COOKIE["auth"])); // Vérifier le cookie en navigateur
        }
    }

    
    // Test pour vérifier si l'utilisateur est bien authentifié
    
    public function testIsAuthenticated() {
        Auth::login("test_token");
        $this->assertTrue(Auth::isAuthenticated()); // Vérifier l'authentification
    }

    
    // Test de deco de l'utilisateur
    
    public function testLogout() {
        Auth::login("test_token");
        Auth::logout();
        if (php_sapi_name() === 'cli') {
            $this->assertFalse(isset($_SESSION["auth"])); // Vérifier suppression session en mode test
        } else {
            $this->assertFalse(isset($_COOKIE["auth"])); // Vérifier suppression cookie en navigateur
        }
    }
}
?>
