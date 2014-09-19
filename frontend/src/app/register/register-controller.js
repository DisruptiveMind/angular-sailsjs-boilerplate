/**
 * Login controller to handle user's login to application. Controller uses 'Auth' service
 * to make actual HTTP request to server and try to authenticate user.
 *
 * After successfully login Auth service will store user data and JWT token via 'Storage'
 * service where those are asked whenever needed in application.
 *
 * @todo    Different authentication providers?
 */
(function() {
    'use strict';

    angular.module('frontend.controllers')
        .controller('RegisterController',
            [
                '$scope', '$state', 'Auth',
                function($scope, $state, Auth) {
                    // Already authenticated so redirect back to books list since we shouldn't be in this route
                    if (Auth.isAuthenticated()) {
                        $state.go('example.books');
                    }

                    // Initialize credentiasl
                    $scope.credentials = {
                        username: '',
                        email: '',
                        firstName: '',
                        lastName: '',
                        password: ''
                    };

                    // Scope function to perform a registration then upon success logs the user in
                    $scope.register = function() {
                        Auth
                            .register($scope.credentials)
                            .then(
                                function() {

                                    $scope.login = {
                                        identifier: $scope.credentials.username,
                                        password: $scope.credentials.password
                                    };
                                    
                                    Auth
                                        .login($scope.login)
                                        .then(function(){
                                            // TODO: redirect to user page
                                            $state.go('example.books');
                                        })
                                }
                            );
                    };
                }
            ]
        );
}());
