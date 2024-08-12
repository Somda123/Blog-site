document.addEventListener("DOMContentLoaded", function() {
    const postForm = document.getElementById("post-form");
    const postList = document.getElementById("post-list");
    const categoryFilter = document.getElementById("category-filter");
    const searchInput = document.getElementById("search");

    function savePostsToLocalStorage(posts) {


        localStorage.setItem("posts", JSON.stringify(posts));
    }


    function getPostsFromLocalStorage() {
        return JSON.parse(localStorage.getItem("posts")) || [];
    }

    function renderPosts(posts) {
        postList.innerHTML = "";
        posts.forEach((post, index) => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <p>${post.image}</p>
                <p><strong>Category:</strong> ${post.category}</p>
                <p class="likes" data-index="${index}">Likes: ${post.likes}</p>
                <p class="comments">Comments: ${post.comments.length}</p>
                <div class="comment-section">
                    ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
                </div>
                <textarea class="comment-input" placeholder="Add a comment..."></textarea>
                <button class="add-comment" data-index="${index}">Comment</button>
            `;
            postList.appendChild(postElement);
        });
    }

    function filterPostsByCategory(category) {
        const posts = getPostsFromLocalStorage();
        if (category === "All") {
            renderPosts(posts);
        } else {
            const filteredPosts = posts.filter(post => post.category === category);
            renderPosts(filteredPosts);
        }
    }

    function searchPosts(query) {
        const posts = getPostsFromLocalStorage();
        const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.content.toLowerCase().includes(query.toLowerCase()));
        renderPosts(filteredPosts);
    }

    postForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const image = document.getElementById("image").value;
        const category = document.getElementById("category").value;
        const posts = getPostsFromLocalStorage();
        posts.push({ title, content,image, category, likes: 0, comments: [] });
        savePostsToLocalStorage(posts);
        filterPostsByCategory(categoryFilter.value);
        postForm.reset();
    });

    postList.addEventListener("click", function(event) {
        if (event.target.classList.contains("likes")) {
            const index = event.target.dataset.index;
            const posts = getPostsFromLocalStorage();
            posts[index].likes++;
            savePostsToLocalStorage(posts);
            renderPosts(posts);
        } else if (event.target.classList.contains("add-comment")) {
            const index = event.target.dataset.index;
            const commentInput = event.target.previousElementSibling;
            const comment = commentInput.value.trim();
            if (comment) {
                const posts = getPostsFromLocalStorage();
                posts[index].comments.push(comment);
                savePostsToLocalStorage(posts);
                renderPosts(posts);
            }
        }
    });

    categoryFilter.addEventListener("change", function() {
        filterPostsByCategory(categoryFilter.value);
    });

    searchInput.addEventListener("input", function() {
        searchPosts(searchInput.value);
    });

    renderPosts(getPostsFromLocalStorage());
});
