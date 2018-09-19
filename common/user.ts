import { define, attr, Record } from 'type-r'

@define
export class UserInfo extends Record {
    @attr name : string
    @attr email : string
}

@define
export class User extends UserInfo {
    @attr password : string
    @attr roles : string[]
    @attr isActive : boolean
}

@define
export class Role extends Record {
    @attr name : string
}