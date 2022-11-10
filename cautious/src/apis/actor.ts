import { checkError } from '@/utils/api'
import { supabase } from '@/apis/index'

export interface Actor {
  id?: number
  name: string
  description: string
  created_at?: Date
  updated_at?: Date
}

export const selectActors = async (): Promise<Actor[]> => {
  return  checkError(
    await supabase
      .from('actor')
      .select('id, name, description, created_at, updated_at')
  ) as Actor[]
}

export const saveActor = async (actor: Actor): Promise<Actor> => {
  delete actor.created_at

  const result = checkError(
    await supabase
      .from('actor')
      .upsert(actor)
      .select()
  ) as Actor[]

  return result.length
    ? result[0]
    : actor
}

export const deleteActor = async (id: number) => {
  checkError(
    await supabase
      .from('actor')
      .delete()
      .eq('id', id)
  )
}
