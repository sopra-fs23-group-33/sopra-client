import {Spinner} from 'components/ui/Spinner';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";


const Dashboard = () => {

    let content = <Spinner/>;

    return (
        <BaseContainer className="game container">
            <h2>Happy Coding!</h2>
            <p className="game paragraph">
                Get all users from secure endpoint:
            </p>
            {content}
        </BaseContainer>
    );
}

export default Dashboard;
