import * as React from 'react';
import { loadTheme, Fabric } from 'office-ui-fabric-react';
import { Palette } from "../../theme";
import NotificationContainer from "../notifications/notifications";
import Content from '../../components/content/content';
import { SideBarMenu, SideBarMenuOptions } from '../../components/sidebar-menu/sidebar-menu';
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/navbar';
import TweetDetailsContainer from '../tweet-details/tweets-details-list';
import UserDetailsContainer from '../user-details/users-details-list';
import FileImportContainer from '../file-import/file-import-container';

loadTheme({
  palette: Palette
});

interface IState { 
  isImportContentVisible: boolean;
  isTweetContentVisible: boolean;
  isUserContentVisible: boolean;
};

class App extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      isImportContentVisible : false,
      isTweetContentVisible: true,
      isUserContentVisible: false
    };
  }

  public render() {
    const {isImportContentVisible, isTweetContentVisible, isUserContentVisible} = this.state;
    return (
      <Fabric className="App">
        <div className="header">
          <NavBar />
        </div>
        <NotificationContainer />
        <div className="body">
          <div className="content">
            <Content >
              {isImportContentVisible && <FileImportContainer />}
              {isTweetContentVisible && <TweetDetailsContainer />}
              {isUserContentVisible && <UserDetailsContainer />}
            </Content>
          </div>
          <div className="sidebar">
            <SideBarMenu onItemSelect={this.onItemSelect}/>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </Fabric>
    );
  }

  private onItemSelect = (key: string): void => {
    let isImportContentVisible = false;
    let isTweetContentVisible = false;
    let isUserContentVisible = false;

    switch (key) {
      case SideBarMenuOptions.Import:
        isImportContentVisible = true;
        break;
      case SideBarMenuOptions.Tweets:
        isTweetContentVisible = true;
        break;
      case SideBarMenuOptions.Users:
        isUserContentVisible = true;
        break;
    
      default:
        break;
    }
    this.setState({ isImportContentVisible, isTweetContentVisible, isUserContentVisible });
  };
}

export default App;
