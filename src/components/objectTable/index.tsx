import * as React from 'react';
import { autobind } from '../../helper/autobind';
import { transferObjectToSortedArray } from '../../util/transferObjectToSortedArray';

import './index.css';

interface ObjectTableProps {
  data: object
}

interface ObjectTableState {
  dataSource: any[]
}

@autobind
class ObjectTable extends React.Component<ObjectTableProps, ObjectTableState> {
  static defaultProps = {
    data: {},
  };

  constructor(props: ObjectTableProps) {
    super(props);
    this.state = {
      dataSource: transferObjectToSortedArray(props.data),
    };
  }

  shouldComponentUpdate(nextProps: ObjectTableProps) {
    if (nextProps.data !== this.props.data) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps(nextProps: ObjectTableProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        dataSource: transferObjectToSortedArray(nextProps.data),
      });
    }
  }

  render() {
    const { dataSource } = this.state;

    return (
      <div className="m-objectTable">
        {
          dataSource.map(data => (
            <div key={data.key} className="row">
              <div className="column key">{data.key}</div>
              <div className="column value">{data.value}</div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default ObjectTable;
