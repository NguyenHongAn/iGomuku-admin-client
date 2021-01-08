import React from 'react';
import {Dropdown, ButtonGroup } from 'react-bootstrap';
import {useSelector} from 'react-redux';


function DropdownHistory() {

    const {historySteps} = useSelector(state => ({
      historySteps: state.match.history,
    }));

    const jumpToMove = move =>{
      
    }

    return (
        <Dropdown style={{width: "50%"}} as={ButtonGroup}>
       
        <Dropdown.Toggle split variant="dark" id="dropdown-split-basic">
           History Steps
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            historySteps.map((step,i) =>{
              return <Dropdown.Item onClick={()=>{jumpToMove(i)}}
                      key={i}>{`Step ${i}`}</Dropdown.Item>
            })
          }
        </Dropdown.Menu>
      </Dropdown>
    )
}

export default DropdownHistory;
