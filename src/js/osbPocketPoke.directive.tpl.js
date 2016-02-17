angular.module('osb-pocket-poke-template', ['js/osbPocketPoke.tpl.html']);

angular.module("js/osbPocketPoke.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("js/osbPocketPoke.tpl.html",
    "<main class=\"osb-pocket-poke-holder\">\n" +
    "    <header class=\"container\">\n" +
    "        <h1><i class=\"poke-icon poke-icon-pokeball\"></i> PocketPoké</h1>\n" +
    "    </header>\n" +
    "    <section class=\"pokeDex\">\n" +
    "        <ul class=\"pokeList list-unstyled\">\n" +
    "            <li ng-repeat=\"#poke in pokemon\">\n" +
    "                <div id=\"sprite-{{poke.name}}\" class=\"img-holder text-center\">\n" +
    "                    <div class=\"typeHolder\">\n" +
    "                        <div ng-repeat=\"#type of poke.types\" class=\"typeIcon type-{{type.type.name}}\" title=\"Type: {{type.type.name}}\">\n" +
    "                            <i class=\"poke-icon poke-icon-{{type.type.name}}\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"spriteBg\"></div>\n" +
    "                </div>\n" +
    "                <h2>{{ poke.name }} <span class=\"pull-right\"><i class=\"poke-icon poke-icon-pokeball-open\"></i></span></h2>\n" +
    "                <p><strong>Height:</strong> {{ poke.height }} | <strong>Weight:</strong> {{ poke.weight }} | <strong>Base XP:</strong> {{ poke.base_experience }}</p>\n" +
    "                <h4 ng-click=\"poke.statsVisible = !poke.statsVisible\" class=\"details\">Attributes <i class=\"fa pull-right\" ng-class=\"{'fa-chevron-down' : !poke.statsVisible, 'fa-chevron-up' : poke.statsVisible}\"></i></h4>\n" +
    "                <ul class=\"list-unstyled details-list\" [hidden]=\"!poke.statsVisible\">\n" +
    "                    <li ng-repeat=\"#stats in poke.stats\">\n" +
    "                        <p><strong>{{stats.stat.name}}</strong> <span class=\"pull-right\">{{stats.base_stat}}</span></p>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <h4 ng-click=\"poke.abilitiesVisible = !poke.abilitiesVisible\" class=\"details\">Abilities <i class=\"fa pull-right\" ng-class=\"{'fa-chevron-down' : !poke.abilitiesVisible, 'fa-chevron-up' : poke.abilitiesVisible}\"></i></h4>\n" +
    "                <ul class=\"list-unstyled details-list\" [hidden]=\"!poke.abilitiesVisible\">\n" +
    "                    <li ng-repeat=\"#ability in poke.abilities\">\n" +
    "                        <p>{{ability.ability.name}}</p>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <h4 ng-click=\"poke.movesVisible = !poke.movesVisible\" class=\"details\">Moves <i class=\"fa pull-right\" ng-class=\"{'fa-chevron-down' : !poke.movesVisible, 'fa-chevron-up' : poke.movesVisible}\"></i></h4>\n" +
    "                <ul class=\"list-unstyled details-list moves\" [hidden]=\"!poke.movesVisible\">\n" +
    "                    <li ng-repeat=\"#move in poke.moves\">\n" +
    "                        <p>{{move.move.name}} <i class=\"fa fa-star\"></i></p>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <div id=\"loading-trigger\" class=\"img-holder text-center\">\n" +
    "                    <div class=\"spriteBg\"></div>\n" +
    "                </div>\n" +
    "                <h2>Loading...</h2>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </section>\n" +
    "</main>");
}]);
