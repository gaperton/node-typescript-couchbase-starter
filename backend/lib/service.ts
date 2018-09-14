import * as Router from 'koa-router'
import { IOEndpoint } from 'type-r'

export function endpoint( router : Router, root : string, endpoint : IOEndpoint & { rpc? : { [ name : string ] : Function } }){
    const resource = root + '/:id';

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

function parseQuery({ request, params } : Context ){
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