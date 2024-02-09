import { apiSlice } from "./apiSlice";
const ADMIN_URL = '/api/admin'

export const adminApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        adminLogin:builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/login`,
                method:'POST',
                body:data
            })
        }),
        adminLogout: builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/logout`,
                method:'POST'
            })
        }),
        getUserData: builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/users`,
                method:'GET'
            })
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
              url: `${ADMIN_URL}/users/delete?id=${data}`,
              method: 'DELETE',
            })
          }),
    })
})

export const {
    useAdminLoginMutation,
    useAdminLogoutMutation,
    useGetUserDataMutation,
    useDeleteUserMutation
}=adminApiSlice