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

const mostLikes = (blogs) => {
    if(!blogs || blogs.length == 0) return null;
    if(blogs.length == 1) return blogs[0].author;

    let authorWithMostLikes = blogs[0].author;
    const authorHash = {};

    blogs.forEach(blog => {
        if(typeof authorHash[blog.author] === "undefined")
            authorHash[blog.author] = blog.likes;
        else 
            authorHash[blog.author] += blog.likes;
    });

    for (let [authorName, authorLikesCount] of Object.entries(authorHash)) {
        if(authorLikesCount > authorHash[authorWithMostLikes])
            authorWithMostLikes = authorName;
    }

    return authorWithMostLikes;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}