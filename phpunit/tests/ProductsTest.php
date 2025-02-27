<?php
use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../src/Products.php';

class ProductsTest extends TestCase {
    private $products;

    protected function setUp(): void {
        $this->products = new Products(); // Création d'une instance pour les produits
    }

    
    // On test si la récupération de tous les produits retourne bien un tableau.
    
    public function testGetAllProducts() {
        $products = $this->products->getAllProducts();
        $this->assertIsArray($products);
        $this->assertNotEmpty($products);
    }

    
    // On test si la recuperation d'un produit par ID fonctionne correctement.
    
    public function testGetProductById() {
        $product = $this->products->getProductById(1);
        $this->assertIsArray($product);
        $this->assertArrayHasKey("id", $product);
        $this->assertEquals(1, $product["id"]);
    }

    
    // Simulation d'une API externe pour la recherche d'un produit par ID (Mock)
    public function testMockApiProducts() {
        // Création d'un mock pour l'instance de Products
        $mockApi = $this->createMock(Products::class);

        // Simulation de la réponse de l'API
        $mockApi->method('getProductById')->willReturn([
            "id" => 1, "title" => "Mock Product", "price" => 20.99
        ]);

        // Verification que le mock retourne bien les valeurs attendues
        $product = $mockApi->getProductById(1);
        $this->assertEquals("Mock Product", $product["title"]);
        $this->assertEquals(20.99, $product["price"]);
    }
}
?>
