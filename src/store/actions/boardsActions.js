
const addNewBoard = (newBoard) =>{
    return (dispatch) =>{
        dispatch({
            type: 'boards/addnew',
            payload: newBoard,
        })
    };
}

const updateBoardList = (boardList) =>{
    return (dispatch) =>{
        dispatch({
            type: 'boards/update',
            payload: boardList,
        })
    };
};

export const boardsActions = {
    addNewBoard,
    updateBoardList,
}