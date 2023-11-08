import 'package:battle_master/components/battle.dart';
import 'package:battle_master/controllers/game.dart';
import 'package:get/get.dart';
import '../../constants/game_functions.dart';
import 'dex.dart';
import 'package:flutter/widgets.dart';

import '../../constants/mon.dart';
import '../../components/route.dart';
import 'locations/prof_lab.dart';

//TODO: Scope kanto regionDex
final List<Pokemon> regionDex = dex;

const String regionName = 'Kanto';

const String rivalName = 'Nick';

final List<Pokemon> starters = [
  regionDex.first,
  regionDex[3],
  regionDex[6],
];

final List<(int, Pokemon)> route1Encounters = [
  (50, regionDex[15]),
  (50, regionDex[18])
];

final List<Widget> mapRoutes = [
  MapRoute(routeEncounters: route1Encounters, routeName: 'Route 1')
];

final List<(String, String, Widget)> locations = [
  (
    'prof_lab',
    'Professors Lab',
    ProfessorsLab(
      name: 'Professors Lab',
      choice1: starters[0],
      choice2: starters[1],
      choice3: starters[2],
    )
  )
];
final List<BattleWidget> battles = [
  BattleWidget(
    opponentName: rivalName,
    opponentTeam: [],
  )
];

Widget setRivalStater(String playerStarter, int battlesIndex) {
  Pokemon counterStarter = determineRivalStarter(playerStarter, starters);
  battles[battlesIndex].opponentTeam = [counterStarter];
  return battles[battlesIndex];
}
