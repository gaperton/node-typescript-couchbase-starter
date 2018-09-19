import Router from './lib/koa-router-tr'
import { User } from './realtime/user'

const api = new Router();

api
    .endpoint( '/api/users', User )
//    .endpoint( '/api/roles', Role )

    // New feature: Projection!
    .get( '/api/userlist', async ctx => {
        const attributes = [ 'firstName', 'lastName' ],
            list = new User.Collection();

        // Fetch restricted set of attributes...
        //await list.fetch({ attributes });

        // Serialize restricted set of attributes...
        return list.toJSON({ attributes });
    });

export default api;