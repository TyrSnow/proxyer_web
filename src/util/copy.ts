import * as Clipboard from 'clipboard';

const body = document.querySelector('body') as HTMLElement;
const tempDom = document.createElement('div');
body.appendChild(tempDom);

export function copy(str: string): Promise<any> {
  if (str.length > 50000) {
    return Promise.reject('字符串太长无法复制');
  }
  return new Promise((resolve, reject) => {
    tempDom.innerHTML = str;
    const clipboard = new Clipboard('body', {
      target() {
        return tempDom;
      }
    });

    clipboard.on('success', (e: any) => {
      e.clearSelection();
      tempDom.innerHTML = '';
      resolve();
    });

    clipboard.on('error', (e: any) => {
      console.debug('copy error: ', e);
      tempDom.innerHTML = '';
      reject('未知的错误，复制失败');
    });

    if (body) {
      body.click();
    } else {
      console.debug('body not found');
    }
  });
}
