import 'package:battle_master/router.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../controllers/audio.dart';
import '../controllers/game_services.dart';
import '../states/app_lifecycle.dart';
import '../states/persistence/player/player_persistence.dart';
import '../states/persistence/settings/settings_persistence.dart';
import '../states/player_progress.dart';
import '../states/settings.dart';
import '../styles/palette.dart';

class BasePage extends StatelessWidget {
  const BasePage({
    super.key,
    required this.playerProgressPersistence,
    required this.settingsPersistence,
    // required this.inAppPurchaseController,
//     required this.adsController,
    // required this.gamesServicesController,
  });

  final PlayerProgressPersistence playerProgressPersistence;

  final SettingsPersistence settingsPersistence;

  // final GamesServicesController? gamesServicesController;

  // final InAppPurchaseController? inAppPurchaseController;

  static final GoRouter _router = AppRouter().router;

//   final AdsController? adsController;

  @override
  Widget build(BuildContext context) {
    return AppLifecycleObserver(
      child: MultiProvider(
        providers: [
          ChangeNotifierProvider(
            create: (context) {
              var progress = PlayerProgress(playerProgressPersistence);
              progress.getLatestFromStore();
              return progress;
            },
          ),
          // Provider<GamesServicesController?>.value(
          //     value: gamesServicesController),
          // Provider<AdsController?>.value(value: adsController),
          // ChangeNotifierProvider<InAppPurchaseController?>.value(
          //     value: inAppPurchaseController),
          Provider<SettingsController>(
            lazy: false,
            create: (context) => SettingsController(
              persistence: settingsPersistence,
            )..loadStateFromPersistence(),
          ),
          ProxyProvider2<SettingsController, ValueNotifier<AppLifecycleState>,
              AudioController>(
            // Ensures that the AudioController is created on startup,
            // and not "only when it's needed", as is default behavior.
            // This way, music starts immediately.
            lazy: false,
            create: (context) => AudioController()..initialize(),
            update: (context, settings, lifecycleNotifier, audio) {
              if (audio == null) throw ArgumentError.notNull();
              audio.attachSettings(settings);
              audio.attachLifecycleNotifier(lifecycleNotifier);
              return audio;
            },
            dispose: (context, audio) => audio.dispose(),
          ),
          Provider(
            create: (context) => Palette(),
          ),
        ],
        child: Builder(builder: (context) {
          final palette = context.watch<Palette>();

          return MaterialApp.router(
            title: 'Battle Master',
            theme: ThemeData.from(
              colorScheme: ColorScheme.fromSeed(
                seedColor: palette.ink,
                background: palette.bgGrey2,
              ),
            ),
            debugShowCheckedModeBanner: false,
            routeInformationProvider: _router.routeInformationProvider,
            routeInformationParser: _router.routeInformationParser,
            routerDelegate: _router.routerDelegate,
          );
        }),
      ),
    );

    // @override
    // Widget build(BuildContext context) {
    //   return MaterialApp.router(
    //       title: 'Battle Master',
    //       theme: ThemeData(
    //         colorScheme: ColorScheme.fromSeed(
    //             brightness: Brightness.dark, seedColor: Colors.red),
    //         useMaterial3: true,
    //       ),
    //       routerConfig: AppRouter().router,
    //       debugShowCheckedModeBanner: false);
    // }
  }
}






// class MyApp extends StatelessWidget {
//   



//   @override
//   Widget build(BuildContext context) {
//     return AppLifecycleObserver(
//       child: MultiProvider(
//         providers: [
//           ChangeNotifierProvider(
//             create: (context) {
//               var progress = PlayerProgress(playerProgressPersistence);
//               progress.getLatestFromStore();
//               return progress;
//             },
//           ),
//           Provider<GamesServicesController?>.value(
//               value: gamesServicesController),
//           Provider<AdsController?>.value(value: adsController),
//           ChangeNotifierProvider<InAppPurchaseController?>.value(
//               value: inAppPurchaseController),
//           Provider<SettingsController>(
//             lazy: false,
//             create: (context) => SettingsController(
//               persistence: settingsPersistence,
//             )..loadStateFromPersistence(),
//           ),
//           ProxyProvider2<SettingsController, ValueNotifier<AppLifecycleState>,
//               AudioController>(
//             // Ensures that the AudioController is created on startup,
//             // and not "only when it's needed", as is default behavior.
//             // This way, music starts immediately.
//             lazy: false,
//             create: (context) => AudioController()..initialize(),
//             update: (context, settings, lifecycleNotifier, audio) {
//               if (audio == null) throw ArgumentError.notNull();
//               audio.attachSettings(settings);
//               audio.attachLifecycleNotifier(lifecycleNotifier);
//               return audio;
//             },
//             dispose: (context, audio) => audio.dispose(),
//           ),
//           Provider(
//             create: (context) => Palette(),
//           ),
//         ],
//         child: Builder(builder: (context) {
//           final palette = context.watch<Palette>();

//           return MaterialApp.router(
//             title: 'Flutter Demo',
//             theme: ThemeData.from(
//               colorScheme: ColorScheme.fromSeed(
//                 seedColor: palette.darkPen,
//                 background: palette.backgroundMain,
//               ),
//               textTheme: TextTheme(
//                 bodyText2: TextStyle(
//                   color: palette.ink,
//                 ),
//               ),
//             ),
//             routeInformationProvider: _router.routeInformationProvider,
//             routeInformationParser: _router.routeInformationParser,
//             routerDelegate: _router.routerDelegate,
//             scaffoldMessengerKey: scaffoldMessengerKey,
//           );
//         }),
//       ),
//     );


//   }