const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = blogs => {
  let max = 0
  let mostLikedBlog = null

  blogs.forEach(blog => {
    if (blog.likes > max) {
      max = blog.likes
      mostLikedBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
  })

  return mostLikedBlog
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}