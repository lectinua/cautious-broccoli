import { userActions, UserWithRole } from '@/store/user'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/apis/index'
import { checkError } from '@/utils/db'
import { selectMenus } from '@/apis/menu'
import { menuActions } from '@/store/menu'
import { Dispatch } from 'redux'

export const signIn = async (user: User, dispatch: Dispatch) => {
  const data = checkError(
    await supabase
      .from('user')
      .select('user_role(role_id)')
      .eq('email', user.email)
  )

  let role_id = 1
  if ( data.length ) {
    const role = data[0] as { user_role: [{ role_id: number }] }
    if ( role.user_role.length ) {
      role_id = role.user_role[0].role_id
    }
  }

  const userWithRole: UserWithRole = {
    ...user,
    role_id
  }

  const menus = await selectMenus(userWithRole)

  dispatch(userActions.set(userWithRole))
  dispatch(menuActions.set(menus))
}
