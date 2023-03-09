const AccessControl = require('accesscontrol')



let grantsObject = {

    admin:{
        profile:{
            'create:any':['*'],
            'read:any':['*'],
            'update:any':['*'],
            'delete:any':['*']
        },
        formations:{
            'create:any':['*'],
            'read:any':['*'],
            'update:any':['*'],
            'delete:any':['*']
        },
        membres:{
            'create:any':['*'],
            'read:any':['*'],
            'update:any':['*'],
            'delete:any':['*']
        },
        formateur:{
            'create:any':['*'],
            'read:any':['*'],
            'update:any':['*'],
            'delete:any':['*']
        }
    },
    user:{
        profile:{
            'read:own':['*'],
            'update:own':['*']
            
        }
    }
}

const roles = new AccessControl(grantsObject)
module.exports = {roles}