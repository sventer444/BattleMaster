import 'dart:math';

import 'package:battle_master/region/kanto/kanto.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';

import 'mon.dart';

const attackTime = Duration(seconds: 5);

bool activeRound = false;

Widget opponentWidget = const SizedBox(
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
  if (kDebugMode) {
    print('Woah, ${encounter.name} appeared!');
  }
  return Pokemon(
      name: encounter.name,
      type1: encounter.type1,
      type2: encounter.type2,
      hp: encounter.hp,
      attack: encounter.attack,
      defense: encounter.defense,
      speed: encounter.speed);
}

// Determines the order of attacks for a round
// If a pokemon is sufficiently faster than it's opponent,
// it can attack multiple times
List<Pokemon> determineAttackOrder(Pokemon opponent, List<Pokemon> playerTeam) {
  List<Pokemon> determinedOrder = List.empty(growable: true);
  List<Pokemon> attackersList = playerTeam.toList();
  attackersList.add(opponent); // Attackers list has player team and opponent

  // Sorts attackers based on speed
  // TODO: Test/Implement speed tie logic
  attackersList.sort((a, b) => b.speed.compareTo(a.speed));
  // TODO: Implement attack speed bonus

  determinedOrder = attackersList;
  if (kDebugMode) {
    print('${determinedOrder.first.name} moves first!');
  }
  return determinedOrder;
}

void applyDamage(Pokemon target, Pokemon source) {
  // TODO: Implement typings

  // TODO: Adjust how defense is used?
  double rawDamage = (source.attack - target.defense) < 0
      ? 0
      : (source.attack - target.defense);
  if ((target.currentHp - rawDamage) <= 0) {
    if (kDebugMode) {
      print(
          '${target.name} had ${target.currentHp}, but damage was $rawDamage');
    }
    target.currentHp = 0;
  } // if raw damage would K.O. the mon
  else {
    if (kDebugMode) {
      print('${target.name} with ${target.currentHp} takes $rawDamage damage');
    }
    target.currentHp -= rawDamage;
  } // else apply the damage calc
}

// Sets up the encounter table, for a route/location
// Given a list of pokemon and encounter probabilities,
// fill a 100 size list based on the odds of encounter
void setEncounterTable(List<(int, Pokemon)> routeEncounters) {
  // Ensure the encounter odds equal 100
  if (ensureFullEncounters(routeEncounters)) {
    //Initial filled list of route encounters, to be replaced
    List<Pokemon> table = List.empty(growable: true);
    for ((int, Pokemon) encounter in routeEncounters) {
      var encounterList = List.filled(encounter.$1, encounter.$2);
      table.addAll(encounterList);
    }
    encounterTable = table;
  }
}

bool ensureFullEncounters(List<(int, Pokemon)> routeEncounters) {
  int total = 0;
  for ((int, Pokemon) encounter in routeEncounters) {
    total += encounter.$1;
  }
  return total == 100;
}
