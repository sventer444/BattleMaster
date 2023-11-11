import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../components/app_bar.dart';
import '../components/bottom_nav.dart';

class GlobalMiddleware extends GetMiddleware {
  //final authController = Get.find<AuthController>();

  // @override
  // RouteSettings redirect(String route) {
  //   return authController.authenticated || route == '/login'
  //       ? null
  //       : RouteSettings(name: '/login');
  // }

  AppBar topBar = appBar;
  BottomNavigationBar bottomNav = bottomNavBar;

  @override
  GetPage? onPageCalled(GetPage? page) {
    if (page == null) {
      // return GetPage(
      //   name: 'scaffold',
      //   page: () => Scaffold(
      //     appBar: topBar,
      //     body: const Text(''),
      //     bottomNavigationBar: bottomNav,
      //   ),
      // );
      return null;
    } else {
      return GetPage(
        name: page.name,
        page: () => Scaffold(
          appBar: topBar,
          body: page.page(),
          bottomNavigationBar: bottomNav,
        ),
      );
    }

    // return authController.username != null
    //     ? page.copyWith(parameter: {'user': authController.username})
    //     : page;
  }

  // @override
  // List<Bindings> onBindingsStart(List<Bindings> bindings) {
  //   // This function will be called right before the Bindings are initialize,
  //   // then bindings is null
  //   bindings = [OtherBinding()];
  //   return bindings;
  // }

  // @override
  // GetPageBuilder onPageBuildStart(GetPageBuilder page) {
  //   print('Bindings of ${page.toString()} are ready');
  //   return page;
  // }

  // @override
  // Widget onPageBuilt(Widget page) {
  //   print('Widget ${page.toStringShort()} will be showed');
  //   return page;
  // }

  // @override
  // void onPageDispose() {
  //   print('PageDisposed');
  // }
}
