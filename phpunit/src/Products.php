<?php
class Products {
    public static function getAllProducts() {
        $json = file_get_contents("https://fakestoreapi.com/products");
        return json_decode($json, true);
    }

    public static function getProductById($id) {
        $json = file_get_contents("https://fakestoreapi.com/products/{$id}");
        return json_decode($json, true);
    }
}
?>
