// Get existing blogs
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];


// Create Blog
let blogForm = document.getElementById("blogForm");

if (blogForm) {

    blogForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let title = document.getElementById("blogTitle").value;
        let author = document.getElementById("authorName").value;
        let content = document.getElementById("blogContent").value;
        let imageFile = document.getElementById("blogImage").files[0];

        if (imageFile) {

            let reader = new FileReader();

            reader.onload = function() {

                saveBlog(
                    title,
                    author,
                    content,
                    reader.result
                );

            };

            reader.readAsDataURL(imageFile);

        } else {

            saveBlog(
                title,
                author,
                content,
                ""
            );
        }

    });
}


// Save Blog Function

function saveBlog(title, author, content, image) {

    let newBlog = {
        id: Date.now(),
        title: title,
        author: author,
        content: content,
        image: image,
        date: new Date().toLocaleDateString()
    };

    blogs.push(newBlog);

    localStorage.setItem(
        "blogs",
        JSON.stringify(blogs)
    );

    alert("Blog published successfully!");

    window.location.href = "blogs.html";
}


// Display Blogs

function displayBlogs() {

    let blogList = document.getElementById("blogList");
    let homeBlogs = document.getElementById("homeBlogs");

    let container = blogList || homeBlogs;

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (blogs.length === 0) {

        container.innerHTML =
            "<p>No blogs available. Create your first blog!</p>";

        return;
    }

    // Latest blogs first

    let blogsToShow = blogList
        ? [...blogs].reverse()
        : [...blogs].reverse().slice(0, 3);

    blogsToShow.forEach(function(blog) {

        let card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            ${blog.image ?
                `<img src="${blog.image}" alt="Blog Image">`
                : ""
            }

            <h3>${blog.title}</h3>

            <p class="author">
                By ${blog.author} | ${blog.date}
            </p>

            <p>${blog.content}</p>

            ${blogList ?
                `<button class="delete-btn"
                    onclick="deleteBlog(${blog.id})">
                    Delete Blog
                </button>`
                : ""
            }

        `;

        container.appendChild(card);

    });
}


// Delete Blog

function deleteBlog(id) {

    let confirmDelete =
        confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) {
        return;
    }

    blogs = blogs.filter(function(blog) {

        return blog.id !== id;

    });

    localStorage.setItem(
        "blogs",
        JSON.stringify(blogs)
    );

    displayBlogs();
}


// Contact Form

let contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert("Thank you! Your message has been sent.");

        contactForm.reset();

    });
}


// Run display function

displayBlogs();