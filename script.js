// Helper function to get posts from local storage
function getPosts() {
    return JSON.parse(localStorage.getItem('posts')) || [];
}

// Helper function to save posts to local storage
function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Render posts on the page
function renderPosts(postsToRender = getPosts()) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';

    postsToRender.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p class="post-meta">Category: ${post.category}</p>
            <div class="actions">
                <button onclick="likePost(${index})">Like (${post.likes})</button>
                <button onclick="commentPost(${index})">Comment (${post.comments.length})</button>
            </div>
            <div class="comments">
                ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
            </div>
        `;
        postList.appendChild(postDiv);
    });
}

// Handle form submission to create a new post
document.getElementById('post-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const category = document.getElementById('post-category').value;

    const newPost = {
        title,
        content,
        category,
        likes: 0,
        comments: []
    };

    const posts = getPosts();
    posts.push(newPost);
    savePosts(posts);

    renderPosts();
    this.reset();
});

// Filter posts by category
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.getAttribute('data-category');
        if (category === 'all') {
            renderPosts();
        } else {
            const filteredPosts = getPosts().filter(post => post.category === category);
            renderPosts(filteredPosts);
        }
    });
});

// Like a post
function likePost(index) {
    const posts = getPosts();
    posts[index].likes++;
    savePosts(posts);
    renderPosts();
}

// Comment on a post
function commentPost(index) {
    const comment = prompt('Enter your comment:');
    if (comment) {
        const posts = getPosts();
        posts[index].comments.push(comment);
        savePosts(posts);
        renderPosts();
    }
}

// Search posts
document.getElementById('search-bar').addEventListener('input', function() {
    const searchText = this.value.toLowerCase();
    const filteredPosts = getPosts().filter(post =>
        post.title.toLowerCase().includes(searchText) ||
        post.content.toLowerCase().includes(searchText)
    );
    renderPosts(filteredPosts);
});

// Initial render
renderPosts();
