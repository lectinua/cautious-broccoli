import { supabase } from '@/apis/index'
import { UserWithRole } from '@/store/user'
import { checkError } from '@/utils/db'

export interface Menu {
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
  info: {
    id: number
    name: string
  }
}

export const selectMenus = async (user: UserWithRole | null): Promise<Menu[]> => {
  if ( user === null ) return []

  return checkError(
    await supabase
      .from('menu_role')
      .select(`
        create, read, update, delete,
        info:menu(id, name, order)
      `)
      .eq('role_id', user.role_id)
  ) as Menu[]
}
