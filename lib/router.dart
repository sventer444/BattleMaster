import 'package:battle_master/styles/icons.dart';
import 'package:battle_master/components/opponent.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:battle_master/components/app_bar.dart';

import 'components/bottom_nav.dart';
import 'components/map.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _shellNavigatorKey = GlobalKey<NavigatorState>();

class AppRouter {
  final router = GoRouter(
    initialLocation: '/',
    navigatorKey: _rootNavigatorKey,
    routes: [
      ShellRoute(
        navigatorKey: _shellNavigatorKey,
        pageBuilder: (context, state, child) {
          var topBar = TopBar();
          var bottomNav = BottomNav(context: context);
          return NoTransitionPage(
              child: Scaffold(
            appBar: topBar.appBar,
            body: child,
            bottomNavigationBar: bottomNav.nav,
          ));
        },
        routes: [
          GoRoute(
            path: '/',
            parentNavigatorKey: _shellNavigatorKey,
            pageBuilder: (context, state) {
              return const NoTransitionPage(
                child: Center(child: Text('Home')),
              );
            },
          ),
          GoRoute(
            path: '/map',
            parentNavigatorKey: _shellNavigatorKey,
            pageBuilder: (context, state) {
              return const NoTransitionPage(
                child: RouteMap(),
              );
            },
          ),
          GoRoute(
              parentNavigatorKey: _shellNavigatorKey,
              path: '/pc',
              pageBuilder: (context, state) {
                return const NoTransitionPage(
                  child: Scaffold(
                    body: Center(child: Text("PC")),
                  ),
                );
              }),
        ],
      ),
      GoRoute(
        parentNavigatorKey: _rootNavigatorKey,
        path: '/login',
        pageBuilder: (context, state) {
          return NoTransitionPage(
            key: UniqueKey(),
            child: Scaffold(
              appBar: AppBar(),
              body: const Center(
                child: Text("Login"),
              ),
            ),
          );
        },
      ),
    ],
  );

  // static final _router = GoRouter(
  //   routes: [
  //     GoRoute(
  //         path: '/',
  //         builder: (context, state) =>
  //             const MainMenuScreen(key: Key('main menu')),
  //         routes: [
  //           GoRoute(
  //               path: 'play',
  //               pageBuilder: (context, state) => buildTransition<void>(
  //                     child: const LevelSelectionScreen(
  //                         key: Key('level selection')),
  //                     color: context.watch<Palette>().backgroundLevelSelection,
  //                   ),
  //               routes: [
  //                 GoRoute(
  //                   path: 'session/:level',
  //                   pageBuilder: (context, state) {
  //                     final levelNumber = int.parse(state.params['level']!);
  //                     final level = gameLevels
  //                         .singleWhere((e) => e.number == levelNumber);
  //                     return buildTransition<void>(
  //                       child: PlaySessionScreen(
  //                         level,
  //                         key: const Key('play session'),
  //                       ),
  //                       color: context.watch<Palette>().backgroundPlaySession,
  //                       flipHorizontally: true,
  //                     );
  //                   },
  //                 ),
  //                 GoRoute(
  //                   path: 'won',
  //                   pageBuilder: (context, state) {
  //                     final map = state.extra! as Map<String, dynamic>;
  //                     final score = map['score'] as Score;

  //                     return buildTransition<void>(
  //                       child: WinGameScreen(
  //                         score: score,
  //                         key: const Key('win game'),
  //                       ),
  //                       color: context.watch<Palette>().backgroundPlaySession,
  //                       flipHorizontally: true,
  //                     );
  //                   },
  //                 )
  //               ]),
  //           GoRoute(
  //             path: 'settings',
  //             builder: (context, state) =>
  //                 const SettingsScreen(key: Key('settings')),
  //           ),
  //         ]),
  //   ],
  // );
}
