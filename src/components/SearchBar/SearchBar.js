import React from 'react';
import {Form, Button, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faPlus } from "@fortawesome/free-solid-svg-icons";
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function SearchBar() {
    const openCreateDialog = useSelector(state => state.match.isOpen);
    const userID = useSelector(state => state.auth.userID);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleCreateDialog = () => {  
        if (userID === "0")
        {
            history.push('/auth/signin');
            return;
        }
        dispatch({type: "match/open", payload: !openCreateDialog});
    };

    return (
        <Form inline style={{"marginTop": "10px"}}>
        <FormControl type="text" placeholder="Find board by board ID...." className="search-bar"/>
        <Button variant="info" className="search-btn">
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            <span> Join Board</span>
        </Button>
        <Button variant="warning" className="search-btn"
        onClick={handleCreateDialog}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            <span> Play</span>
        </Button>
        </Form>
    )
}

export default SearchBar;
