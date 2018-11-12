import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import actions, { IAction } from "../../actions/index";
import { IUserModel } from 'src/models/user-model';
import { DetailsListWrapper } from '../../components/detail-list/details-list';
import { IColumn } from 'office-ui-fabric-react';

const columnDefs = [
  {
    key: 'column1',
    name: 'Screen Name',
    fieldName: 'screenName',
    minWidth: 100,
    maxWidth: 500,
    isResizable: true
  },
  {
    key: 'column2',
    name: 'User Id',
    fieldName: 'id',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  }
];

interface IProps {
  fetchData: () => void,
  users: IUserModel[],
}

interface IState { 
  columns: IColumn[]
};

export class UserDetailsContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      columns: columnDefs
    };
  }
  public componentDidMount() {
    // @ts-ignore
    this.props.fetchData();
  }

  public render(): JSX.Element {
    const { columns } = this.state;
    const { users } = this.props;
    return (
      <DetailsListWrapper
        items={users}
        columns={columns}
      />
    );
  }
}

export function mapStateToProps(state: any) {
  return {
    users: Object.keys(state.dataReducer.users).map(key => state.dataReducer.users[key])
  };
}

export function mapDispatchToProps(dispatch: Dispatch<IAction>) {
  return {
    fetchData: () => dispatch(actions.fetchUserData())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsContainer);
 