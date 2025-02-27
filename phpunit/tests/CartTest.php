<?php
use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../src/Cart.php';

class CartTest extends TestCase {
        // Reinit de la session
        protected function setUp(): void {
        $_SESSION["cart"] = [];
    }

    
    // Test pour vérifier que le panier est vide au départ
    
    public function testCartStartsEmpty() {
        $cart = Cart::getCart();
        $this->assertIsArray($cart);
        $this->assertEmpty($cart); 
    }

    // Test de l'ajout d'un produit au panier
    public function testAddToCart() {
        Cart::addToCart(1, 10);
        $cart = Cart::getCart();
        $this->assertArrayHasKey(1, $cart);
        $this->assertEquals(1, $cart[1]["quantity"]);
    }

    // Test pour avoir le total du panier
    public function testGetTotal() {
        $_SESSION["cart"] = [
            1 => ["price" => 10, "quantity" => 2],
            2 => ["price" => 5, "quantity" => 3]
        ];
        $this->assertEquals(35, Cart::getTotal());
    }
}
?>
