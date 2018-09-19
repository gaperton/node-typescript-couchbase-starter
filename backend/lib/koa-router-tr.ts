/**
 * Koa router binding for Type-R
 * 
 * 
 */

import Router from 'koa-router'
import { IOEndpoint, Record } from 'type-r'
import { proxyIO } from 'type-r/endpoints/proxy'

export default class EndpointRouter extends Router {
    endpoint( path : string, resource : typeof Record | HttpEndpoint ) : this {
        endpoint( this, path, resource );
        return this;
    }
}

export type HttpEndpoint = Partial<IOEndpoint & { rpc? : { [ name : string ] : Function } }>;

export function endpoints( router : Router, endpoints : { [ name : string ] : typeof Record | HttpEndpoint }) : void {
    for( let root in endpoints ){
        endpoint( router, root, endpoints[ root ] );
    }
}

export function endpoint( router : Router, root : string, a_endpoint : typeof Record | HttpEndpoint ){
    const resource = root + '/:id',
        endpoint : HttpEndpoint = typeof a_endpoint === 'function' ? proxyIO( a_endpoint ) : a_endpoint;

    if( 'read' in endpoint ){
        router.get( resource, async ctx => {
            ctx.body = await endpoint.read( ctx.params.id, parseQuery( ctx ) );
        });
    }

    if( 'update' in endpoint ){
        router.put( resource, async ctx => {
            ctx.body = await endpoint.update( ctx.params.id, ctx.request.body, parseQuery( ctx ) )
        });
    }
    
    if( 'destroy' in endpoint ){
        router.del( resource, async ctx => {
            ctx.body = await endpoint.destroy( ctx.params.id, parseQuery( ctx ) )
        });
    }
            
    if( 'list' in endpoint ){
        router.get( root, async ctx => {
            ctx.body = await endpoint.list( parseQuery( ctx ) );
        });
    }
    
    if( 'create' in endpoint ){
        router.post( root, async ctx => {
            ctx.body = await endpoint.create( ctx.request.body, parseQuery( ctx ) )
        });
    }

    // Generic RPC request must look like this:
    // POST root/procName arg : JSON[] => any
    if( 'rpc' in endpoint ){
        for( let name in endpoint.rpc ){
            router.post( root + '/' + name, async ctx => {
                ctx.body = await endpoint.rpc[ name ]( ...ctx.request.body as any[], parseQuery( ctx ) );
            });
        }
    }
}

import { Context } from 'koa';

function parseQuery({ request, params } : Context ) : object {
    let res : { [ name : string ] : any } = { pathParams : params },
        { query } = request;

    for( let key of Object.keys( query ) ){
        const s = query[ key ];
        
        try{
            res[ key ] = JSON.parse( s );
        }
        catch( e ){
            res[ key ] = s;
        }
    }

    return res;
}