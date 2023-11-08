import 'package:battle_master/constants/mon.dart';
import 'package:battle_master/constants/dex_status.dart';
import 'package:battle_master/controllers/game.dart';
import 'package:battle_master/controllers/player.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

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
      'You can choose to end your Battle Challenge and receive any rewards you earned';

  @override
  Widget build(BuildContext context) {
    final PlayerController playerController = Get.find();
    GameController gameController = Get.find();

    Widget labWidget = const SizedBox(
      height: 10,
    );

    if (!playerController.runInProgress.value) {
      labWidget = Scaffold(
        body: ResponsiveWindow(
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
                                    context, playerController, choice1)
                              },
                          child: Text(choice1.name)),
                      // Choice 2
                      TextButton(
                          onPressed: () => {
                                starterSelected(
                                    context, playerController, choice2)
                              },
                          child: Text(choice2.name)),
                      // Choice 3
                      TextButton(
                          onPressed: () => {
                                starterSelected(
                                    context, playerController, choice3)
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
        body: ResponsiveWindow(
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
                    child: const Text('End Challenge'),
                    onPressed: () => {
                      //TODO: Impelment prestige
                      playerController.endPlayerRun(),
                      gameController.resetGameController(),
                      Get.offAllNamed('/')
                    },
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    }
    return labWidget;
  }

  void starterSelected(BuildContext context, PlayerController playerController,
      Pokemon starterChoice) {
    playerController.setPlayerDex((starterChoice, DexStatus.caught));
    playerController.setPlayerTeam(starterChoice);
    // if (progress.highestRoute < 1) {
    //   progress.setHighestRoute(1);
    // }
    //String rivalStarter = determineStarter(starterChoice.name);

    playerController.setRunInProgress(true);
    Get.toNamed('/battle/rival',
        arguments: {'battleNumber': 1, 'starterChoice': starterChoice.name});
    //GoRouter.of(context).go('/kanto/battle/1');
  }
}
