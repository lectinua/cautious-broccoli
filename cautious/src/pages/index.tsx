import './index.css'
import Sidebar from '@/layouts/sidebar'
import Footer from '@/layouts/footer'
import { Outlet } from 'react-router-dom'

export default function Index() {
  return (
    <>
      <Sidebar logo={'Test'}>
        <Outlet/>
      </Sidebar>
      <Footer/>
    </>
  )
}
