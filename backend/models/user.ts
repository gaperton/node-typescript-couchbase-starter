import { attr, define, Record, IOEndpoint } from "type-r";

function documentIO( x : any ) : IOEndpoint{
    return {} as any;
} 

export const userIO = documentIO({
    counter : true,
    prefix : doc => [ doc.name ]

    queries : {
        search : {
            // TODO: DO NOT specify attributes list. Just selectDocs() - could be given in query. 
            //select( 'meta().id', 'firstName', 'lastName', 'email' ).
            //where( 'firstName is like $filter || "%" or lastName is like $filter || "%" or email is like $filter || "%"' ).
            //orderBy( 'lastName', 'firstName' ).
            //limit( '$limit' ).
            //offset( '$page * $limit' )
    },

    indexes : {
        //ix_order : index( 'lastName', 'firstName' ),
        //ix_first : index( 'lastName', 'firstName' ),

    },

    //search( params : any ){

    }
});

@define
export class User extends Record {
    static endpoint = userIO;

    @attr firstName : string
    @attr lastName : string
    @attr email : string
}