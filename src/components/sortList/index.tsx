import * as React from 'react';
import { autobind } from '../../helper/autobind';

interface SortListProps {}
interface SortListState {}

@autobind
class SortList extends React.Component<SortListProps, SortListState> {
  renderChildren() {
    return this.props.children;
  }
  render() {
    return (
      <div className="m-sortlist">
        {this.renderChildren()}
      </div>
    );
  }
}

export default SortList;
