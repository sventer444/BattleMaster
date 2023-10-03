import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class BottomNav {
  late BuildContext appContext;

  getNav(BuildContext context) {
    appContext = context;
    return BottomNavigationBar(
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.map), label: 'Map'),
        BottomNavigationBarItem(icon: Icon(Icons.computer), label: 'PC'),
      ],
      onTap: (index) => {navigate(index, appContext)},
    );
  }
}

void navigate(int navigationIndex, BuildContext context) {
  context.go(parsedRoute(navigationIndex));
}

String parsedRoute(int index) {
  switch (index) {
    case 0:
      return '/map';
    case 1:
      return '/pc';
    default:
      return '/';
  }
}
