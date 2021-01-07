const defaultState = {
    history: [{                 //lịch sử các bước chơi cờ 
        squares: Array(20*20).fill(null),
        pos:-1,
        }],
                            //bàn cờ hiện tại
    stepNumber: 0,          //các bước đã thực hiện     
    boardID: "",            //Id của ván cờ 
    boardName: "",
    owner: {},              //thông tin người tạo
    player: {},              //thông tin người chơi
    winner: {},
    isOpen: false,
    status: 0,              //-1:deny, 0:not create, 1:watting, 2:playing
    eloGot: 0,

}

const boardReducer = (state = defaultState, action) =>{
    switch(action.type)
    {
        case "match/open":
            return {
                ...state,
                isOpen: action.payload,
            }
        case "match/create":
            return {
                ...state,
                boardID: action.payload.boardID,
                owner: action.payload.owner,
                boardName: action.payload.boardName,
                player: action.payload.player,
                status: action.payload.status,
            }
        case "match/storePlayerTemporary":
        return{
            ...state,
            player: action.payload,
        }
        case "match/clearPlayer": 
        return {
            ...state,
            player: {},
        }
        case "match/updateInfo":
            return {
                ...state,
                owner: action.payload.owner,
                player: action.payload.player,
                eloGot: action.payload.eloGot,
            }
        case 'match/saveHistory':
          {  
            const tempArray = Array.from(state.history);
            tempArray.push(action.payload);
            return {
                ...state,
                history: tempArray,
                stepNumber: state.history.length,
            }
        }
        
        case "match/finnishMatch":
            return {
                ...state,
                winner: action.payload,
            }
        case "match/restore":
            return {
            
                history: [{                 //lịch sử các bước chơi cờ 
                    squares: Array(16*16).fill(null),
                    pos:-1,
                    }],
                                        //bàn cờ hiện tại
                stepNumber: 0,          //các bước đã thực hiện     
                boardID: "",            //Id của ván cờ 
                boardName: "",
                owner: {},              //thông tin người tạo
                player: {},              //thông tin người chơi
                winner: {},   
                status: 0,              //-1:deny, 0:not create, 1:waiting, 2:playing
                eloGot: 0,        
                isOpen: false,    
            }
        default: 
        return state;
    }
}

export default boardReducer;