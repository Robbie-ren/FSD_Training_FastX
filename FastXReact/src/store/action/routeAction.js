import axios from "axios"

const getRoutesApi = 'http://localhost:8080/api/route/top'

export const getRoutes=()=>{
    // action fn must return a fn having action object wrapped in dispatch
    return async (dispatch)=>{ // Thunk provides dispatch
        //Call the API
        const response = await axios.get(getRoutesApi)
        //dispatch the action object
        let action = {
            type : 'GET_ROUTES',
            payload:response.data
        }
        dispatch(action)
    }
}
