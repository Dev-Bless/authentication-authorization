import app from './app/app';
import 'dotenv/config';
import AppDataSource from './db/typeORM';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

async function startServer(): Promise<void> {
    const argv = await yargs(hideBin(process.argv))
        .option('port', {
            alias: 'p',
            type: 'number',
            description: 'Port to run the server on',
            default: process.env.PORT,
        })
        .help()
        .parse();


    const port =  process.argv[2] || argv.port ;


    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
        AppDataSource.initialize()
            .then((d) => console.log('Connected to DB', d.options.database))
            .catch((e) => console.log('Error connecting to DB', e))
    });

}


startServer();
