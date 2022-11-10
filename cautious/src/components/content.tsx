import { Outlet } from 'react-router-dom'

export default function Content() {
  // const location = useLocation()
  // const menus = useSelector((state: RootState) => state.menu.value)
  // const current = menus.find(menu => menu.info.url === location.pathname)
  return (
    <>
      <Outlet/>
    </>
  )
}
