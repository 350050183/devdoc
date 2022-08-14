import type { MenuItem} from 'electron';
import {app, BrowserWindow, ipcMain, screen, Menu} from 'electron';
// import './security-restrictions';
import {restoreOrCreateWindow} from '/@/mainWindow';
import IpcMainEvent = Electron.IpcMainEvent;

ipcMain.on('open-url-event', function (event: IpcMainEvent, ...args: string[]) {
  // console.log(event,args);
  openView(args[0]).then();
});


async function openView(url: string) {
  const primaryDisplay = screen.getPrimaryDisplay();
  const {width, height} = primaryDisplay.workAreaSize;
  const window = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      javascript: true,
      webSecurity: true,
      allowRunningInsecureContent: true,
    },
  });
  await window.loadURL(url);
  // const view = new BrowserView();
  // // const window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());
  // window?.setBrowserView(view);
  //
  // view.setBounds({x: 0, y: 0, width: width, height: height});
  // view.setAutoResize({horizontal: true, vertical: true, width: true, height: true});
  // await view.webContents.loadURL(url);

  // window.webContents.on('new-window', (event, url) => {
  //   console.log('\n\n!!!!!!!!!!!!!!: ' + url);
  // });

  // window.webContents.addListener('new-window', (e) => {
  //   const protocol = require('url').parse(e.url).protocol;
  //   if (protocol === 'http:' || protocol === 'https:') {
  //     //shell.openExternal(e.url)
  //     const win = new BrowserWindow({width: 800, height: 600});
  //     win.loadURL(e.url);
  //   }
  // });
}

const isMac = process.platform === 'darwin';

const template:any = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about', label:'关于' },
      { type: 'separator' },
      { role: 'quit', label: '退出' },
    ],
  }] : []),
  // { role: 'fileMenu' }
  {
    label: '文件',
    submenu: [
      isMac ? { role: 'close', label: '退出' } : { role: 'quit', label: '退出' },
    ],
  },
  // { role: 'viewMenu' }
  {
    label: '查看',
    submenu: [
      { role: 'reload', label: '刷新' },
      { role: 'forceReload', label: '强制刷新' },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: '窗口',
    submenu: [
      { role: 'minimize',label: '最小化' },
      { role: 'zoom', label: '缩放' },
    ],
  },
  {
    role: 'help',
    label: '帮助',
    submenu: [
      { role: 'about', label:'关于' },
      {
        label: '作者网站',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal('https://www.wukun.info');
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

/**
 * Prevent multiple instances
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.on('second-instance', restoreOrCreateWindow);


/**
 * Disable Hardware Acceleration for more power-save
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * @see https://www.electronjs.org/docs/v14-x-y/api/app#event-activate-macos Event: 'activate'
 */
app.on('activate', restoreOrCreateWindow);


/**
 * Create app window when background process will be ready
 */
app.whenReady()
  .then(restoreOrCreateWindow)
  .catch((e) => console.error('Failed create window:', e));


/**
 * Install Vue.js or some other devtools in development mode only
 */
if (import.meta.env.DEV) {
  app.whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({default: installExtension, VUEJS3_DEVTOOLS}) => installExtension(VUEJS3_DEVTOOLS, {
      loadExtensionOptions: {
        allowFileAccess: true,
      },
    }))
    .catch(e => console.error('Failed install extension:', e));
}

/**
 * Check new app version in production mode only
 */
if (import.meta.env.PROD) {
  app.whenReady()
    .then(() => import('electron-updater'))
    .then(({autoUpdater}) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error('Failed check updates:', e));
}

