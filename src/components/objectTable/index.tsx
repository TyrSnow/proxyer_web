import * as React from 'react';
import { autobind } from '../../helper/autobind';
import { transferObjectToSortedArray } from '../../util/transferObjectToSortedArray';

import './index.css';
import CollapseText from '../collapseText';

interface ObjectTableProps {
  data: object
  bordered?: boolean
}

interface ObjectTableState {
  dataSource: any[]
}

@autobind
class ObjectTable extends React.Component<ObjectTableProps, ObjectTableState> {
  static defaultProps = {
    data: {},
    bordered: false,
  };

  constructor(props: ObjectTableProps) {
    super(props);
    this.state = {
      dataSource: transferObjectToSortedArray(props.data),
    };
  }

  // shouldComponentUpdate(nextProps: ObjectTableProps, nextState: ObjectTableState) {
  //   if (
  //     (nextProps.data !== this.props.data) ||
  //     (nextState.dataSource !== this.state.dataSource)
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  componentWillReceiveProps(nextProps: ObjectTableProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        dataSource: transferObjectToSortedArray(nextProps.data),
      });
    }
  }

  render() {
    const { bordered } = this.props;
    const { dataSource } = this.state;

    return (
      <div className={`m-objectTable${bordered ? ' bordered' : ''}`}>
        {
          dataSource.map(data => (
            <div key={data.key} className="row">
              <div className="column key">{data.key}</div>
              <div className="column value">
                <CollapseText text={data.value} />
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default ObjectTable;
