import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import actions, { IAction } from "../../actions/index";
import { ITweetModel } from 'src/models/tweet-model';
import { DetailsListWrapper } from '../../components/detail-list/details-list';
import { IColumn } from 'office-ui-fabric-react';

const columnDefs = [
  {
    key: 'column1',
    name: 'Message',
    fieldName: 'message',
    minWidth: 100,
    maxWidth: 500,
    isResizable: true
  },
  {
    key: 'column2',
    name: 'User',
    fieldName: 'user_id',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
  {
    key: 'column3',
    name: 'Create Date',
    fieldName: 'create_date',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  }
];

interface IProps {
  fetchData: () => void,
  tweets: ITweetModel[],
}

interface IState { 
  columns: IColumn[]
};

export class TweetDetailsContainer extends React.Component<IProps, IState> {
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
    const { tweets } = this.props;
    return (
      <DetailsListWrapper
        items={tweets}
        columns={columns}
      />
    );
  }
}

export function mapStateToProps(state: any) {
  return {
    tweets: Object.keys(state.dataReducer.tweets).map(key => state.dataReducer.tweets[key])
  };
}

export function mapDispatchToProps(dispatch: Dispatch<IAction>) {
  return {
    fetchData: () => dispatch(actions.fetchTweetData())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetDetailsContainer);
 