import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import actions, { IAction } from "../../actions/index";
import FileImportDialog from 'src/components/file-import/file-import';

interface IProps {
  importDataResult: string[],
  importData: (formData: FormData) => void;
  displayWarning: (title: string, message: string) => void;
};

class FileImportContainer extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }
  public render(): JSX.Element { 
    return (
      <div className="container">
        <FileImportDialog 
          importDataResult={this.props.importDataResult} 
          importData={this.props.importData} 
          displayWarning={this.props.displayWarning} />
      </div>
    )
  }  
}

export function mapStateToProps(state: any) {
  return {
    importDataResult: state.dataReducer.importData
  };
}

export function mapDispatchToProps(dispatch: Dispatch<IAction>) {
  return {
    importData: (formData: FormData) => dispatch(actions.importData(formData)),
    displayWarning: (title: string, message: string) => dispatch(actions.displayWarning(title, message))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileImportContainer);