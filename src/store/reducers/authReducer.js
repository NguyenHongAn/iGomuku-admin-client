

const defaultState ={
    jwtToken: "invalid token :))",
    fullname: 'unknown :))',
    userID: "0",
    autoMatch:false,
}

const authReducer = (state = defaultState,  action) =>{
    switch (action.type) {
        case "auth/signin":
            return {
                ...state,
                jwtToken: action.payload.jwtToken,
                fullname: action.payload.fullname,
                userID: action.payload.userID,
                autoMatch: action.payload.autoMatch,
            }
        case "auth/signout":
            return {
                jwtToken: "invalid token :))",
                fullname: 'unknown :))',
                userID: "0",
                autoMatch: false,
            }
        default:
           return state;
    }
}

export default authReducer;