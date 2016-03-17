angular.module('osb-pocket-poke-template', ['osbPocketPoke.tpl.html']);

angular.module("osbPocketPoke.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("osbPocketPoke.tpl.html",
    "<main class=\"osb-pocket-poke-holder\">\n" +
    "    <header class=\"container\">\n" +
    "        <h1><i class=\"poke-icon poke-icon-pokeball\"></i> PocketPok&#x00E9;</h1>\n" +
    "        <nav>\n" +
    "            <ul class=\"list-unstyled list-inline\">\n" +
    "                <li><button class=\"btn btn-primary\" ng-click=\"navHidden = !navHidden\"><i class=\"fa fa-bars\"></i></button></li>\n" +
    "                <li ng-if=\"!navHidden\"><button class=\"btn btn-primary\" ng-click=\"sectionDisplay = 'pokemon'\"><i class=\"poke-icon poke-icon-pokeball-open\"></i> Pokémon</button></li>\n" +
    "                <li ng-if=\"!navHidden\"><button class=\"btn btn-primary\" ng-click=\"getLocations()\"><i class=\"fa fa-map-marker\"></i> Locations</button></li>\n" +
    "                <li ng-if=\"!navHidden\"><button class=\"btn btn-primary\" ng-click=\"getEvolutionChain()\"><i class=\"poke-icon poke-icon-strain\"></i> Evolution</button></li>\n" +
    "                <li ng-if=\"!navHidden\"><button class=\"btn btn-primary\" ng-click=\"getBerries()\"><i class=\"poke-icon poke-icon-berry\"></i> Berries</button></li>\n" +
    "                <li ng-if=\"!navHidden\"><button class=\"btn btn-primary\"><i class=\"fa fa-search\"></i> Search</button></li>\n" +
    "                <li ng-click=\"navHidden = !navHidden\"><i class=\"fa\" ng-class=\"{'fa-angle-right' : navHidden, 'fa-angle-left' : !navHidden}\"></i></li>\n" +
    "            </ul>\n" +
    "        </nav>\n" +
    "    </header>\n" +
    "    <section ng-if=\"sectionDisplay === 'locations'\" class=\"pokeEvol\">\n" +
    "        <ul class=\"pokeList list-unstyled\">\n" +
    "            <li ng-repeat=\"location in locationData\" class=\"pokeListItem\">\n" +
    "                <h3>{{ location.name }}</h3>\n" +
    "                <p>Region: {{ location.region.name }}</p>\n" +
    "                <h4 ng-click=\"areasHidden = !areasHidden\">Areas: <span class=\"pull-right\"><i class=\"fa\" [ngClass]=\"{'fa-angle-down' : areasHidden, 'fa-angle-up' : !areasHidden}\"></i></span></h4>\n" +
    "                <ul>\n" +
    "                    <li ng-repeat=\"area in location.areas\">{{ area.name }}</li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </section>\n" +
    "    <section ng-if=\"sectionDisplay === 'evolution'\" class=\"pokeEvol\">\n" +
    "        <ul class=\"pokeList list-unstyled\">\n" +
    "            <li ng-repeat=\"evolution in evolutions\" class=\"text-center pokeListItem\">\n" +
    "                <div class=\"col-md-8 chain\">\n" +
    "                    <h5>{{ evolution.chain.species.name }}</h5>\n" +
    "                    <div><i class=\"fa fa-angle-down\"></i></div>\n" +
    "                    <h4 ng-if=\"evolution.chain.evolves_to[0].species\">{{ evolution.chain.evolves_to[0].species.name }}</h4>\n" +
    "                    <p>\n" +
    "                        <span ng-if=\"evolution.chain.evolves_to[0].evolution_details.min_level\">Min-Level = {{ evolution.chain.evolves_to[0].evolution_details.min_level }}</span>\n" +
    "                        <span ng-if=\"evolution.chain.evolves_to[0].evolution_details.min_happiness\">Min-Happiness = {{ evolution.chain.evolves_to[0].evolution_details.min_happiness }}</span>\n" +
    "                        <span ng-if=\"evolution.chain.evolves_to[0].evolution_details.min_beauty\">Min-Beauty = {{ evolution.chain.evolves_to[0].evolution_details.min_beauty }}</span>\n" +
    "                    </p>\n" +
    "                    <div ng-if=\"evolution.chain.evolves_to[0].evolves_to[0]\"><i class=\"fa fa-angle-down\"></i></div>\n" +
    "                    <h3 ng-if=\"evolution.chain.evolves_to[0].evolves_to[0]\">{{ evolution.chain.evolves_to[0].evolves_to[0].species.name }}</h3>\n" +
    "                    <p ng-if=\"evolution.chain.evolves_to[0].evolves_to[0]\">\n" +
    "                        <span ng-if=\"evolution.chain.evolves_to[0].evolves_to[0].evolution_details.min_level\">Min-Level = {{ evolution.chain.evolves_to[0].evolves_to[0].evolution_details.min_level }}</span>\n" +
    "                        <span ng-if=\"evolution.chain.evolves_to[0].evolves_to[0].evolution_details.min_happiness\">Min-Happiness = {{ evolution.chain.evolves_to[0].evolves_to[0].evolution_details.min_happiness }}</span>\n" +
    "                        <span ng-if=\"evolution.chain.evolves_to[0].evolves_to[0].evolution_details.min_beauty\">Min-Beauty = {{ evolution.chain.evolves_to[0].evolves_to[0].evolution_details.min_beauty }}</span>\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4 sprites\">\n" +
    "                    <div></div>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "            <li class=\"pokeListItem\">\n" +
    "                <h2>Loading...</h2>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </section>\n" +
    "    <section ng-if=\"pokemon.length > 1 && sectionDisplay === 'pokemon'\" class=\"pokeDex\">\n" +
    "        <ul class=\"pokeList list-unstyled\">\n" +
    "            <li ng-repeat=\"poke in pokemon\" class=\"pokeListItem\">\n" +
    "                <div id=\"sprite-{{poke.name}}\" class=\"img-holder text-center\">\n" +
    "                    <div class=\"typeHolder\">\n" +
    "                        <div ng-repeat=\"type in poke.types\" class=\"typeIcon type-{{type.type.name}}\" title=\"Type: {{type.type.name}}\">\n" +
    "                            <i class=\"poke-icon poke-icon-{{type.type.name}}\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"spriteBg\"></div>\n" +
    "                </div>\n" +
    "                <h2>{{ poke.name }} <span class=\"pull-right\"><i class=\"poke-icon poke-icon-pokeball-open\"></i></span></h2>\n" +
    "                <p><strong>Height:</strong> {{ poke.height }} | <strong>Weight:</strong> {{ poke.weight }} | <strong>Base XP:</strong> {{ poke.base_experience }}</p>\n" +
    "                <h4 ng-click=\"poke.statsVisible = !poke.statsVisible\" class=\"details\">Attributes <i class=\"fa pull-right\" [ngClass]=\"{'fa-chevron-down' : !poke.statsVisible, 'fa-chevron-up' : poke.statsVisible}\"></i></h4>\n" +
    "                <ul class=\"list-unstyled details-list\" ng-hide=\"!poke.statsVisible\">\n" +
    "                    <li ng-repeat=\"stats in poke.stats\">\n" +
    "                        <p><strong>{{stats.stat.name}}</strong> <span class=\"pull-right\">{{stats.base_stat}}</span></p>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <h4 ng-click=\"poke.abilitiesVisible = !poke.abilitiesVisible\" class=\"details\">Abilities <i class=\"fa pull-right\" [ngClass]=\"{'fa-chevron-down' : !poke.abilitiesVisible, 'fa-chevron-up' : poke.abilitiesVisible}\"></i></h4>\n" +
    "                <ul class=\"list-unstyled details-list\" ng-hide=\"!poke.abilitiesVisible\">\n" +
    "                    <li ng-repeat=\"ability in poke.abilities\">\n" +
    "                        <p>{{ability.ability.name}}</p>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <h4 ng-click=\"poke.movesVisible = !poke.movesVisible\" class=\"details\">Moves <i class=\"fa pull-right\" [ngClass]=\"{'fa-chevron-down' : !poke.movesVisible, 'fa-chevron-up' : poke.movesVisible}\"></i></h4>\n" +
    "                <ul class=\"list-unstyled details-list moves\" ng-hide=\"!poke.movesVisible\">\n" +
    "                    <li ng-repeat=\"move in poke.moves\">\n" +
    "                        <p><i class=\"fa fa-star\"></i> {{move.move.name}}</p>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "            <li class=\"pokeListItem\">\n" +
    "                <div id=\"loading-trigger\" class=\"img-holder text-center\">\n" +
    "                    <div class=\"spriteBg\"></div>\n" +
    "                </div>\n" +
    "                <h2>Loading...</h2>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </section>\n" +
    "    <section ng-if=\"berriesData.length > 1 && sectionDisplay === 'berries'\" class=\"pokeDex\">\n" +
    "        <ul class=\"pokeList list-unstyled\">\n" +
    "            <li ng-repeat=\"berry in berriesData\" class=\"pokeListItem\">\n" +
    "                <h3 class=\"text-center\">{{ berry.name }}</h3>\n" +
    "                <div class=\"col-md-8\">\n" +
    "                    <h4>Stats</h4>\n" +
    "                    <ul class=\"list-unstyled\">\n" +
    "                        <li>Size: {{ berry.size }}</li>\n" +
    "                        <li>Max Harvest: {{ berry.max_harvest }}</li>\n" +
    "                        <li>Firmness: {{ berry.firmness.name }}</li>\n" +
    "                        <li>Smoothness: {{ berry.smoothness }}</li>\n" +
    "                        <li>Soil Dryness: {{ berry.soil_dryness }}</li>\n" +
    "                        <li>Growth Time: {{ berry.growth_time }}</li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4\">\n" +
    "                    <h4>Flavours</h4>\n" +
    "                    <ul class=\"list-unstyled\">\n" +
    "                        <li ng-repeat=\"flavor in berry.flavors\">\n" +
    "                            {{ flavor.flavor.name }} <span>{{ flavor.potency }}</span>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <h4>Natural Gift</h4>\n" +
    "                    <div class=\"typeIcon type-{{berry.natural_gift_type.name}}\" title=\"Type: {{berry.natural_gift_type.name}}\">\n" +
    "                        <i class=\"poke-icon poke-icon-{{berry.natural_gift_type.name}}\"></i> Power: {{berry.natural_gift_power}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </section>\n" +
    "</main>");
}]);
