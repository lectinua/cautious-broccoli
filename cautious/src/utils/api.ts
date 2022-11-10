import axios from 'axios'
import { PostgrestResponse } from '@supabase/supabase-js'

export const checkError = <T>({ data, error }: PostgrestResponse<T | undefined | unknown>) => {
  if ( error ) throw error
  return data
}

export const getIpAddress = async (): Promise<string> => {
  const { data: { IPv4 } } = await axios.get('https://geolocation-db.com/json/')
  return IPv4
}

export const deepCopy = <T>(obj: Object) => {
  return JSON.parse(JSON.stringify(obj)) as T
}
