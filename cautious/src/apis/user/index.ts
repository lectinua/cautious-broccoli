import { supabase } from '@/apis'
import { PostgrestResponse, User as SupaUser } from '@supabase/supabase-js'
import userStore from '@/store/user'

export const enum Role {
  GUEST = 'guest',
  ADMIN = 'admin'
}

export interface User {
  email: string
  role_id: number
}

const checkError = ({ data, error }: PostgrestResponse<User | undefined | unknown>) => {
  if ( error ) throw error
  return data
}

export const signIn = async (user: SupaUser) => {
  const email = user.email
  if (email === undefined) return

  const data = checkError(
    await supabase.from('user_role')
      .select('email, role(authority)')
      .eq('email', email)
  )

  if ( data.length )
    userStore.set(data[0] as User)
  else
    userStore.set({
      email,
      role_id: 1 // guest
    })
}
