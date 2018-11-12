import * as React from 'react';
import './content.css'

class Content extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element { 
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }
}

export default Content
