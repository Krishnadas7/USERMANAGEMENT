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
         addUser : builder.mutation({ 
            query:(data)=>({
                url:`${ADMIN_URL}/add-user`,
                method:'POST',
                body:data
            })
         }),
         updateUserData :builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/users/update-user`,
                method:'PUT',
                body:data
            })
         }),
        //  getUserEditData:builder.mutation({
        //     query:(data)=>({
        //         url:`${ADMIN_URL}/users/get-edit-user`,
        //         method:'GET'
        //     })
        //  })
          
    })
})

export const {
    useAdminLoginMutation,
    useAdminLogoutMutation,
    useGetUserDataMutation,
    useDeleteUserMutation,
    useAddUserMutation,
    useUpdateUserDataMutation
    // useGetUserEditDataMutation
}=adminApiSlice