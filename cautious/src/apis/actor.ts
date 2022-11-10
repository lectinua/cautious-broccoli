import { UserWithRole } from '@/store/user'
import { checkError } from '@/utils/api'
import { supabase } from '@/apis/index'

export interface Actor {
  name: string
  description: string
}

// TODO
export const selectActors = async (user: UserWithRole | null): Promise<Actor[]> => {
  if ( user === null ) return []

  const actors = checkError(
    await supabase
      .from('menu_role')
      .select(`
        create, read, update, delete,
        info:menu(id, name, order, url)
      `)
      .eq('role_id', user.role_id)
  ) as Actor[]

  return []
}
