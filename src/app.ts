import express from 'express';
import limit from 'express-rate-limit';
import log from '@utils/Log';
let StatsD = require('hot-shots');

let app = express();

// export default app;

export default abstract class App {
    static app = express();

    static preflightChecks() {

    }

    static configureApp() {
        let dogstatsd = new StatsD({
            errorHandler: function (error: Error) {
                log.error(`Socket errors caught here: ${error}`);
            }
        });

        // set rate limit thing
        app.use(
            limit({
                message: {status: 429, message: "API Rate Limit Reached."},
                windowMs: 60 * 1000, // equal to 60,000ms or 1 minute
                max: 100 // set rate limit it 100req/min
            })
        );

        // set headers
        app.use((req: any, res: express.Response, next: any) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Origin', 'Origin, X-Forwarded-For, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET');
            res.set('Cache-control', 'public, max-age=300, stale-if-error=60');
            log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
            dogstatsd.increment('page.views');
            next();
        });

        app.set('trust proxy', '127.0.0.1');
        app.enable('strict routing');
    }
}

