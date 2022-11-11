import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import React, { useEffect, useState } from 'react'
import Error from '@/pages/error'
import Sidebar from '@/layouts/sidebar'
import Footer from '@/layouts/footer'

export default function Index() {
  const location = useLocation()
  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.user.value)
  const menus = useSelector((state: RootState) => state.menu.value)

  const [expired, setExpired] = useState(false)

  useEffect(() => {
    let is_expired = false
    if ( user !== null ) {
      const expires_date = new Date()
      expires_date.setTime(user.expires_at)
      is_expired = new Date() > expires_date
    }
    setExpired(is_expired)
  }, [user])

  const goto401 = () => navigate('/error')

  if ( user !== null ) {
    const current = menus.find(menu => menu.info.url === location.pathname)
    current !== undefined && !current.read && goto401()
  }

  useEffect(() => {
    user === null && location.pathname !== '/' && goto401()
  }, [location.pathname])

  return (
    <>
      {
        expired
          ? <Error text={'인증이 만료되었습니다.'}/>
          :
          <>
            <Sidebar logo={'Test'}>
              <Outlet/>
            </Sidebar>
            <Footer/>
          </>
      }
    </>
  )
}
