import { attr, define, Record } from "type-r";
import { instanceOf } from "prop-types";

export interface BucketDefinition {
    documents : {
        [ type : string ] : typeof Document
    },

    queries : {
        [ name : string ] : Query | ( ( params : object, q? :  ) => Query )
    }
}

@define
export class Document extends Record {
    static endpoint : CouchbaseEndpoint;

    readonly _type : string
    @attr _cas : string
}

class Bucket {

}

export default function bucket< D extends BucketDefinition >( spec : D ) : {
    documents : D[ "documents" ],
    queries : { [ name in keyof D['queries' ] ] : ( params : object ) => Query },
}{
    return {} as any;
}