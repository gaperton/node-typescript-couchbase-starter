export const realtime = bucket({
    documents : {
        'us' : User,
        'rl' : Role
    },

    queries : {
        type : index( '_type' )
    }
});

export const history = bucket({
    documents : {

    }
});

export default cluster({
    buckets : {
        realtime
    }
});