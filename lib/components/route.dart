import 'dart:async';
import 'dart:math';

import 'package:battle_master/components/opponent.dart';
import 'package:battle_master/components/team.dart';
import 'package:battle_master/constants/animation_type.dart';
import 'package:battle_master/constants/mon.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import 'responsive_window.dart';
import '../constants/game_functions.dart';
import '../states/player_progress.dart';

class MapRoute extends StatefulWidget {
  const MapRoute(
      {super.key, required this.routeEncounters, required this.routeName});

  final List<(int, Pokemon)> routeEncounters;

  final String routeName;

  @override
  State<MapRoute> createState() => _MapRouteState();
}

class _MapRouteState extends State<MapRoute> {
  _MapRouteState();

  late Pokemon currentOpponent;

  late Timer _encounterTimer;

  @override
  void dispose() {
    //_attackTimer.cancel();
    _encounterTimer.cancel();
    currentOpponent = setOpponent(encounterTable);
    opponentWidget = Opponent(
        currentOpponent: currentOpponent,
        encounter: AnimationType.none,
        onClick: () => {});
    super.dispose();
  }

  @override
  void initState() {
    setEncounterTable(widget.routeEncounters);
    setEncounterTimer();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final playerProgress = context.watch<PlayerProgress>();
    return Scaffold(
      body: ResponsiveScreen(
        rectangularMenuArea: Text(widget.routeName),
        squarishMainArea: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Center(child: opponentWidget),
            ),
            Expanded(
              child: PlayerTeam(
                  playerTeam: playerProgress.playerTeam,
                  animation: AnimationType.none),
            ),
            TextButton(
              onPressed: () => {
                if (activeRound)
                  attackRound(currentOpponent, playerProgress, context)
              },
              child: const Text('Attack'),
            )
          ],
        ),
      ),
    );
  }

  void setEncounterTimer() {
    int randomEncounterInterval = Random().nextInt(3) + 3;
    _encounterTimer = Timer(Duration(seconds: randomEncounterInterval), () {
      currentOpponent = setOpponent(encounterTable);
      activeRound = true;
      setState(() {
        opponentWidget = Opponent(
            currentOpponent: currentOpponent,
            encounter: AnimationType.wildEncounter,
            onClick: () => {});
      });
    });
  }

  void attackRound(Pokemon currentOpponent, PlayerProgress playerProgress,
      BuildContext context) {
    // TODO: Implement exp gain and level scaling

    // TODO: Implement catching

    List<Pokemon> playerTeam = playerProgress.playerTeam;
    List<Pokemon> attackOrder =
        determineAttackOrder(currentOpponent, playerTeam);
    for (var mon in attackOrder) {
      if (kDebugMode) {
        print('${mon.name}, ${mon.currentHp}, SPD: ${mon.speed}');
      }
      // Ensure run is still valid
      if (playerProgress.runInProgress) {
        if (mon == currentOpponent) {
          // setState(() {
          if (mon.currentHp != 0) {
            //playerTeam[0] = applyDamage(playerTeam.first, mon);
          } else {
            // _currentOpponent = setOpponent(encounterTable);
            // _opponentWidget = AnimatedOpacity(
            //     opacity: 1.0,
            //     duration: const Duration(milliseconds: 700),
            //     // The green box must be a child of the AnimatedOpacity widget.
            //     child: Column(
            //         mainAxisAlignment: MainAxisAlignment.center,
            //         children: [
            //           Text(_currentOpponent.name),
            //           Text('${_currentOpponent.currentHp}')
            //         ]));
          } // else opponent is dead so set a new one
          // });
        } // if the current mon is the opponent
        else {
          if (mon.currentHp != 0) {
            applyDamage(currentOpponent, mon);
            if (currentOpponent.currentHp == 0) {
              setState(() {
                opponentWidget = Opponent(
                    currentOpponent: currentOpponent,
                    encounter: AnimationType.none,
                    onClick: () => {});
              });
              setEncounterTimer();
              activeRound = false;
            } else {
              setState(() {
                opponentWidget = Opponent(
                    currentOpponent: currentOpponent,
                    encounter: AnimationType.takeDamage,
                    onClick: () => {});
              });
            }
          } // if player mon is alive
          else {
            // TODO: Handle player mon K.O.

            //playerProgress.endPlayerRun();
          } // else player mon has 0 hp, potentially end run
        } // else the current mon is a player mon
      } // if the run is alive
      else {
        if (kDebugMode) {
          print('You lost...');
        }

        GoRouter.of(context).go('/map');
      } // run is ended go back to map
    }
  }

  // ···
}
