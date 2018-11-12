import * as React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import Guid from 'src/models/guid';

export enum SideBarMenuOptions {
  Import = "Import",
  Tweets = "Tweets",
  Users = "Users",
}

const links = [
  {
    key: 'Import',
    name: 'Import Files',
    url: '/#/import'
  },
  {
    key: 'Tweets',
    name: 'View Tweets',
    url: '/#/tweets'
  },
  {
    key: 'Users',
    name: 'View Users',
    url: '/#/users'
  }
];

const AppDefinition = {
  pages: [
    {
      links,
      name: ''
    }
  ]
};

export class SideBarMenu extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedKey: SideBarMenuOptions.Tweets
    }
  }

  public render(): JSX.Element {
    const { selectedKey } = this.state; 
    return (
      <div className='SidebarMenu'>
        <Nav 
        groups={AppDefinition.pages} 
        onRenderLink={this.onRenderLink} 
        selectedKey={selectedKey}
        onLinkClick={this.onItemSelect}
        expandButtonAriaLabel={''} />;
        
      </div>)
  }

  private onRenderLink = (link: any): JSX.Element | null => {
    return (
      <span>
        <span key={link.key} className="Nav-linkText">
          {link.name}
        </span>
      </span>
    );
  };

  private onItemSelect = (e: React.MouseEvent<HTMLInputElement>): void => {
    // @ts-ignore
    const selectedLink = links.find(x => x.name === e.target.innerText);
    if (selectedLink) {
      const selectedKey = selectedLink.key;
      this.setState({selectedKey}, () => setTimeout(this.props.onItemSelect(selectedKey), 100));
    }
  };
}
