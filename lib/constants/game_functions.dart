import 'dart:async';
import 'dart:math';

import 'mon.dart';

const attackTime = Duration(seconds: 7);

Pokemon setOpponent(List<Pokemon> encounterTable) {
  int encounterIndex = Random().nextInt(encounterTable.length);
  print('Woah, ${encounterTable[encounterIndex].name} appeared!');
  encounterTable[encounterIndex].currentHp = encounterTable[encounterIndex].hp;
  return encounterTable[encounterIndex];
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

Pokemon applyDamage(Pokemon target, Pokemon source) {
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
  return target;
}

List<Pokemon> setEncounterTable(List<(double, Pokemon)> routeEncounters) {
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
  return table;
}
