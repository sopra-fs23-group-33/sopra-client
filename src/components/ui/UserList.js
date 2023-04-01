import PropTypes from "prop-types";
import 'styles/ui/TableUserOverciew.scss';

const UserList = props => (
    <ul {...props} className={`table-user-overview ${props.className ?? ''}`}>
        {props.children}
    </ul>
);

UserList.propTypes = {
    children: PropTypes.node,
};

export default UserList;