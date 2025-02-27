<?php
use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/../src/Products.php';

class ProductsTest extends TestCase {
    /** Test que la récupération de tous les produits retourne un tableau */
    public function testGetAllProducts() {
        $products = Products::getAllProducts();
        $this->assertIsArray($products); // Vérifie que c'est bien un tableau
        $this->assertNotEmpty($products); // Vérifie qu'il y a bien des produits
    }

    /** Test que la récupération d'un produit par ID fonctionne */
    public function testGetProductById() {
        $product = Products::getProductById(1);
        $this->assertIsArray($product); // Vérifie que c'est un tableau
        $this->assertArrayHasKey("id", $product); // Vérifie que l'ID est présent
        $this->assertEquals(1, $product["id"]); // Vérifie que l'ID est correct
    }

    /** MOCK : Simulation d'une API externe pour un produit */
    public function testMockApiProducts() {
        $mockApi = $this->createMock(Products::class);
        $mockApi->method('getProductById')->willReturn([
            "id" => 1, "title" => "Mock Product", "price" => 20.99
        ]);

        $product = $mockApi->getProductById(1);
        $this->assertEquals("Mock Product", $product["title"]);
        $this->assertEquals(20.99, $product["price"]);
    }
}
?>
