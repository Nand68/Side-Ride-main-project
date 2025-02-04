
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Mainlayout from './layouts/mainlayout';
import Indexpage from './pages/Indexpage';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Dashboard from './pages/Dashboard';
import Offerpage from './pages/Offerpage';
import Profilepage from './pages/Profilepage';
import AuthLayout from './layouts/AuthLayout';
import Layout1 from './layouts/Layout1';
import RideHistory from './pages/RideHistory';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './layouts/AdminLayout';
import MyRides from './pages/MyRides';
import ComplaintRegister from './pages/ComplaintRegister';
import ComplaintList from './pages/ComplaintList';
// import AdminLogin from "./components/AdminLogin";
// import AdminDashboard from "./components/AdminDashboard";


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<Mainlayout />}>
        <Route path='/' element={<Indexpage />} />
      </Route>

      <Route path='/' element={<AuthLayout/> }>
      <Route path='/login' element={<Loginpage/>}/>
      <Route path='/signup' element={<Signuppage/>}/>
      </Route>

<Route path='/' element={<Layout1/>}>
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/offer' element={<Offerpage/>} />
      <Route path='/profile' element={<Profilepage/>}  />
      <Route path='/history' element={<RideHistory/>} />
      <Route path='/myrides' element={<MyRides/>} />
      <Route path='/complaintregister' element={<ComplaintRegister/>} />
      
      </Route> 
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/' element={<AdminLayout/>}>
      <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      <Route path='/admin/complaintlist' element={<ComplaintList/>} />
      </Route>
      
    </>


  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App