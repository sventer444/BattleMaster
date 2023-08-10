import 'package:battle_master/controllers/game.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../styles/delayed_appear.dart';
import '../styles/palette.dart';
import '../region/kanto/kanto.dart';
import 'responsive_window.dart';

class RouteMap extends StatelessWidget {
  const RouteMap({super.key});

  @override
  Widget build(BuildContext context) {
    // final playerProgress = context.watch<PlayerProgress>();
    final GameController gameController = Get.find();

    return Scaffold(
      backgroundColor: Palette.bgGrey2,
      body: ResponsiveWindow(
        squarishMainArea: Column(
          children: [
            DelayedAppear(
              key: const ValueKey('RoutesMap'),
              ms: ScreenDelays.first,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Center(
                  child: Text(gameController.currentRegion),
                ),
              ),
            ),
            const SizedBox(height: 50),
            Expanded(
                child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                // This is the grid of locations
                Column(
                  children: [
                    for (var i = 0;
                        i < gameController.furthestLocationThisRun;
                        i++)
                      _LocationButton(i)
                  ],
                ),
                // This is the grid of routes
                Column(
                  children: [
                    for (var i = 0; i < gameController.highestRouteThisRun; i++)
                      _RouteButton(i + 1)
                  ],
                )
              ],
            )),

            // Expanded(
            //   child: Center(
            //     child: Column(
            //       children: [
            //         for (var y = 0; y < 3; y++)
            //           Row(
            //             children: [Text('${y + 1}')],
            //           ),
            //         // Expanded(
            //         //   child: Row(
            //         //     children: [
            //         //       for (var x = 0; x < 2; x++)
            //         //         AspectRatio(
            //         //           aspectRatio: 1,
            //         //           child: _LevelButton(y * 3 + x + 1),
            //         //         )
            //         //     ],
            //         //   ),
            //         // )
            //       ],
            //     ),
            //   ),
            // ),
          ],
        ),
      ),
    );
  }
}

class _RouteButton extends StatelessWidget {
  final int routeNumber;

  const _RouteButton(this.routeNumber, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // /// Level is either one that the player has already bested, on one above.
    // final available = playerProgress.highestLevelReached + 1 >= number;

    // /// We allow the player to skip one level.
    // final availableWithSkip = playerProgress.highestLevelReached + 2 >= number;

    return DelayedAppear(
      key: ValueKey(routeNumber),
      ms: ScreenDelays.second + (routeNumber - 1) * 70,
      child: TextButton(
        onPressed: () => Get.offAndToNamed('/route',
            arguments: {'routeNumber': routeNumber}),
        // child: SizedBox.expand(
        // child: Padding(
        //   padding: const EdgeInsets.all(8),
        child: Text('Route $routeNumber'),
        // ),
        // )
      ),
    );
  }
}

class _LocationButton extends StatelessWidget {
  final int locationIndex;

  const _LocationButton(this.locationIndex, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // /// Level is either one that the player has already bested, on one above.
    // final available = playerProgress.highestLevelReached + 1 >= number;

    // /// We allow the player to skip one level.
    // final availableWithSkip = playerProgress.highestLevelReached + 2 >= number;
    return DelayedAppear(
      key: ValueKey(locationIndex),
      ms: ScreenDelays.second + (locationIndex - 1) * 70,
      child: TextButton(
        onPressed: () =>
            Get.offAndToNamed('/location/${locations[locationIndex].$1}'),
        // child: SizedBox.expand(
        // child: Padding(
        //   padding: const EdgeInsets.all(8),
        child: Text(locations[locationIndex].$2),
        // ),
        // )
      ),
    );
  }
}
