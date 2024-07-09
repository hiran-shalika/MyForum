document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;

    if (name && description) {
        let post = {
            name: name,
            description: description
        };

        fetch('save_post.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                addPostToPage(post);
            }
        });
    }
});

function addPostToPage(post) {
    let postCard = document.createElement('div');
    postCard.className = 'post-card';

    let postName = document.createElement('h3');
    postName.textContent = post.name;

    let postDescription = document.createElement('p');
    postDescription.textContent = post.description;

    postCard.appendChild(postName);
    postCard.appendChild(postDescription);

    let postsContainer = document.getElementById('posts');
    postsContainer.insertBefore(postCard, postsContainer.firstChild);

    if (postsContainer.children.length > 20) {
        postsContainer.removeChild(postsContainer.lastChild);
    }
}
