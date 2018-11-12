import * as React from "react";
import { DefaultButton, PrimaryButton, ButtonType } from "office-ui-fabric-react/lib/Button";
import { Dialog, DialogFooter, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { Label } from 'office-ui-fabric-react/lib/Label';
import "./file-import.css";
import Content from '../content/content';

interface IProps {
  importDataResult: string[];
  importData: (formData: FormData) => void;
  displayWarning: (title: string, message: string) => void;
};

interface IState { 
  isImportDisabled: boolean;
  isDialogHidden: boolean;
};

export class FileImportDialog extends React.Component<IProps, IState> {
  private userFileInput: any;
  private tweetFileInput: any;
  private formData: FormData;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isImportDisabled: true,
      isDialogHidden: true
    };
  }

  public render() {
    return (
      <div>
        <DefaultButton
          secondaryText=""
          onClick={this.showDialog}
          text="Import Files"
          buttonType={ButtonType.icon}
        />
        <Label>Import Result: </Label>
        <div>
          {this.props.importDataResult.map((x, idx) => {
            return <li key={idx}>{x}</li>
          })}
        </div>
        <Dialog
          hidden={this.state.isDialogHidden}
          onDismiss={this.cancelUpload}
          dialogContentProps={{
            subText:"Select text files to be imported",
            title: "Upload Files",
            type: DialogType.largeHeader
          }}
          modalProps={{
            containerClassName: "ms-dialogMainOverride",
            isBlocking: true,
            topOffsetFixed: true
          }}
        >
          <Label required={true}>Users: </Label>
          
          <div style={ { display: 'flex' } }>
            <input
              type="file"
              id="users"
              accept={".txt"}
              multiple={false}
              ref={node => (this.userFileInput = node)}
              onChange={this.onFileSelect}
            />
          </div>
          <Label required={true}>Tweets: </Label>
          <div style={ { display: 'flex' } }>
            <input
              type="file"
              id="tweets"
              accept={".txt"}
              multiple={false}
              ref={node => (this.tweetFileInput = node)}
              onChange={this.onFileSelect}
            />
          </div>
          <DialogFooter>
            <PrimaryButton onClick={this.importData} text="Import" />
            <DefaultButton onClick={this.cancelUpload} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private showDialog = (): void => {
    this.formData = new FormData();
    this.setState({ isDialogHidden: false });
  };

  private importData = (): void => {
    if ((this.userFileInput && this.userFileInput.files[0]) && 
        (this.tweetFileInput && this.tweetFileInput.files[0])) {
      this.props.importData(this.formData);
    } else {
      const message = "Invalid selection";
      this.props.displayWarning("File Import", message);
    }
    this.setState({ isDialogHidden: true });
  };

  private cancelUpload = (): void => {
    this.setState({ isDialogHidden: true });
  };

  private onFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // @ts-ignore
    const file: File = e.target.files[0];
    if (file) { 
      if(this.formData.has(e.target.id)) {
        this.formData.delete(e.target.id);
      } 
      this.formData.append(e.target.id, file, file.name);
    }
  }
}

export default FileImportDialog;