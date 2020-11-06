const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    if(!blogs) return 0;
    return blogs.reduce((sum, item) => sum + item.likes, 0);
}

module.exports = {
    dummy,
    totalLikes
}