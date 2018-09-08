import * as React from 'react';
import {
  Icon,
  Switch,
  Input,
} from 'antd';
import { autobind } from '../../helper/autobind';

interface RequestFilterProps {
  loading: boolean
  onChange(filters: any[]): any
  onClear(): any
}

interface RequestFilterState {
  collapse: boolean
  noCopy: boolean
  filtText: string
}

@autobind
class RequestFilter extends React.Component<RequestFilterProps, RequestFilterState> {
  public state: RequestFilterState = {
    collapse: true,
    noCopy: true,
    filtText: '',
  };

  private dirtInterval: number

  getFilters() {
    const filters = [];
    if (this.state.noCopy) {
      filters.push({
        match: 'notExist',
        key: 'parent',
        value: true,
      })
    }

    if (this.state.filtText.length > 0) {
      filters.push({
        match: 'match',
        key: 'url',
        value: this.state.filtText,
      });
    }
    return filters;
  }

  toggleCollapse() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  filterChange() {
    console.debug('更新筛选器');
    this.props.onChange(this.getFilters());
  }

  changeNoCopy(checked: any) {
    this.setState({
      noCopy: checked,
    }, this.filterChange);
  }

  changeFiltText(e: any) {
    if (this.dirtInterval) {
      clearTimeout(this.dirtInterval);
    }
    this.dirtInterval = setTimeout(this.filterChange, 300);
    this.setState({
      filtText: e.target.value,
    });
  }

  renderCollapseIcon() {
    if (this.state.collapse) {
      return (
        <Icon onClick={this.toggleCollapse} type="down-square-o" />
      );
    }
    return (
      <Icon onClick={this.toggleCollapse} type="up-square-o" />
    );
  }

  renderFetchStatus() {
    if (this.props.loading) {
      return <Icon className="u-fetchStatus" type="loading" />;
    }
    return <Icon className="u-fetchStatus" type="clock-circle-o" />;
  }

  renderRequestingOnly() {
    return (
      <div className="filter">
      <span className="label">隐藏调试:</span>
        <Switch checked={this.state.noCopy} onChange={this.changeNoCopy} />
      </div>
    );
  }

  render() {
    return (
      <div className="m-filter ui-panel">
        <div className="f-df">
          <div className="f-df">
            <Icon type="delete" onClick={this.props.onClear} />
            {/* {this.renderFetchStatus()} */}
            {this.renderRequestingOnly()}
            <div className="filter url">
              <div className="label">URL匹配:</div>
              <Input
                type="text"
                value={this.state.filtText}
                onChange={this.changeFiltText}
                placeholder="请输入url"
              />
            </div>
          </div>
          {/* {this.renderCollapseIcon()} */}
        </div>
        {
          this.state.collapse ? null : (
            <div className="f-df">
              这是更多的筛选
            </div>
          )
        }
      </div>
    )
  }
}

export default RequestFilter;
