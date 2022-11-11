import { userActions, UserWithRole } from '@/store/user'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/apis/index'
import { checkError } from '@/utils/api'
import { selectMenus } from '@/apis/menu'
import { menuActions } from '@/store/menu'
import { Dispatch } from 'redux'

export const signIn = async (dispatch: Dispatch): Promise<UserWithRole | null> => {
  const { data: { session } } = await supabase.auth.getSession()

  if ( session?.user === undefined ) return null

  const expires_at = session.expires_at! * 1000
  const refresh_token = session.refresh_token
  const user: User = session.user

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
    role_id,
    expires_at,
    refresh_token
  }

  const menus = await selectMenus(userWithRole)

  dispatch(userActions.set(userWithRole))
  dispatch(menuActions.set(menus))

  return userWithRole
}

// export const refreshSession = async (user: UserWithRole) => {
//   const session = { refresh_token: user.refresh_token }
//   const { data: { user: newUser, session: newSession }, error } = await supabase.auth.refreshSession(session)
//   console.log('user:', user)
//   console.log('session:', session)
// }
