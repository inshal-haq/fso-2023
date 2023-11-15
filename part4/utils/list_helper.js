const _ = require('lodash')

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

// returns the author who has the largest amount of blogs.
// The return value also contains the number of blogs the top author has
const mostBlogs = blogs => {
  if (blogs.length === 0) return null

  const authorBlogCounts = _.countBy(blogs, 'author')

  const mostBlogsAuthor = (Object.keys(authorBlogCounts)
    .reduce((a, b) => authorBlogCounts[a] > authorBlogCounts[b] ? a : b))

  const result = {
    author: mostBlogsAuthor,
    blogs: authorBlogCounts[mostBlogsAuthor]
  }

  return result
}

const mostLikes = blogs => {
  if (blogs.length === 0) return null

  const allAuthorBlogs = _.groupBy(blogs, 'author')

  let max = 0
  let mostLikedAuthor = null

  _.forEach(allAuthorBlogs, (authorBlogs, author) => {
    if (totalLikes(authorBlogs) > max) {
      max = totalLikes(authorBlogs)
      mostLikedAuthor = {
        author,
        likes: max
      }
    }
  })

  return mostLikedAuthor
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}