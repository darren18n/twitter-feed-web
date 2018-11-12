import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import "./panel.css";


interface IProp { 
  type: PanelType;
};

interface IState { 
  showPanel: boolean;
};

export class SidePanel extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);
    this.state = { showPanel: false };
  }


  public render(): JSX.Element {
    // const className = this.props.type === PanelType.custom ? "panel-content" : "";
    const className = "panel-content";
    return (
      <div >
        <Panel
          className={className}
          isBlocking={false}
          isOpen={true}
          type={this.props.type}
          headerText="Twitter Feeds"
          hasCloseButton={false}
        >
          {this.props.children}
        </Panel>
      </div>
    );
  }
}


export default SidePanel