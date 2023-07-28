import 'dart:async';
import 'dart:math';

import 'package:battle_master/states/player_progress.dart';
import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';

import '../styles/delayed_appear.dart';
import 'mon.dart';

const attackTime = Duration(seconds: 7);

Pokemon currentOpponent = setOpponent(encounterTable);

bool activeRound = false;

StatefulWidget opponentWidget = DelayedAppear(
  key: ValueKey(currentOpponent.id),
  ms: ScreenDelays.first,
  child: Padding(
    padding: const EdgeInsets.all(16),
    child: Center(
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Text(currentOpponent.name),
        Text('${currentOpponent.currentHp} / ${currentOpponent.hp}')
      ]),
    ),
  ),
);

late List<Pokemon> encounterTable;

Timer startAttackTimer(PlayerProgress playerProgress, BuildContext context) {
  return Timer.periodic(
      attackTime, (Timer t) => attackRound(playerProgress, context));
}

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

setEncounterTable(List<(double, Pokemon)> routeEncounters) {
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

void attackRound(PlayerProgress playerProgress, BuildContext context) {
  List<Pokemon> playerTeam = playerProgress.playerTeam;
  List<Pokemon> attackOrder = determineAttackOrder(currentOpponent, playerTeam);
  for (var mon in attackOrder) {
    print('${mon.name}, ${mon.currentHp}, SPD: ${mon.speed}');
    // Ensure run is still valid
    if (playerProgress.runInProgresss) {
      if (mon == currentOpponent) {
        // setState(() {
        //   if (mon.currentHp != 0) {
        //     playerTeam[0] = applyDamage(playerTeam.first, mon);
        //   } else {
        //     _currentOpponent = setOpponent(encounterTable);
        //     _opponentWidget = AnimatedOpacity(
        //         opacity: 1.0,
        //         duration: const Duration(milliseconds: 700),
        //         // The green box must be a child of the AnimatedOpacity widget.
        //         child: Column(
        //             mainAxisAlignment: MainAxisAlignment.center,
        //             children: [
        //               Text(_currentOpponent.name),
        //               Text('${_currentOpponent.currentHp}')
        //             ]));
        //   } // else opponent is dead so set a new one
        // });
      } // if the current mon is the opponent
      else {
        // setState(() {
        //   if (mon.currentHp != 0) {
        //     _currentOpponent = applyDamage(_currentOpponent, mon);
        //     // _opponentWidget = DelayedAppear(
        //     //     child: Center(
        //     //         child: Column(
        //     //             mainAxisAlignment: MainAxisAlignment.center,
        //     //             children: [
        //     //           Text(_currentOpponent.name),
        //     //           Text('${_currentOpponent.currentHp}')
        //     //         ])),
        //     //     ms: ScreenDelays.second + (3 - 1) * 70);
        //   } // if player mon is alive
        //   else {
        //     playerProgress.endPlayerRun();
        //   } // player mon is dead so end run
        // });
      } // else the current mon is a player mon
    } // if the run is alive
    else {
      // TODO:
      // implement exp gain and level scaling
      print('You lost...');

      GoRouter.of(context).go('/map');
    } // run is ended go back to map
  }
}
