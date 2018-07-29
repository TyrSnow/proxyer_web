import * as React from 'react';
import axios from 'axios';

/**
 * 
 */
export default class FetchContainer extends React.Component {
  ajaxs: any[];

  ajax(opt: any) {
    const ajax = axios(opt);
    return ajax;
  }

  componentWillUnmount() {
    this.ajaxs.map((ajax) => {
      ajax.destroy();
    });
  }
}
