import 'dart:math';

import '../components/mon.dart';

Pokemon setOpponent(List<Pokemon> encounterTable) {
  int encounterIndex = Random().nextInt(encounterTable.length);
  return encounterTable[encounterIndex];
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
