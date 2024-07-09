<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $post = json_decode(file_get_contents('php://input'), true);

    if (isset($post['name']) && isset($post['description'])) {
        $name = htmlspecialchars($post['name']);
        $description = htmlspecialchars($post['description']);

        $data = [
            'name' => $name,
            'description' => $description,
            'timestamp' => time()
        ];

        $posts = json_decode(file_get_contents('posts.json'), true);

        array_unshift($posts, $data);

        if (count($posts) > 20) {
            array_pop($posts);
        }

        file_put_contents('posts.json', json_encode($posts));

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
