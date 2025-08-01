import { useState } from "react"
import { v1 } from "../api/v1/v1"

export type ReturnHookType<Res> = {
    loading: boolean
    get: (url: string) => Promise<{error: string | null, data: Res | null}> //потом дополнить при необходимости
}

export const useDefaultGet = <Res>(): ReturnHookType<Res> => {
    const [loading, setLoading] = useState(false);

    const get = async (url: string): Promise<{error: string | null, data: Res | null}>  => {
        try {
             setLoading(true)
             const res = await v1.get<Res>(url, {withCredentials: true})
            return {error: null, data: res.data}
        }
        catch (e: any) {
            return {error: e.response ? e.response.data.error : 'Сервер не активен', data: null}
        }
        finally {
            setLoading(false)
        }
    }

    return {loading, get}
}

