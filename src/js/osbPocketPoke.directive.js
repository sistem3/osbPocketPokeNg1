'use strict';

angular.module('sistem3.osb-pocket-poke', ['osb-pocket-poke-template'])
    .directive('osbPocketPoke', ['$http', '$q', function ($http, $q) {
        return {
            templateUrl: 'osbPocketPoke.tpl.html',
            restrict: 'EA',
            link: function ($scope, element, attrs) {
                console.log('Lets get things started');
                $scope.isLoading = true;
                $scope.pokemonApiBase = 'http://pokeapi.co';
                $scope.pokemonList = [];
                $scope.pokemonViewList = [];
                $scope.pokemonSprites = [];
                $scope.pokemon = [];
                $scope.listCount = 18;
                $scope.pageLength = 18;
                // Check Cache
                var pokeListCache = localStorage.getItem('osbPocketPoke');
                if (pokeListCache) {
                    $scope.pokemonList = JSON.parse(pokeListCache);
                }
                var pokeCache = localStorage.getItem('osbPocketPoke.pokemon');
                if (pokeCache) {
                    $scope.pokemon = JSON.parse(pokeCache);
                    $scope.listCount = JSON.parse(pokeCache).length;
                }
                var pokeSpriteCache = localStorage.getItem('osbPocketPoke.sprites');
                if (pokeSpriteCache) {
                    $scope.pokemonSprites = JSON.parse(pokeSpriteCache);
                }

                $scope.getPokemon = function(pokemon, newList) {
                    //console.log(pokemon);
                    if (!newList) {
                        if ($scope..pokemon.length > 1) {
                            $scope..pokemon.forEach(function(element, index, array) {
                                if (pokemon.name === element.name) {
                                    $scope..getPokeSprite(element, true);
                                }
                            });
                            return false;
                        }
                    }
                    fetch(pokemon.url)
                        .then(function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' + response.status);
                                return;
                            }
                            response.json().then(function(data) {
                                $scope..pokemon.push(data);
                                if (!newList) {
                                    // Cache size too small for full listing storage
                                    localStorage.setItem('osbPocketPoke.pokemon', JSON.stringify($scope..pokemon));
                                    $scope..getPokeSprite(data, true);
                                } else {
                                    console.log('set sprite');
                                    $scope..getPokeSprite(data, false);
                                }
                            });
                        })
                        .catch(function(err) {
                            console.log('Failed');
                        });
                };

                $scope.getPokeList = function() {
                    if ($scope.pokemonList.length > 1) {
                        $scope.pokemonViewList = $scope.pokemonList.slice(0, $scope.listCount + 1);
                        $scope.pokemonViewList.forEach(function(element, index, array) {
                            $scope.getPokemon(element, false);
                        });
                        setTimeout(function() {
                            $scope.startScrollMagic();
                        }, 1500);
                        return false;
                    }
                    fetch(this.pokemonApiBase + '/api/v2/pokemon/')
                        .then(function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' + response.status);
                                return;
                            }
                            response.json().then(function(data) {
                                $scope.pokemonList = data;
                                localStorage.setItem('osbPocketPoke', JSON.stringify(data));
                                var pokeCount = 0;
                                var shortList = $scope.pokemonList.slice(0, $scope.listCount);
                                shortList.forEach(function(element, index, array) {
                                    pokeCount++;
                                    if (pokeCount === array.length) {
                                        console.log('Callback?');
                                        setTimeout(function() {
                                            $scope.startScrollMagic();
                                        }, 3500);
                                    } else {
                                        $scope.pokemonViewList.push(element);
                                        $scope.getPokemon(element, false);
                                    }
                                });
                            });
                        })
                        .catch(function(err) {
                            console.log('Failed');
                        });
                };
            }
        };
    }]);