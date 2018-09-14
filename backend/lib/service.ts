import Router from 'koa-router'
import { IOEndpoint } from 'type-r'

export default class ServiceRouter extends Router {
    // Expose standard endpoint.
    expose( root : string, endpoint : IOEndpoint ) : this {
        return this;
    }

    // Expose 
}

// expose an endpoint as a service
// router.expose( '/users/:user', async
//      read
// })

