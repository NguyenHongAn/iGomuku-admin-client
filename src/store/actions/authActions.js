const signIn = (authData) => {
    return (dispatch) =>{
        dispatch({
            type: 'auth/signin',
            payload: authData,
        });
    }
}

const signOut = {
    type: 'auth/signout',
    payload: "",
}

const signUp = (authData) =>{
    return (dispatch) =>{
        dispatch({
            type: 'auth/signup',
            payload: authData,
        });
    }
}   

const editInfo = (authData) =>{
    return (dispatch) =>{
        dispatch({
            type: 'auth/edit-info',
            payload: authData,
        });
    }
}   

export const authActions = {
    signIn,
    signOut,
    signUp,
    editInfo
}
