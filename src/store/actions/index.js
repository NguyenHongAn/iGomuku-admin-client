import {boardsActions} from './boardsActions';
import {authActions} from './authActions';
import {ListUserActions} from './listOnlUserActions';
import {matchActions} from './matchActions';
import {socketActions} from './socketActions';

const ReduxAction = {
    boards: boardsActions,
    auth: authActions,
    users: ListUserActions,
    match: matchActions,
    socket: socketActions,
}

export default ReduxAction;