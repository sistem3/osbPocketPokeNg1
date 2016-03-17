'use strict';

angular.module('sistem3.osb-pocket-poke', ['osb-pocket-poke-template'])
    .directive('osbPocketPoke', ['$http', '$q', function ($http, $q) {
        return {
            templateUrl: 'osbPocketPoke.tpl.html',
            restrict: 'EA',
            link: function ($scope, element, attrs) {
                console.log('Lets get things started');
                $scope.isLoading = true;
                $scope.navHidden = true;
                $scope.pokemonApiBase = 'http://pokeapi.co';
                $scope.pokemonList = [];
                $scope.pokemonViewList = [];
                $scope.pokemonSprites = [];
                $scope.pokemon = [];
                $scope.evolutionChains = [];
                $scope.evolutionViewList = [];
                $scope.evolutions = [];
                $scope.contests = [];
                $scope.berries = [];
                $scope.berriesData = [];
                $scope.berryCount = 0;
                $scope.locations = [];
                $scope.locationsCount = 0;
                $scope.locationData = [];
                $scope.sectionDisplay = 'pokemon';
                $scope.listCount = 18;
                $scope.pageLength = 18;
                $scope.callbackCount = 1;
                // Check Cache - Main
                var pokeListCache = localStorage.getItem('osbPocketPoke');
                if (pokeListCache) {
                    $scope.pokemonList = JSON.parse(pokeListCache);
                }
                var pokeCache = localStorage.getItem('osbPocketPoke.pokemon');
                if (pokeCache) {
                    $scope.pokemon = JSON.parse(pokeCache);
                }
                var pokeSpriteCache = localStorage.getItem('osbPocketPoke.sprites');
                if (pokeSpriteCache) {
                    $scope.pokemonSprites = JSON.parse(pokeSpriteCache);
                }
                // Check Cache - Evolutions
                var evolutionChainsCache = localStorage.getItem('osbPocketPoke.evolutionChains');
                if (evolutionChainsCache) {
                    $scope.evolutionChains = JSON.parse(evolutionChainsCache);
                }
                var evolutionsCache = localStorage.getItem('osbPocketPoke.evolutions');
                if (evolutionsCache) {
                    $scope.evolutions = JSON.parse(evolutionsCache);
                }
                // Check Cache - Berries
                var berriesCache = localStorage.getItem('osbPocketPoke.berries');
                if (berriesCache) {
                    $scope.berries = JSON.parse(berriesCache);
                }
                var berriesDataCache = localStorage.getItem('osbPocketPoke.berriesData');
                if (berriesDataCache) {
                    $scope.berriesData = JSON.parse(berriesDataCache);
                }
                // Check Cache - Locations
                var locationsCache = localStorage.getItem('osbPocketPoke.locations');
                if (locationsCache) {
                    $scope.locations = JSON.parse(locationsCache);
                }
                var locationDataCache = localStorage.getItem('osbPocketPoke.locationData');
                if (locationDataCache) {
                    $scope.locations = JSON.parse(locationDataCache);
                }
                console.log($scope);
                // Capture Pokemon?
                $scope.capturePokemon = function(e) {
                    console.log(e);
                    console.log('Gotta catch em allllll');
                };
                // Get Location
                $scope.getLocation = function(location) {
                    fetch(location.url)
                        .then(function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' + response.status);
                                return;
                            }
                            response.json().then(function(data) {
                                console.log(data);
                                $scope.locationData.push(data);
                                $scope.sectionDisplay = 'locations';
                                localStorage.setItem('osbPocketPoke.locationData', JSON.stringify($scope.locationData));
                                $scope.$apply();
                            });
                        })
                        .catch(function(err) {
                            console.log('Failed');
                        });
                };
                // Get Location(s)
                $scope.getLocations = function() {
                    fetch(this.pokemonApiBase + '/api/v2/location/')
                        .then(function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' + response.status);
                                return;
                            }
                            response.json().then(function(data) {
                                $scope.locationsCount = data.count;
                                data.results.forEach(function(element) {
                                    $scope.locations.push(element);
                                    $scope.getLocation(element);
                                });
                                localStorage.setItem('osbPocketPoke.locations', JSON.stringify($scope.locations));
                            });
                        })
                        .catch(function(err) {
                            console.log('Failed');
                        });
                };
                // Get Contest(s)
                $scope.getContests = function() {
                    console.log('Get dem contests');
                    fetch(this.pokemonApiBase + '/api/v2/contest-type/')
                        .then(function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' + response.status);
                                return;
                            }
                            response.json().then(function(data) {
                                console.log(data);
                                $scope.contests.push(data);
                                localStorage.setItem('osbPocketPoke.contests', JSON.stringify($scope.contests));
                            });
                        })
                        .catch(function(err) {
                            console.log('Failed');
                        });
                };
                // Get Berry
                $scope.getBerry = function(berry) {
                    if ($scope.berriesData.length > 1) {
                        $scope.sectionDisplay = 'berries';
                        $scope.$apply();
                        return false;
                    }
                    fetch(berry.url)
                        .then(function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' + response.status);
                                return;
                            }
                            response.json().then(function(data) {
                                $scope.berriesData.push(data);
                                $scope.sectionDisplay = 'berries';
                                localStorage.setItem('osbPocketPoke.berriesData', JSON.stringify($scope.berriesData));
                                $scope.$apply();
                            });
                        })
                        .catch(function(err) {
                            console.log('Failed');
                        });
                };
                // Get Berrie(s)
                $scope.getBerries = function() {
                    console.log('Get me some berries');
                    if ($scope.berries.length > 1) {
                        $scope.berries.forEach(function(element) {
                            $scope.getBerry(element);
                        });
                        return false;
                    }
                    fetch(this.pokemonApiBase + '/api/v2/berry/')
                        .then(function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' + response.status);
                                return;
                            }
                            response.json().then(function(data) {
                                console.log(data);
                                $scope.berryTotal = data.count;
                                $scope.berries = data.results;
                                $scope.berries.forEach(function(element) {
                                    $scope.getBerry(element);
                                });
                                localStorage.setItem('osbPocketPoke.berries', JSON.stringify($scope.berries));
                            });
                        })
                        .catch(function(err) {
                            console.log('Failed');
                        });
                };
                // Get Evolution
                $scope.getEvolution = function(chain) {
                    if ($scope.evolutions.length > 1) {
                        return false;
                    }
                    fetch(chain.url)
                        .then(function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' + response.status);
                                return;
                            }
                            response.json().then(function(data) {
                                console.log(data);
                                $scope.evolutions.push(data);
                                localStorage.setItem('osbPocketPoke.evolutions', JSON.stringify($scope.evolutions));
                            });
                        })
                        .catch(function(err) {
                            console.log('Failed');
                        });
                };
                // Get Evolution Chain
                $scope.getEvolutionChain = function() {
                    console.log('Do the evolution');
                    if ($scope.evolutionChains.length > 1) {
                        $scope.sectionDisplay = 'evolution';
                        $scope.evolutionViewList = $scope.evolutionChains.slice(0, $scope.listCount + 1);
                        $scope.evolutionViewList.forEach(function(element, index, array) {
                            $scope.getEvolution(element);
                        });
                        $scope.$apply();
                        return false;
                    }
                    fetch(this.pokemonApiBase + '/api/v2/evolution-chain/')
                        .then(function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' + response.status);
                                return;
                            }
                            response.json().then(function(data) {
                                //console.log(data);
                                $scope.evolutionChains = data;
                                localStorage.setItem('osbPocketPoke.evolutionChains', JSON.stringify(data));
                                $scope.sectionDisplay = 'evolution';
                                var evoCount = 0;
                                $scope.evolutionViewList = $scope.evolutionChains.slice(0, $scope.listCount + 1);
                                $scope.evolutionViewList.forEach(function(element, index, array) {
                                    $scope.getEvolution(element);
                                });
                                $scope.$apply();
                            });
                        })
                        .catch(function(err) {
                            console.log('Failed');
                        });
                };
                // Set Sprite (DOM)
                $scope.setPokeSprite = function(data) {
                    var sprite = new Image();
                    var spriteHolder = document.querySelector('#sprite-' + data.pokemon.name + '.img-holder');
                    spriteHolder.appendChild(sprite);
                    sprite.src = $scope.pokemonApiBase + data.image;
                };
                // Get Sprite
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
                // Get Pokemon
                $scope.getPokemon = function(pokemon, newList) {
                    if (!newList) {
                        if ($scope.pokemon.length > 1) {
                            $scope.pokemon.forEach(function(element, index, array) {
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
                                    console.log('set sprite');
                                    $scope.getPokeSprite(data, false);
                                    $scope.callbackCount++;
                                    if ($scope.callbackCount === $scope.pageLength) {
                                        console.log('Callback');
                                        document.querySelector('#loading-trigger').classList.remove('active');
                                    }
                                }
                                $scope.$apply();
                            });
                        })
                        .catch(function(err) {
                            console.log('Failed');
                        });
                };
                // Get More Pokemon (Pagination)
                $scope.getMorePokemon = function() {
                    console.log('Getting more');
                    var newListCount, updatedList;
                    $scope.callbackCount = 1;
                    if ($scope.pokemon) {
                        newListCount = $scope.listCount + $scope.pageLength;
                        updatedList = $scope.pokemonList.slice($scope.listCount + 1, newListCount);
                        $scope.listCount = newListCount;
                    } else {
                        newListCount = $scope.pokemon.length + $scope.pageLength;
                        updatedList = $scope.pokemonList.slice($scope.pokemon.length + 1, newListCount);
                        $scope.listCount = newListCount;
                    }
                    updatedList.forEach(function(element) {
                        $scope.getPokemon(element, true);
                    });
                };
                // Init ScrollMagic
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
                // Get Main Poke List
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
                $scope.getPokeList();
            }
        };
    }]);