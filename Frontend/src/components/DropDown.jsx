import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function ({childern}){

    return(
        <DropdownButton id="dropdown-item-button" title="Dropdown button">
        {childern}
      </DropdownButton>
    )
}