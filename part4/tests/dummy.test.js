const listHelper = require('../utils/list_helper')

const emptyList = []

const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10
  }
]

const listWithManyBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

test('dummy returns one', () => {
  const result = listHelper.dummy(emptyList)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is 0', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(10)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(15)
  })
})

describe('favorite blog', () => {
  const mostLikedBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 10
  }

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toEqual(null)
  })

  test('when list has only one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(mostLikedBlog)
  })

  test('of a bigger list is selected right', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual(mostLikedBlog)
  })
})