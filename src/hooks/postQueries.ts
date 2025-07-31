import { useState } from "react"
import { v1 } from "../api/v1/v1"

export type ReturnHookType<Req, Res> = {
    loading: boolean
    post: (url: string, data: Req) => Promise<{error: string | null, data: Res | null}> //потом дополнить при необходимости
}

export const useDefaultPost = <Req, Res>(): ReturnHookType<Req, Res> => {
    const [loading, setLoading] = useState(false);

    const post = async (url: string, dataArg: Req): Promise<{error: string | null, data: Res | null}>  => {
        try {
             setLoading(true)
             const res = await v1.post<Res>(url, dataArg, {withCredentials: true})
            return {error: null, data: res.data}
        }
        catch (e: any) {
             return {error: e.response ? e.response.data.error : 'Сервер не активен', data: null}
        }
        finally {
            setLoading(false)
        }
    }

    return {loading, post}
}