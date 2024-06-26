import 'package:battle_master/constants/router.dart';
import 'package:battle_master/controllers/game.dart';
import 'package:battle_master/controllers/player.dart';
import 'package:battle_master/states/persistence/player/memory_player_persistence.dart';
import 'package:battle_master/states/persistence/player/player_persistence.dart';
import 'package:battle_master/styles/palette.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';

// import 'package:firebase_core/firebase_core.dart';
// import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:logging/logging.dart';
// import 'package:google_mobile_ads/google_mobile_ads.dart';
// import 'states/persistence/player/local_storage_player.dart';
// import 'states/persistence/settings/local_storage_settings.dart';

// Future<void> main() async {
// // FirebaseCrashlytics? crashlytics;
// //   if (!kIsWeb && (Platform.isIOS || Platform.isAndroid)) {
// //     try {
// //       WidgetsFlutterBinding.ensureInitialized();
// //       await Firebase.initializeApp(
// //         options: DefaultFirebaseOptions.currentPlatform,
// //       );
// //       crashlytics = FirebaseCrashlytics.instance;
// //     } catch (e) {
// //       debugPrint("Firebase couldn't be initialized: $e");
// //     }
// //   }

// //   await guardWithCrashlytics(
// //     guardedMain,
// //     crashlytics: crashlytics,
// //   );

//   guardedMain();
// }

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  Logger log = Logger('main.dart');

  log.info('Full Screen');
  SystemChrome.setEnabledSystemUIMode(
    SystemUiMode.edgeToEdge,
  );
  PlayerProgressPersistence playerProg = MemoryOnlyPlayerProgressPersistence();
  Get.put(PlayerController(playerProg));
  Get.put(GameController());

//   AdsController? adsController;
//   if (!kIsWeb && (Platform.isIOS || Platform.isAndroid)) {
//     /// Prepare the google_mobile_ads plugin so that the first ad loads
//     /// faster. This can be done later or with a delay if startup
//     /// experience suffers.
//     adsController = AdsController(MobileAds.instance);
//     adsController.initialize();
//   }

  // GamesServicesController? gamesServicesController;
  // if (!kIsWeb && (Platform.isIOS || Platform.isAndroid)) {
  //   gamesServicesController = GamesServicesController()
  //     // Attempt to log the player in.
  //     ..initialize();
  // }

  // InAppPurchaseController? inAppPurchaseController;
  // if (!kIsWeb && (Platform.isIOS || Platform.isAndroid)) {
  //   inAppPurchaseController = InAppPurchaseController(InAppPurchase.instance)
  //     // Subscribing to [InAppPurchase.instance.purchaseStream] as soon
  //     // as possible in order not to miss any updates.
  //     ..subscribe();
  //   // Ask the store what the player has bought already.
  //   inAppPurchaseController.restorePurchases();
  // }

  runApp(GetMaterialApp(
    title: 'Battle Master',
    theme: ThemeData.from(
      colorScheme: ColorScheme.fromSeed(
        seedColor: Palette.ink,
        background: Palette.bgGrey2,
      ),
    ),
    debugShowCheckedModeBanner: false,
    initialRoute: '/',
    getPages: routes,
  )
      // ),
      );
}
