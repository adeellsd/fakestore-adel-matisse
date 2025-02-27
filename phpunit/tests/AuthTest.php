<?php
use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../src/Auth.php';

class AuthTest extends TestCase {
    public function testLogin() {
        Auth::login("test_token");
        $this->assertTrue(isset($_COOKIE["auth"]));
    }

    public function testIsAuthenticated() {
        Auth::login("test_token");
        $this->assertTrue(Auth::isAuthenticated());
    }
}
?>
