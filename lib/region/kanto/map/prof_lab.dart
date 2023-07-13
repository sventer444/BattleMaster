import 'package:battle_master/components/mon.dart';
import 'package:battle_master/components/opponent.dart';
import 'package:battle_master/constants/dex_status.dart';
import 'package:flutter/material.dart';
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

  @override
  Widget build(BuildContext context) {
    final playerProgress = context.watch<PlayerProgress>();

    return Scaffold(
      body: ResponsiveScreen(
        rectangularMenuArea: const Text('Welcome to the professors lab!'),
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
                    Opponent(
                        mon: choice1,
                        onClick: () =>
                            starterSelected(playerProgress, choice1)),
                    // Choice 2
                    Opponent(
                        mon: choice2,
                        onClick: () =>
                            starterSelected(playerProgress, choice2)),
                    // Choice 3
                    Opponent(
                        mon: choice3,
                        onClick: () =>
                            starterSelected(playerProgress, choice3)),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void starterSelected(PlayerProgress progress, Pokemon starterChoice) {
    progress.setPlayerDex((starterChoice.name, DexStatus.caught));
    progress.setPlayerTeam(starterChoice);
  }
}
