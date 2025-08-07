import { Route,Routes, useMatch } from 'react-router-dom'

import Home from './pages/student/Home.jsx'
import CourseList from './pages/student/CourseList.jsx'
import CourseDetail from './pages/student/CourseDetail.jsx'
import Myenrolment from './pages/student/Myenrolment.jsx'
import Player from './pages/student/Player.jsx'
import Loading from './components/student/Loading.jsx'
import Educator from './pages/educator/Educator.jsx'
import Dashboard from './pages/educator/Dashboard.jsx'
import Mycourses from './pages/educator/Mycourses.jsx'
import Studentenroll from './pages/educator/Studentenroll.jsx'
import AddCourse from './pages/educator/AddCourse.jsx'
import Navbar from './components/student/Navbar.jsx'

function App() {

  const isEducatorRoute=useMatch('/educator/*')
  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute&& <Navbar/>}
     
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/course-List' element={<CourseList/>}></Route>
      <Route path='/course-List/:input' element={<CourseList/>}></Route>

      <Route path='/course/:id' element={<CourseDetail/>}></Route>
      <Route path='/my-enrollment' element={<Myenrolment/>}></Route>
      <Route path='/player/:courseId' element={<Player/>}></Route>
      <Route path='/loading/:path' element={<Loading/>}></Route>
      <Route path='/educator' element={<Educator/>}>
               <Route path='/educator' element={<Dashboard/>}></Route>
      <Route path='my-course' element={<Mycourses/>}></Route>
          <Route path='student-enrolled' element={<Studentenroll/>}></Route>
              <Route path='add-course' element={<AddCourse/>}></Route>


      </Route>


    </Routes>
    </div>
  )
}

export default App
