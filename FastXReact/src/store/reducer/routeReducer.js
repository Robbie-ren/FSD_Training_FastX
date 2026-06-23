const initialState = {
    routes : []
}

export const routeReducer=(state=initialState, action)=>{
        if(action.type === 'GET_ROUTES'){
            return{
                ...state,     //making a clone to replace earlier immutable state to new state
                routes: action.payload  //attach data(payload) to incidents in store
            }
        }
        
        return state
}