import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../states/player_progress.dart';
import '../styles/delayed_appear.dart';
import '../styles/palette.dart';
import 'responsive_window.dart';

class RouteMap extends StatelessWidget {
  const RouteMap({super.key});

  @override
  Widget build(BuildContext context) {
    final palette = context.watch<Palette>();

    return Scaffold(
      backgroundColor: palette.bgGrey2,
      body: ResponsiveScreen(
        squarishMainArea: Column(
          children: [
            DelayedAppear(
              ms: ScreenDelays.first,
              child: const Padding(
                padding: EdgeInsets.all(16),
                child: Center(
                  child: Text(
                    'Select Route',
                  ),
                ),
              ),
            ),
            const SizedBox(height: 50),
            // This is the grid of numbers.
            Expanded(
              child: Center(
                child: AspectRatio(
                    aspectRatio: 1,
                    child: Column(
                      children: [
                        for (var y = 0; y < 3; y++)
                          Expanded(
                            child: Row(
                              children: [
                                for (var x = 0; x < 3; x++)
                                  AspectRatio(
                                    aspectRatio: 1,
                                    child: _LevelButton(y * 3 + x + 1),
                                  )
                              ],
                            ),
                          )
                      ],
                    )),
              ),
            ),
          ],
        ),
        rectangularMenuArea: DelayedAppear(
          ms: ScreenDelays.fourth,
          child: TextButton(
            onPressed: () {
              GoRouter.of(context).pop();
            },
            child: const Text('Back'),
          ),
        ),
      ),
    );
  }
}

class _LevelButton extends StatelessWidget {
  final int number;

  const _LevelButton(this.number, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final playerProgress = context.watch<PlayerProgress>();
    final palette = context.watch<Palette>();

    // /// Level is either one that the player has already bested, on one above.
    // final available = playerProgress.highestLevelReached + 1 >= number;

    // /// We allow the player to skip one level.
    // final availableWithSkip = playerProgress.highestLevelReached + 2 >= number;

    return DelayedAppear(
      ms: ScreenDelays.second + (number - 1) * 70,
      child: TextButton(
          onPressed: () => GoRouter.of(context).go('/play/session/$number'),
          child: SizedBox.expand(
            child: Padding(
              padding: const EdgeInsets.all(8),
              child: Text('level $number'),
            ),
          )),
    );
  }
}
