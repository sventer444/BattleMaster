import 'package:flutter/material.dart';

// import '../controllers/game_services.dart';

class BasePage extends StatelessWidget {
  const BasePage({
    super.key,
    // required this.playerProgressPersistence,
    // required this.settingsPersistence,
    // required this.inAppPurchaseController,
//     required this.adsController,
    // required this.gamesServicesController,
  });

  // final PlayerProgressPersistence playerProgressPersistence;

  // final SettingsPersistence settingsPersistence;

  // final GamesServicesController? gamesServicesController;

  // final InAppPurchaseController? inAppPurchaseController;

  // static final GoRouter _router = AppRouter().router;

//   final AdsController? adsController;
  //TODO: Implment homepage with roaming pokemon from pc
  @override
  Widget build(BuildContext context) {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [Text('Home Page')],
        )
      ],
    );
    // AppLifecycleObserver(
    //   child: MultiProvider(
    //     providers: [
    //       ChangeNotifierProvider(
    //         create: (context) {
    //           var progress = PlayerProgress(playerProgressPersistence);
    //           progress.getLatestFromStore();
    //           return progress;
    //         },
    //       ),
    //       // Provider<GamesServicesController?>.value(
    //       //     value: gamesServicesController),
    //       // Provider<AdsController?>.value(value: adsController),
    //       // ChangeNotifierProvider<InAppPurchaseController?>.value(
    //       //     value: inAppPurchaseController),
    //       Provider<SettingsController>(
    //         lazy: false,
    //         create: (context) => SettingsController(
    //           persistence: settingsPersistence,
    //         )..loadStateFromPersistence(),
    //       ),
    //       ProxyProvider2<SettingsController, ValueNotifier<AppLifecycleState>,
    //           AudioController>(
    //         // Ensures that the AudioController is created on startup,
    //         // and not "only when it's needed", as is default behavior.
    //         // This way, music starts immediately.
    //         lazy: false,
    //         create: (context) => AudioController()..initialize(),
    //         update: (context, settings, lifecycleNotifier, audio) {
    //           if (audio == null) throw ArgumentError.notNull();
    //           audio.attachSettings(settings);
    //           audio.attachLifecycleNotifier(lifecycleNotifier);
    //           return audio;
    //         },
    //         dispose: (context, audio) => audio.dispose(),
    //       ),
    //     ],
    //     child:

    //   return   Builder(builder: (context) {
    //   return MaterialApp.router(
    //     title: 'Battle Master',
    //     theme: ThemeData.from(
    //       colorScheme: ColorScheme.fromSeed(
    //         seedColor: Palette.ink,
    //         background: Palette.bgGrey2,
    //       ),
    //     ),
    //     debugShowCheckedModeBanner: false,
    //     routeInformationProvider: _router.routeInformationProvider,
    //     routeInformationParser: _router.routeInformationParser,
    //     routerDelegate: _router.routerDelegate,
    //   );
    // });
    // ),
    // );

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
