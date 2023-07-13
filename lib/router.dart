// import 'package:battle_master/styles/icons.dart';
// import 'package:battle_master/components/opponent.dart';
import 'package:battle_master/components/pc.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:battle_master/components/app_bar.dart';

import 'components/bottom_nav.dart';
import 'components/map.dart';
import 'components/mapRoutes/kanto.dart';

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
                child: Text(''),
              );
            },
          ),
          GoRoute(
              path: '/kanto',
              pageBuilder: (context, state) {
                return const NoTransitionPage(child: Text('Kanto'));
              },
              routes: [
                GoRoute(
                  path: 'route/:routeNumber',
                  pageBuilder: (context, state) {
                    // final routeNumber =
                    //     int.parse(state.pathParameters['routeNumber']!);
                    return const NoTransitionPage(child: Text('route'));
                  },
                ),
                GoRoute(
                  path: 'location/:locationPath',
                  pageBuilder: (context, state) {
                    final locationPath = state.pathParameters['locationPath']!;
                    final location =
                        locations.singleWhere((loc) => loc.$1 == locationPath);
                    return NoTransitionPage(child: location.$3);
                  },
                ),
              ]),
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
                    body: Center(child: PlayerPc()),
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
}
