import * as React from 'react';
import {
  Tag,
} from 'antd';

interface FilterMethodsProps {
  value: number[]
  onChange(val: number[]): any
}

interface FilterMethodsState {
  disable_methods: number[]
}

class FilterMethods extends React.Component<FilterMethodsProps, FilterMethodsState> {
  render() {
    return (
      <div className="u-filterMethods">
        <Tag />
      </div>
    )
  }
}

export default FilterMethods;
