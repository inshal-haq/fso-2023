const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => (
  <>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} />
  </>
)

const Total = ({ sum }) => <p><b>Total of {sum} exercises</b></p>

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
  </div>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10 
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return <Course course={course} />
}

export default App