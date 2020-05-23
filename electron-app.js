const async = require('async');
const nconf = require('nconf');
const electron = require('electron');
const path = require('path');

App = function() {
    const m_screenWidth = 1024;
    const m_screenHeight = 768;
    const m_launchingUrl = 'index.html';

    start();
    
    function start() {
        console.log('...starting electron [' + process.versions.electron + '] application');

        async.series([
            configure,
            launchRenderer,
            finalizing,
        ], (error) => {
            if (error) {
                console.error(error);
            }
        });
    }

    function configure(callback) {
        console.log('...configuring application');

        nconf
        .argv()
        .defaults({});

        try {
            nconf.required([
            ]);
            
            callback(null);
        }
        catch (error) {
            callback(error.toString());
        }
    }

    function launchRenderer(callback) {
        electron.app.once('ready', () => {
            process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

            const window = createBrowserWindow();
            window.once('ready-to-show', () => { window.show(); });
            window.on('close', (e) => { callback(null); });

            const openUrl = path.join(__dirname, m_launchingUrl);
            window.loadURL(openUrl);
        });
    }

    function finalizing(callback) {
        console.log('...finalizing application');

        callback(null);
    }

    function createBrowserWindow() { 
        console.log('...creating electron window');

        return new electron.BrowserWindow({
            width: m_screenWidth,
            height: m_screenHeight,
            titleBarStyle: 'hiddenInset',
            backgroundColor: "#111",
            show: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
    }
}

App = new App();
