import * as React from 'react';
import Interface from './interface';

interface ListProps {
  list: any[]
  block(interfaceId: string): any
}

class List extends React.Component<ListProps> {
  static defaultProps = {
    list: [],
  };

  render() {
    const { list } = this.props;
    return (
      <div className="ui-panel u-list">
        {
          list.map((item) => (
            <Interface
              key={item._id}
              {...item}
              block={this.props.block}
            />
          ))
        }
      </div>
    )
  }
}

export default List;
