import * as React from 'react';
import { ProxyInfo } from '../../definition/proxy';
import { autobind } from '../../helper/autobind';
import IconButton from '../iconButton';
import { PositionProperty } from 'csstype';

interface DragProxyInfo extends ProxyInfo {
  drag?: boolean
  preOffset?: boolean
  afterOffset?: boolean
}

interface ProxySelectListProps {
  list: ProxyInfo[]
  active_id: string
  sort: string[]
  onProxyClick(proxyId: string): any
  onSortChange(sortList: string[]): any
  copyProxy(proxy: ProxyInfo): any
}

interface ProxySelectListState {
  list: DragProxyInfo[]
  drag: boolean
  dragDom?: HTMLDivElement
  activeIndex: number
  startPageX: number
  startPageY: number
  currentPageX: number
  currentPageY: number
  dragOffsetHeight: number
}

@autobind
class ProxySelectList extends React.Component<ProxySelectListProps, ProxySelectListState> {
  public doms: HTMLDivElement|null[] = []
  public state: ProxySelectListState = {
    drag: false,
    list: [],
    activeIndex: -1,
    startPageX: 0,
    startPageY: 0,
    currentPageX: 0,
    currentPageY: 0,
    dragOffsetHeight: 0,
  };

  private delayDrag?: number;
  // private delayProxyId?: string;
  private clickable: boolean = true;

  componentWillReceiveProps(nextProps: ProxySelectListProps) {
    if (nextProps.list !== this.props.list) {
      this.setState({
        list: this.sortList(nextProps.list, nextProps.sort),
      });
    }
    if (nextProps.sort !== this.props.sort) {
      this.setState({
        list: this.sortList(nextProps.list, nextProps.sort),
      });
    }
  }

  sortList(list: ProxyInfo[], sort: string[]) {
    const sortedList: ProxyInfo[] = [];
    let nextSortedIndex = sort.length;
    const sortMap = {};
    sort.map((id, index) => {
      sortMap[id] = index;
    });

    list.map((proxy) => {
      const sortIndex = sortMap[proxy._id];
      if (sortIndex || sortIndex === 0) {
        sortedList[sortIndex] = proxy;
      } else {
        sortedList[nextSortedIndex] = proxy;
        nextSortedIndex+= 1;
      }
    });

    return sortedList;
  }

  calcProxyTranslate(proxy: DragProxyInfo) {
    if (proxy.drag) {
      const {
        startPageY,
        currentPageY,
      } = this.state;
      return `-13px, ${currentPageY - startPageY}px, 1px`;
    } else if (proxy.preOffset) {
      return `0, -${this.state.dragOffsetHeight}px, 0`;
    } else if (proxy.afterOffset) {
      return `0, ${this.state.dragOffsetHeight}px, 0`;
    }
    return '0, 0, 0';
  }

  calcDragProxyStyle(proxy: DragProxyInfo) {
    return {
      transform: `scale(1.1) translate3d(${this.calcProxyTranslate(proxy)}) rotate(2deg)`,
      position: 'relative' as PositionProperty,
      zIndex: 2,
    };
  }

  calcProxyStyle(proxy: DragProxyInfo) {
    if (this.state.drag) {
      if (proxy.drag) {
        return this.calcDragProxyStyle(proxy);
      }
      return {
        transform: `translate3d(${this.calcProxyTranslate(proxy)})`,
      };
    }
    return {};
  }

  handleProxyClick(e: any) {
    if (this.clickable) {
      this.props.onProxyClick(e);
    } else {
      this.clickable = true;
    }
  }

  startDrag(pageX: number, pageY: number, proxyId: string, index: number) {
    const { list } = this.state;
    const dom = this.doms[index];
    this.setState({
      startPageX: pageX,
      startPageY: pageY,
      currentPageX: pageX,
      currentPageY: pageY,
      dragDom: dom,
      dragOffsetHeight: dom.offsetHeight,
      drag: true,
      activeIndex: index,
      list: list.map((proxy) => {
        if (proxy._id === proxyId) {
          proxy.drag = true;
        } else {
          proxy.drag = false;
        }
        return proxy;
      }),
    });
  }

