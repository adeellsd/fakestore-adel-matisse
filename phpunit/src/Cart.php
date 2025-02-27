<?php
session_start();

class Cart {
    public static function addToCart($productId, $price) {
        if (!isset($_SESSION["cart"])) {
            $_SESSION["cart"] = [];
        }

        if (isset($_SESSION["cart"][$productId])) {
            $_SESSION["cart"][$productId]["quantity"] += 1;
        } else {
            $_SESSION["cart"][$productId] = ["id" => $productId, "price" => $price, "quantity" => 1];
        }
    }

    public static function removeFromCart($productId) {
        if (isset($_SESSION["cart"][$productId])) {
            unset($_SESSION["cart"][$productId]);
        }
    }

    public static function updateQuantity($productId, $quantity) {
        if (isset($_SESSION["cart"][$productId])) {
            $_SESSION["cart"][$productId]["quantity"] = $quantity;
        }
    }

    public static function getCart() {
        return $_SESSION["cart"] ?? [];
    }

    public static function getTotal() {
        $total = 0;
        foreach ($_SESSION["cart"] as $product) {
            $total += $product["price"] * $product["quantity"];
        }
        return $total;
    }
}
?>
