import 'dart:math';

import 'package:flutter/foundation.dart';

import 'mon.dart';

const attackDelay = Duration(seconds: 5);

bool activeRound = false;

int selectedTeamIndex = -1;

// Timer startAttackTimer(PlayerProgress playerProgress, BuildContext context) {
//   return Timer.periodic(
//       attackTime, (Timer t) => attackRound(playerProgress, context));
// }

//TODO: Transfer to game controller but keep static functions here

// Returns an encounter from the given encounter Table
Pokemon setEncounterOpponent(List<Pokemon> encounterTable) {
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

// Given a starter list of grass, fire, water order
// Determines the counter starter for the rival to take
Pokemon determineRivalStarter(
    String starterChoice, List<Pokemon> starterOptions) {
  if (starterChoice == starterOptions.first.name) {
    return starterOptions[1];
  } //player chose grass
  else if (starterChoice == starterOptions[1].name) {
    return starterOptions[2];
  } // player chose fire
  else {
    return starterOptions.first;
  } // player chose water
}

// Determines the order of attacks for a round
// If a pokemon is sufficiently faster than it's opponent,
// it can attack multiple times
List<Pokemon> determineAttackOrder(Pokemon opponent, List<Pokemon> playerTeam) {
  List<Pokemon> determinedOrder = List.empty(growable: true);
  List<Pokemon> attackersList = playerTeam;
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

// Applies damage from the source to the target
void applyDamage(Pokemon target, Pokemon source) {
  int rawDamage = calcDamage(source, target);

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

int calcDamage(Pokemon source, Pokemon target) {
  double targetDefenseDrop = (source.attack / (1 + (target.defense / 100)));
  double rawDamage = source.attack - targetDefenseDrop;
  //TODO: Implement typings
  return (rawDamage > 0) ? rawDamage.round() : 1;
}

// Returns an encounter table for a route/location
// Given a list of pokemon and encounter probabilities,
// fill a 100 size list based on the odds of encounter
List<Pokemon> setEncounterTable(List<(int, Pokemon)> routeEncounters) {
  // Ensure the encounter odds equal 100
  if (ensureFullEncounters(routeEncounters)) {
    //Initial filled list of route encounters, to be replaced
    List<Pokemon> table = List.empty(growable: true);
    for ((int, Pokemon) encounter in routeEncounters) {
      var encounterList = List.filled(encounter.$1, encounter.$2);
      table.addAll(encounterList);
    }
    return table;
  } else {
    if (kDebugMode) {
      print('Route encounters did not add to 100');
    }
    return List.filled(100, routeEncounters.first.$2);
  }
}

// Ensure the encounter table given has a 100 total
bool ensureFullEncounters(List<(int, Pokemon)> routeEncounters) {
  int total = 0;
  for ((int, Pokemon) encounter in routeEncounters) {
    total += encounter.$1;
  }
  return total == 100;
}

void switchTeamMembers(List<Pokemon> playerTeam, int index) {
  if (selectedTeamIndex == index) {
    selectedTeamIndex = -1;
    if (kDebugMode) {
      print('unselected teammember');
    }
  } else if (selectedTeamIndex == -1) {
    if (kDebugMode) {
      print('setting selected to $index');
    }
    selectedTeamIndex = index;
  } else {
    if (kDebugMode) {
      print('swapping $selectedTeamIndex with $index');
    }
    Pokemon temp = playerTeam[selectedTeamIndex];
    playerTeam[selectedTeamIndex] = playerTeam[index];
    playerTeam[index] = temp;
    selectedTeamIndex = -1;
  }

  // teamWidget = Column(
  //   mainAxisAlignment: MainAxisAlignment.center,
  //   children: [
  //     Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
  //       for (var i = 0; i < playerTeam.length; i++)
  //         // (i == selectedTeamIndex)
  //         //     ? OutlinedButton(
  //         //         onPressed: () => {switchTeamMembers(i)},
  //         //         child: Text(playerTeam[i].name))
  //         TextButton(
  //             child: Text(playerTeam[i].name),
  //             onPressed: () => {switchTeamMembers(i)}),
  //     ]),
  //     Row(
  //       mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  //       children: [
  //         for (var i = 0; i < playerTeam.length; i++)
  //           Text('${playerTeam[i].currentHp}')
  //       ],
  //     ),
  //   ],
  // );
}
