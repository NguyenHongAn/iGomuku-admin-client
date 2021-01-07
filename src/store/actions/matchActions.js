
const openCreateDialog = {
    type: "match/open",
    payload: true,
}

const closeCreateDialog = {
    type: "match/close",
    payload: false,
}

const startNewMatch = (size = 20, newMatch) =>{
    return (dispatch) =>{
        dispatch({
            type: 'match/create',
            payload: {
                size, 
                newMatch
            },
        });
    }
}

const saveHistory = (history) =>{
    return (dispatch) =>{
        dispatch({
            type: 'match/saveHistory',
            payload: history
        });
    }
}

const winningDisplay = (winner) =>{
    return (dispatch) =>{
        dispatch({
            type: 'match/finnishMatch',
            payload: winner
        });
    }
}

const restoreDefault = {
    type: "match/restore",
    payload: "restore"
}

export const matchActions = {
    startNewMatch,
    saveHistory,
    winningDisplay,
    restoreDefault,
    openCreateDialog,
    closeCreateDialog,
}