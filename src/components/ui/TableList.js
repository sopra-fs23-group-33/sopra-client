import PropTypes from "prop-types";
import 'styles/ui/Dashboard_ui/TableUserOverview.scss';

const TableList = props => (
    <ul {...props} className={`table user-overview ${props.className ?? ''}`}>
        {props.children}
    </ul>
);

TableList.propTypes = {
    children: PropTypes.node,
};

export default TableList;