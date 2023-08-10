import 'package:battle_master/components/pc.dart';
import 'package:battle_master/controllers/middleware.dart';
import 'package:get/get.dart';

import '../components/base.dart';
import '../components/map.dart';
import '../region/kanto/kanto.dart';

// final _rootNavigatorKey = GlobalKey<NavigatorState>();
// final _shellNavigatorKey = GlobalKey<NavigatorState>();
final middleware = GlobalMiddleware();
final routes = [
  GetPage(name: '/', page: () => const BasePage(), middlewares: [middleware]),
  GetPage(
      name: '/map', page: () => const RouteMap(), middlewares: [middleware]),
  GetPage(name: '/pc', page: () => const PlayerPc(), middlewares: [middleware]),
  GetPage(
      name: '/location/:locationId',
      page: () => locations
          .singleWhere((loc) => loc.$1 == Get.parameters['locationId'])
          .$3,
      middlewares: [middleware]),
  GetPage(
      name: '/battle',
      page: () => battles[Get.arguments['battleNumber'] - 1],
      //TODO: Remove middleware from battles, there is no running
      middlewares: [middleware]),
  GetPage(
      name: '/battle/:starterChoice',
      page: () => setRivalStater(
          Get.parameters['starterChoice']!, Get.arguments['battleNumber'] - 1),
      //TODO: Remove middleware from battles, there is no running
      middlewares: [middleware]),
  GetPage(
      name: '/route',
      page: () => mapRoutes[Get.arguments['routeNumber'] - 1],
      middlewares: [middleware]),
];

// TODO: Implement some kind of base page logic
// Maybe have the player's current mon (roaming)?
// If fresh start, probably show some welcome/tutorial screen?