  applySortListChange(sortList: string[]) {
    // 检查sortList变了没
    if (sortList.length === this.props.sort.length) {
      let dirt = false;
      sortList.map((sort, index) => {
        dirt = dirt || (sort !== this.props.sort[index]);
      });
      if (!dirt) {
        this.setState({
          drag: false,
        });
        return;
      }
    }
  
    this.props.onSortChange(sortList);
    this.setState({
      drag: false,
      list: this.sortList(this.props.list, sortList),
    });
  }

  endDrag(drag = this.state.drag) {
    if (drag) {
      let { list } = this.state;
      const { activeIndex } = this.state;
      let sortList: string[] = [];
      let dragIndex = activeIndex;
      list = list.map((proxy, index) => {
        if (proxy.preOffset) {
          sortList[index - 1] = proxy._id;
          dragIndex = index;
        } else if (proxy.afterOffset) {
          sortList[index + 1] = proxy._id;
          dragIndex = index;
        } else if (index !== activeIndex) {
          sortList[index] = proxy._id;
        }
        proxy.drag = false;
        proxy.preOffset = false;
        proxy.afterOffset = false;
        return proxy;
      });
  
      sortList[dragIndex] = list[activeIndex]._id;
      sortList = sortList.filter(s => !!s);
  
      this.applySortListChange(sortList);
    } else if (this.delayDrag) { // 改为触发click
      clearTimeout(this.delayDrag);
      this.clickable = true;
      delete this.delayDrag;
      // this.handleProxyClick(this.delayProxyId);
    }
  }

  onProxyMouseDown(e: any, proxyId: string, index: number) {
    // this.delayProxyId = proxyId;
    this.clickable = false;
    const { pageX, pageY } = e;
    this.delayDrag = setTimeout(() => {
      delete this.delayDrag;
      this.startDrag(pageX, pageY, proxyId, index);
    }, 200);
  }

  onMouseMove(e: React.MouseEvent) {
    if (this.state.drag) {
      if (e.buttons !== 1) { // 没按住左键拖拽肯定已经结束了
        this.endDrag(true);
        return;
      }
      const { pageX, pageY } = e;
      const {
        list,
        activeIndex,
      } = this.state;

      this.setState({
        currentPageX: pageX,
        currentPageY: pageY,
        list: list.map((proxy, index) => {
          const proxyDom = this.doms[index];
          const offsetTop = proxyDom.offsetTop;
          const domHeight = proxyDom.offsetHeight;
          proxy.afterOffset = false;
          proxy.preOffset = false;
          if (pageY > (offsetTop + domHeight)) {
            if (index > activeIndex) {
              proxy.preOffset = true;
            }
          }
          if (pageY < offsetTop) {
            if (index < activeIndex) {
              proxy.afterOffset = true;
            }
          }
          return proxy;
        }),
      });
    }
  }

  onMouseUp() {
    this.endDrag();
  }

  copyProxy(e: React.MouseEvent, proxy: ProxyInfo) {
    e.preventDefault();
    this.clickable = false;
    this.props.copyProxy(proxy);
  }

  renderProxy(proxy: ProxyInfo, index: number) {
    const styles = this.calcProxyStyle(proxy);

    return (
      <div
        // tslint:disable-next-line:jsx-no-lambda
        onClick={(e: any) => this.handleProxyClick(proxy._id)}
        // tslint:disable-next-line:jsx-no-lambda
        onMouseDown={(e: any) => this.onProxyMouseDown(e, proxy._id, index)}
        className="u-pattern"
        style={styles}
        key={proxy._id}
        ref={dom => this.doms[index] = dom}
      >
        <span>{proxy.name}: {proxy.port}</span>
        <IconButton
          tip="以当前代理为模板创建新代理"
          // tslint:disable-next-line:jsx-no-lambda
          onClick={(e) => this.copyProxy(e, proxy)}
          type="fork"
        />
      </div>
    );
  }

  render() {
    const { list, drag } = this.state;

    return (
      <div
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseUp}
        className={`u-list-panel${drag ? ' drag' : ''}`}
      >
      {
        list.map(this.renderProxy)
      }
      </div>
    )
  }
}

export default ProxySelectList;
