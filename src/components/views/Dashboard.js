import {Spinner} from 'components/ui/Spinner';
import "styles/views/Dashboard.scss";
import SideBar from "../ui/SideBar";


const Dashboard = () => {

    let content = <Spinner/>;

    return (
        <SideBar>
            {content}
        </SideBar>
        // <Drawer
        //     anchor="left"
        //     //onClose={onClose}
        //     open="true"
        //     elevation="1000"
        //     PaperProps={{
        //         sx: {
        //             backgroundColor: 'neutral.800',
        //             color: 'common.white',
        //             width: 280
        //         }
        //     }}
        //     sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        //     variant="permanent"
        // >
        //     {content}
        // </Drawer>
        // <Container>
        //     {content}
        // </Container>
        // <BaseContainer className="dashboard container">
        //     <h2>Happy Coding!</h2>
        //     <p className="game paragraph">
        //         Get all users from secure endpoint:
        //     </p>
        //     {content}
        // </BaseContainer>
    );
}

export default Dashboard;
