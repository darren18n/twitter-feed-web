import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import Guid from 'src/models/guid';

interface IState { 
  selectionDetails: string;
};

interface IProps {
  columns: IColumn[],
  items: object[]
}

export class DetailsListWrapper extends React.Component<IProps, IState> {
  private selection: Selection;

  constructor(props: IProps) {
    super(props);
    this.selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    this.state = {
      selectionDetails: this._getSelectionDetails()
    };
  }

  public render(): JSX.Element {
    const { selectionDetails } = this.state;
    const { columns, items} = this.props;
    return (
      <div>
        <div>{selectionDetails}</div>
        <MarqueeSelection selection={this.selection}>
          <DetailsList
            key={Guid.newGuid()}
            items={items}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={this.selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this.onItemInvoked}
            compact={true}
          />
        </MarqueeSelection>
      </div>
    );
  }

  private _getSelectionDetails(): string {
    const selectionCount = this.selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this.selection.getSelection()[0] as any).id;
      default:
        return `${selectionCount} items selected`;
    }
  }

  private onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }
}
 