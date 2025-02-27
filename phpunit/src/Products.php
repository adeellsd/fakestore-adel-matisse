<?php
class Products {
    
    public function getAllProducts() {
        $json = file_get_contents("https://fakestoreapi.com/products");
        return json_decode($json, true);
    }

    
    public function getProductById($id) {
        $url = "https://fakestoreapi.com/products/{$id}";
        $json = @file_get_contents($url);

        if ($json === false) {
            return null;
        }

        return json_decode($json, true);
    }
}
?>
