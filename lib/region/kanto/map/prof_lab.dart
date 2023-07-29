import 'package:battle_master/constants/animation_type.dart';
import 'package:battle_master/constants/mon.dart';
import 'package:battle_master/components/opponent.dart';
import 'package:battle_master/constants/dex_status.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../../states/player_progress.dart';
import '../../../components/responsive_window.dart';

class ProfessorsLab extends StatelessWidget {
  const ProfessorsLab(
      {super.key,
      required this.name,
      required this.choice1,
      required this.choice2,
      required this.choice3});

  final String name;

  final Pokemon choice1;

  final Pokemon choice2;

  final Pokemon choice3;

  final String starterText = 'Welcome to the professors lab!';

  final String endChallengeText =
      'You can choose to end your challenge and recieve any rewards you earned';

  @override
  Widget build(BuildContext context) {
    final playerProgress = context.watch<PlayerProgress>();
    Widget labWidget = SizedBox(
      height: 10,
    );

    if (!playerProgress.runInProgress) {
      labWidget = Scaffold(
        body: ResponsiveScreen(
          rectangularMenuArea: Text(starterText),
          squarishMainArea: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Center(
                  child: Text(name),
                ),
              ),
              Expanded(
                child: Center(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      // Choice 1
                      TextButton(
                          onPressed: () => {
                                starterSelected(
                                    context, playerProgress, choice1)
                              },
                          child: Text(choice1.name)),
                      // Choice 2
                      TextButton(
                          onPressed: () => {
                                starterSelected(
                                    context, playerProgress, choice2)
                              },
                          child: Text(choice2.name)),
                      // Choice 3
                      TextButton(
                          onPressed: () => {
                                starterSelected(
                                    context, playerProgress, choice3)
                              },
                          child: Text(choice3.name)),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    } else {
      labWidget = Scaffold(
        body: ResponsiveScreen(
          rectangularMenuArea: Text(endChallengeText),
          squarishMainArea: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Center(
                  child: Text(name),
                ),
              ),
              Expanded(
                child: Center(
                    child: TextButton(
                  child: Text('End Challenge'),
                  onPressed: () => {
                    playerProgress.endPlayerRun(),
                    GoRouter.of(context).go('/map')
                  },
                )),
              ),
            ],
          ),
        ),
      );
    }
    return labWidget;
  }

  void starterSelected(
      BuildContext context, PlayerProgress progress, Pokemon starterChoice) {
    progress.setPlayerDex((starterChoice.name, DexStatus.caught));
    starterChoice.currentHp = starterChoice.hp;
    progress.setPlayerTeam(starterChoice);
    if (progress.highestRoute < 1) {
      progress.setHighestRoute(1);
    }
    progress.setRunInProgress(true);
    GoRouter.of(context).go('/kanto/route/1');
  }
}
