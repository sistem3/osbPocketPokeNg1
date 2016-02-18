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

                $scope.setPokeSprite = function(data) {
                    var sprite = new Image();
                    var spriteHolder = document.querySelector('#sprite-' + data.pokemon.name + '.img-holder');
                    spriteHolder.appendChild(sprite);
                    sprite.src = $scope.pokemonApiBase + data.image;
                };

                $scope.getPokeSprite = function(pokemon, cached) {
                    console.log(pokemon);
                    if (cached && $scope.pokemonSprites.length > 1) {
                        $scope.pokemonSprites.forEach(function(element, index, array) {
                            if (pokemon.name === element.pokemon.name) {
                                setTimeout(function() {
                                    $scope.setPokeSprite(element);
                                }, 250);
                            }
                        });
                        return false;
                    }
                    // Fix for glitch in sprite ordering
                    var updatedId = parseInt(pokemon.id) + 1;
                    console.log(updatedId);
                    fetch($scope.pokemonApiBase + '/api/v1/sprite/' + updatedId)
                        .then(function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' + response.status);
                                return;
                            }
                            response.json().then(function(data) {
                                console.log(data);
                                $scope.pokemonSprites.push(data);
                                localStorage.setItem('osbPocketPoke.sprites', JSON.stringify($scope.pokemonSprites));
                                $scope.setPokeSprite(data);
                            });
                        })
                        .catch(function(err) {
                            console.log('Failed');
                        });
                };

                $scope.getPokemon = function(pokemon, newList) {
                    if (!newList) {
                        if ($scope.pokemon.length > 1) {
                            $scope.pokemon.forEach(function(element, index, array) {
                                console.log(element);
                                if (pokemon.name === element.name) {
                                    $scope.getPokeSprite(element, true);
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
                                $scope.pokemon.push(data);
                                if (!newList) {
                                    // Cache size too small for full listing storage
                                    localStorage.setItem('osbPocketPoke.pokemon', JSON.stringify($scope.pokemon));
                                    $scope.getPokeSprite(data, true);
                                } else {
                                    console.log('Get sprite');
                                    $scope.getPokeSprite(data, false);
                                }
                            });
                        })
                        .catch(function(err) {
                            console.log('Failed');
                        });
                };

                $scope.getMorePokemon = function() {
                    var newListCount, updatedList;
                    if ($scope.pokemon) {
                        newListCount = $scope.listCount + $scope.pageLength;
                        updatedList = $scope.pokemonList.slice($scope.listCount + 1, newListCount);
                    } else {
                        newListCount = $scope.pokemon.length + $scope.pageLength;
                        updatedList = $scope.pokemonList.slice($scope.pokemon.length + 1, newListCount);
                    }
                    var callbackCount = 1;
                    updatedList.forEach(function(element) {
                        callbackCount++;
                        console.log(callbackCount);
                        if (callbackCount === $scope.pageLength) {
                            console.log('Callback');
                        }
                        $scope.getPokemon(element, true);
                    });
                };

                $scope.startScrollMagic = function() {
                    var controller = new ScrollMagic.Controller();
                    var scene = new ScrollMagic.Scene({triggerElement: '#loading-trigger', triggerHook: 'onEnter'})
                        .addTo(controller)
                        .on('enter', function (e) {
                            //console.log(e);
                            if (document.querySelector('#loading-trigger').className.indexOf('active') == -1) {
                                document.querySelector('#loading-trigger').classList.add('active');
                                console.log('Load more data');
                                $scope.getMorePokemon();
                            }
                        });
                    scene.update();
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
                    fetch($scope.pokemonApiBase + '/api/v2/pokemon/')
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

                $scope.getPokeList();
            }
        };
    }]);