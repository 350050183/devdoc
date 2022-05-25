import {exposeInMainWorld} from './exposeInMainWorld';
// import {BrowserView,BrowserWindow} from 'electron';
// import BrowserView = Electron.CrossProcessExports.BrowserView;
// import BrowserWindow = Electron.CrossProcessExports.BrowserWindow;
import {ipcRenderer} from 'electron';

function openUrl(url: string) {
  ipcRenderer.send('open-url-event',url);
}


export const bridge = {openUrl} as const;

exposeInMainWorld('bridge', bridge);
