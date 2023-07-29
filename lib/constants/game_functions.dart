import 'dart:async';
import 'dart:math';

import 'package:battle_master/states/player_progress.dart';
import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';

import '../components/opponent.dart';
import '../styles/delayed_appear.dart';
import 'mon.dart';

const attackTime = Duration(seconds: 5);

bool activeRound = false;

Widget opponentWidget = SizedBox(
  height: 10,
);

late List<Pokemon> encounterTable;

// Timer startAttackTimer(PlayerProgress playerProgress, BuildContext context) {
//   return Timer.periodic(
//       attackTime, (Timer t) => attackRound(playerProgress, context));
// }

Pokemon setOpponent(List<Pokemon> encounterTable) {
  int encounterIndex = Random().nextInt(encounterTable.length);
  Pokemon encounter = encounterTable[encounterIndex];
  print('Woah, ${encounter.name} appeared!');
  return Pokemon(
      name: encounter.name,
      type1: encounter.type1,
      type2: encounter.type2,
      hp: encounter.hp,
      attack: encounter.attack,
      defense: encounter.defense,
      speed: encounter.speed);
}

List<Pokemon> determineAttackOrder(Pokemon opponent, List<Pokemon> playerTeam) {
  List<Pokemon> attackOrder = List.empty(growable: true);
  List<Pokemon> attackList = playerTeam.toList();
  attackList.add(opponent);
  attackList.sort((a, b) => b.speed.compareTo(a.speed));
  attackOrder = attackList;
  // TODO:
  // implement attack speed bonus
  print('${attackOrder.first.name} moves first!');
  return attackOrder;
}

void applyDamage(Pokemon target, Pokemon source) {
  // TODO:
  // implement
  double rawDamage = (source.attack - target.defense) < 0
      ? 0
      : (source.attack - target.defense);
  if ((target.currentHp - rawDamage) <= 0) {
    print('${target.name} had ${target.currentHp}, but damage was $rawDamage');
    target.currentHp = 0;
  } else {
    print('${target.name} with ${target.currentHp} takes $rawDamage damage');
    target.currentHp -= rawDamage;
  }
}

void setEncounterTable(List<(double, Pokemon)> routeEncounters) {
  int encounterIndex = 0;
  const tableLength = 100;
  List<Pokemon> table = List.empty(growable: true);
  for (var i = 0; i < tableLength; i++) {
    int encounterRate = routeEncounters[encounterIndex].$1.toInt();
    for (var k = 0; k < encounterIndex; k++) {
      encounterRate += routeEncounters[k].$1.toInt();
    }
    if (encounterRate < i) {
      encounterIndex++;
    }
    table.add(routeEncounters[encounterIndex].$2);
  }
  encounterTable = table;
}
