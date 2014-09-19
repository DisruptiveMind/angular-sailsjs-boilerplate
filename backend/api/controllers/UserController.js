'use strict';

var _ = require('lodash');

/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = _.merge(_.cloneDeep(require('../base/controller')), {
    // TODO: clean up and make the process simpler
    /*
     * @Override
     * Creates a new user and attaches a passport to the user.
     * @returns { userJSON }
     */
    create: function(request, response) {
        // return any errors to the client
        function displayError(error) {
            response.json(406, error)
        }
    
        var user = request.body
        
        var userPassport = {
            protocol: "local",
            password: user.password,
            user: user
        }
    
        sails.models.passport.create(userPassport).exec(function(error, passport){
            if(error) displayError(error);
            else {
                delete user.password;
                
                response.json(200,user);
            }
        })
    }
});
