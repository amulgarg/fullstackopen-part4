const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    if(!blogs) return 0;
    return blogs.reduce((sum, item) => sum + item.likes, 0);
}

const favoriteBlog = (blogs) => {
    if(!blogs || blogs.length == 0) return null;
    if(blogs.length == 1) return blogs[0];

    let favBlog = blogs[0];
    blogs.forEach(blog => {
        if(blog.likes > favBlog.likes){
            favBlog = blog;
        } 
    });

    return favBlog;
}

const mostBlogs = (blogs) => {
    if(!blogs || blogs.length == 0) return null;
    if(blogs.length == 1) return blogs[0].author;

    let authorWithMostBlogs = blogs[0].author;
    const authorHash = {};

    blogs.forEach(blog => {
        if(typeof authorHash[blog.author] === "undefined")
            authorHash[blog.author] = 1;
        else 
            authorHash[blog.author] += 1;
    });

    for (let [authorName, authorBlogCount] of Object.entries(authorHash)) {
        if(authorBlogCount > authorHash[authorWithMostBlogs])
            authorWithMostBlogs = authorName;
    }

    return authorWithMostBlogs;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}