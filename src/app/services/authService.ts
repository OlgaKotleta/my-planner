export const authService = {
    register: async (userData:{ name: string; email: string; password: string}) => {
        const response = await fetch ('/api/auth/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json; charset=utf-8'
            },
            body:JSON.stringify(userData)
        })
        const data = await response.json()
        if (!response.ok){
            throw new Error(data.error || 'Ошибка регистрации')
        }
        return data
    }
}
export const loginService = {
    register: async (userData:{ id: number, email: string; password: string}) =>{
        const response = await fetch ('/api/auth/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json; charset=utf-8'
            },
            body:JSON.stringify(userData)
        })
        const data = await response.json()
        if (!response.ok){
            throw new Error(data.error || 'Ошибка входа')
        }
        return data
    }
}
export const getUser = async(UserId: string) => {
    try{
    const response = await fetch (`api/user/${UserId}`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok){
        throw new Error('Ошибка загрузки пользователя')
    }
    const userData = await response.json()
    return userData
}
catch(error){
console.error('Eroror', error)
throw error
}
}