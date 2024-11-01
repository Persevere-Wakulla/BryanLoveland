import { useState } from 'react'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

// LAYOUTS //
import NavLayout, { navArticlesLoader } from './layouts/NavLayout'
import HelpLayout from './layouts/HelpLayout'
import ArticlesLayout, { articlesLoader } from './layouts/ArticlesLayout'
import DecriminalizeLayout from './layouts/DecriminalizeLayout'
import MedicalLayout, { medicalLoader } from './layouts/MedicalLayout'
import BlogLayout, { BlogLoader } from './layouts/BlogLayout'
// PAGES!! //
import Home from './Pages/Home'
import ArticlesDetails, { articlesDetailsLoader } from './Pages/Articles/ArticlesDetails'
import Mdma, { mdmaLoader } from './Pages/Medical/MDMA/Mdma'
import MdmaBenefits, { mdmaBenefitsLoader } from './Pages/Medical/MDMA/MdmaBenefits'
import MdmaStatus, { mdmaStatusLoader } from './Pages/Medical/MDMA/MdmaStatus'
import MdmaStatistics, { mdmaStatssLoader } from './Pages/Medical/MDMA/MdmaStatistics'
import BlogPostPage from './Pages/Blog/BlogPostPage'
import MedicalArticleDetails, { medicalDetailsLoader } from './Pages/Medical/MedicalArticleDetails'
import Psilocybin, { psilocybinLoader } from './Pages/Medical/Psilocybin/Psilocybin'
import PsilocybinStatistics, { psilocybinStatsLoader } from './Pages/Medical/Psilocybin/PsilocybinStatistics'
import PsilocybinBenefits, { psilocybinBenefitsLoader } from './Pages/Medical/Psilocybin/PsilocybinBenefits'
import PsilocybinStatus, { psilocybinStatusLoader } from './Pages/Medical/Psilocybin/PsilocybinStatus'
import BlogDetails, { BlogsDetailsLoader } from './Pages/Blog/BlogDetails'
import AllPost from './Pages/Blog/AllPost'
import RegisterForm from './Pages/RegisterForm'
// ADMIN PAGE
import Admin from './Pages/Admin Pages/Admin'
import MedicalUpdate from './Pages/Admin Pages/MedicalUpdate'
import PsilocybinAdmin from './Pages/Admin Pages/psilocybin/PsilocybinAdmin'
import MdmaAdmin from './Pages/Admin Pages/mdma/MdmaAdmin'
import NewsUpdate from './Pages/Admin Pages/NewsUpdate'
import PetitionReq, { petitionLoader } from './Pages/Admin Pages/PetitionReq'
import RegisteredUsers, { registeredUsersLoader } from './Pages/Admin Pages/RegisteredUsers'
import BlogReview, { ReviewBlogs } from './Pages/Admin Pages/BlogReview'

function App() {
  const [loggedin, setLoggedIn] = useState(false)
  const [userId, setUserId] = useState('')
  function userLogin(username) {
    setUserId(username)
    setLoggedIn(true)
    console.log(username)
  }

  const router = createBrowserRouter(
    createRoutesFromElements(

      // Home //
      <Route path='/'
        element={<NavLayout setUserId={setUserId} loggedInUser={userId} setLoggedIn={setLoggedIn} />} loader={navArticlesLoader}>
        <Route index element={<Home />} />
        <Route path='register' element={<RegisterForm userId={userLogin} user={userId} />} />

        // Admin Pages //
        <Route path='admin' element={<Admin />}>
          <Route path='psilocybinadmin' element={<PsilocybinAdmin />}>
          </Route>
          <Route path='mdmaadmin' element={<MdmaAdmin />}>
          </Route>
          <Route path='medicaladmin' element={<MedicalUpdate />} />
          <Route path='newsadmin' element={<NewsUpdate />} />
          <Route path='petitionreq' element={<PetitionReq />} loader={petitionLoader} />
          <Route path='registeredusers' element={<RegisteredUsers />} loader={registeredUsersLoader} />
          <Route path='blogreview' element={<BlogReview />} loader={ReviewBlogs} />
        </Route>

         // Blog Page
        <Route path='blogpage' element={<BlogLayout />}>
          <Route index element={<AllPost loggedin={loggedin} />} loader={BlogLoader} />
          <Route
            path=':id'
            element={<BlogDetails loggedin={loggedin} loggedInUser={userId} />}
            loader={BlogsDetailsLoader} />
          <Route path='blogpostpage' element={<BlogPostPage loggedInUser={userId} />} />
        </Route>

        // News Page //
        <Route path='articlepage' element={<ArticlesLayout />}
          loader={articlesLoader}>
          <Route
            path=":id"
            element={<ArticlesDetails />}
            loader={articlesDetailsLoader} />
        </Route>
        <Route path='decriminalizepage' element={< DecriminalizeLayout />}>
        </Route>

        // Medical Section //
        <Route path='medicalpage' element={<MedicalLayout />}
          loader={medicalLoader}>
          <Route
            path=":id"
            element={<MedicalArticleDetails />}
            loader={medicalDetailsLoader} />

          // MDMA Page //
          <Route path='mdma' element={<Mdma />} loader={mdmaLoader}>
            <Route path='mdmastatistics' element={<MdmaStatistics />} loader={mdmaStatssLoader} />
            <Route path='mdmabenefits' element={<MdmaBenefits />} loader={mdmaBenefitsLoader} />
            <Route path='mdmastatus' element={<MdmaStatus />} loader={mdmaStatusLoader} />
          </Route>

          // Psilocybin Page //
          <Route path='psilocybin' element={<Psilocybin />} loader={psilocybinLoader}>
            <Route path='psilocybinstatistics' element={<PsilocybinStatistics />} loader={psilocybinStatsLoader} />
            <Route path='psilocybinbenefits' element={<PsilocybinBenefits />} loader={psilocybinBenefitsLoader} />
            <Route path='psilocybinstatus' element={<PsilocybinStatus />} loader={psilocybinStatusLoader} />
          </Route>

        </Route>
          // SITE HELP //
        <Route path='help' element={<HelpLayout />}>
        </Route>

      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}
export default App
