import { supabase } from '@/apis/index'
import { UserWithRole } from '@/store/user'
import { checkError } from '@/utils/api'

export interface Menu {
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
  info: {
    id: number
    name: string
    order: number
    url: string
  }
}

export const selectMenus = async (user: UserWithRole | null): Promise<Menu[]> => {
  if ( user === null ) return []

  const menus = checkError(
    await supabase
      .from('menu_role')
      .select(`
        create, read, update, delete,
        info:menu(id, name, order, url)
      `)
      .eq('role_id', user.role_id)
  ) as Menu[]

  return menus.sort((x, y) => x.info.order - y.info.order)
}
