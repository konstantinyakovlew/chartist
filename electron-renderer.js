const async = require('async');

App = function() {
    start();
    
    function start() {
        console.log('...starting electron render process');

        async.series([
            configure,
        ], (error) => {
            if (error) {
                console.error(error);
            }
        });
    }

    function configure(callback) {
        console.log('...configuring electron render process');

    }
}

App = new App();
