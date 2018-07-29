import * as React from 'react';


class InitializePage extends React.Component {
  render() {
    return (
      <div className="page initial">
        <h3 className="title">系统初始化</h3>
        <div className="content">
          <p className="sentence">1. 创建一个代理服务器</p>
          <p className="sentence">2. 创建一个目标服务器</p>
          <p className="sentence">3. 配置一个规则</p>
          <p className="sentence">4. 开始开发吧</p>
        </div>
      </div>
    )
  }
}

export default InitializePage;
