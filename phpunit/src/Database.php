<?php
class Database {
    
    public function getUserToken($username) {
        $Users = [
            "testuser" => "mock_token",
            "admin" => "admin_token"
        ];

        return $Users[$username] ?? null;
    }
}
?>
