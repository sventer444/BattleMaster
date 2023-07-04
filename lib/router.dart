import 'package:battle_master/components/opponent.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:battle_master/components/base.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _shellNavigatorKey = GlobalKey<NavigatorState>();

class AppRouter {
  final router = GoRouter(
    initialLocation: '/activeOpponent',
    navigatorKey: _rootNavigatorKey,
    routes: [
      ShellRoute(
        navigatorKey: _shellNavigatorKey,
        pageBuilder: (context, state, child) {
          return NoTransitionPage(
              child: BasePage(
            child: child,
          ));
        },
        routes: [
          GoRoute(
            path: '/activeOpponent',
            parentNavigatorKey: _shellNavigatorKey,
            pageBuilder: (context, state) {
              return const NoTransitionPage(
                child: Opponent(opponentType: 'KantoStarters'),
              );
            },
          ),
          GoRoute(
            path: '/map',
            parentNavigatorKey: _shellNavigatorKey,
            pageBuilder: (context, state) {
              return const NoTransitionPage(
                child: Scaffold(
                  body: Center(child: Text("Map")),
                ),
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
}
// GoRouter configuration







// final router = GoRouter(
//   initialLocation: '/',
//   navigatorKey: _rootNavigatorKey,
//   routes: [
//     ShellRoute(
//       navigatorKey: _shellNavigatorKey,
//       pageBuilder: (context, state, child) {
//         print(state.location);
//         return NoTransitionPage(
//             child: ScaffoldWithNavBar(
//           location: state.location,
//           child: child,
//         ));
//       },
//       routes: [
//         GoRoute(
//           path: '/',
//           parentNavigatorKey: _shellNavigatorKey,
//           pageBuilder: (context, state) {
//             return const NoTransitionPage(
//               child: Scaffold(
//                 body: Center(child: Text("Home")),
//               ),
//             );
//           },
//         ),
//         GoRoute(
//           path: '/discover',
//           parentNavigatorKey: _shellNavigatorKey,
//           pageBuilder: (context, state) {
//             return const NoTransitionPage(
//               child: Scaffold(
//                 body: Center(child: Text("Discover")),
//               ),
//             );
//           },
//         ),
//         GoRoute(
//             parentNavigatorKey: _shellNavigatorKey,
//             path: '/shop',
//             pageBuilder: (context, state) {
//               return const NoTransitionPage(
//                 child: Scaffold(
//                   body: Center(child: Text("Shop")),
//                 ),
//               );
//             }),
//       ],
//     ),
//     GoRoute(
//       parentNavigatorKey: _rootNavigatorKey,
//       path: '/login',
//       pageBuilder: (context, state) {
//         return NoTransitionPage(
//           key: UniqueKey(),
//           child: Scaffold(
//             appBar: AppBar(),
//             body: const Center(
//               child: Text("Login"),
//             ),
//           ),
//         );
//       },
//     ),
//   ],
// );


