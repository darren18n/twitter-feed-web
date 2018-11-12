import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as Notifications from 'react-notification-system-redux';


interface IProps {
  notifications: any
};

class NotificationContainer extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }
  public render(): JSX.Element { 
    const {notifications} = this.props;
    
    const style = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px'
        },

        success: { // Applied only to the success notification item
          color: 'red'
        }
      }
    };

    return (
      <Notifications
        notifications={notifications}
        style={style}
      />
    );
  }
}

export function mapStateToProps(state: any) {
  return {
    notifications: state.notifications
  };
}

export default connect(mapStateToProps, null)(NotificationContainer);