"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_r_1 = require("type-r");
function documentIO(x) {
    return {};
}
exports.userIO = documentIO({
    key: {
        type: 'user',
        counter: true
    },
    queries: {
        search: {
        // TODO: DO NOT specify attributes list. Just selectDocs() - could be given in query. 
        //select( 'meta().id', 'firstName', 'lastName', 'email' ).
        //where( 'firstName is like $filter || "%" or lastName is like $filter || "%" or email is like $filter || "%"' ).
        //orderBy( 'lastName', 'firstName' ).
        //limit( '$limit' ).
        //offset( '$page * $limit' )
        },
        indexes: {
        //ix_order : index( 'lastName', 'firstName' ),
        //ix_first : index( 'lastName', 'firstName' ),
        },
    }
});
let User = class User extends type_r_1.Record {
};
User.endpoint = exports.userIO;
__decorate([
    type_r_1.attr,
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    type_r_1.attr,
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    type_r_1.attr,
    __metadata("design:type", String)
], User.prototype, "email", void 0);
User = __decorate([
    type_r_1.define
], User);
exports.User = User;
//# sourceMappingURL=user.js.map