import { useState } from "react"
import { v1 } from "../api/v1/v1"

export type ReturnHookType<Res> = {
    loading: boolean
    deleteC: (url: string) => Promise<{error: string | null, data: Res | null}> //потом дополнить при необходимости
}

export const useDefaultDelete = <Res>(): ReturnHookType<Res> => {
    const [loading, setLoading] = useState(false);

    const deleteC = async (url: string): Promise<{error: string | null, data: Res | null}>  => {
        try {
            setLoading(true)
            const res = await v1.delete<Res>(url, {withCredentials: true})
            return {error: null, data: res.data}
        }
        catch (e: any) {
            return {error: e.response ? e.response.data.error : 'Сервер не активен', data: null}
        }
        finally {
            setLoading(false)
        }
    }

    return {loading, deleteC}
}

