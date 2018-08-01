import * as React from 'react';
import { ProxyInfo } from '../../definition/proxy';
import { autobind } from '../../helper/autobind';

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

  componentWillReceiveProps(nextProps: ProxySelectListProps) {
    if (nextProps.list !== this.props.list) {
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
      return `-13px, ${currentPageY - startPageY}px, 0`;
    } else if (proxy.preOffset) {
      return `0, -${this.state.dragOffsetHeight}px, 0`;
    } else if (proxy.afterOffset) {
      return `0, ${this.state.dragOffsetHeight}px, 0`;
    }
    return '0';
  }

  calcProxyStyle(proxy: DragProxyInfo) {
    if (this.state.drag) {
      if (proxy.drag) {
        return {
          transform: `scale(1.1) translate3d(${this.calcProxyTranslate(proxy)}) rotate(2deg)`,
        };
      }
      return {
        transform: `translate3d(${this.calcProxyTranslate(proxy)})`,
      };
    }
    return {};
  }

  handleProxyClick(e: any) {
    this.props.onProxyClick(e);
  }

  onProxyMouseDown(e: any, proxyId: string, index: number) {
    const { list } = this.state;
    const { pageX, pageY } = e;
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

  onMouseMove(e: any) {
    if (this.state.drag) {
      const { pageX, pageY } = e;
      const {
        list,
        dragDom,
        activeIndex,
        dragOffsetHeight,
        startPageY,
      } = this.state;
  
      // 将各个元素与被拖拽元素的位置进行比较
      const dragOffsetY = pageY - startPageY;
      const dragDomOffset = dragDom ? dragDom.offsetTop + dragOffsetY : 0;
      const dragDomOffsetTop = dragDomOffset + dragOffsetHeight;
      this.setState({
        currentPageX: pageX,
        currentPageY: pageY,
        list: list.map((proxy, index) => {
          const proxyDom = this.doms[index];
          const offsetTop = proxyDom.offsetTop;
          console.debug('compare index: ', offsetTop, dragDomOffset);
          if (offsetTop < dragDomOffset) { // 在被拖拽元素前面
            proxy.afterOffset = false;
            if (index > activeIndex) {
              proxy.preOffset = true;
            } else {
              proxy.preOffset = false;
            }
          }
          if (offsetTop > dragDomOffsetTop) {
            proxy.preOffset = false;
            if (index < activeIndex) {
              proxy.afterOffset = true;
            } else {
              proxy.afterOffset = false;
            }
          }
  
          return proxy;
        }),
      });
    }
  }

  onMouseUp() {
    let { list } = this.state;
    list = list.map((proxy) => {
      proxy.drag = false;
      return proxy;
    });

    this.setState({
      drag: false,
      list,
    });
  }

  renderProxy(proxy: ProxyInfo, index: number) {
    const styles = this.calcProxyStyle(proxy);

    return (
      <div
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => this.handleProxyClick(proxy._id)}
        // tslint:disable-next-line:jsx-no-lambda
        onMouseDown={(e: any) => this.onProxyMouseDown(e, proxy._id, index)}
        className="u-pattern"
        style={styles}
        key={proxy._id}
        ref={dom => this.doms[index] = dom}
      >
        {proxy.name}: {proxy.port}
      </div>
    );
  }

  render() {
    const { list, drag } = this.state;

    return (
      <div
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
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
