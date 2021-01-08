import {boardsActions} from './boardsActions';
import {authActions} from './authActions';
import {ListUserActions} from './listOnlUserActions';
import {matchActions} from './matchActions';
import {socketActions} from './socketActions';
import {adminActions} from './adminActions';

const ReduxAction = {
    boards: boardsActions,
    auth: authActions,
    users: ListUserActions,
    match: matchActions,
    socket: socketActions,
    admin: adminActions,
}

export default ReduxAction;