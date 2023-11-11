import 'package:battle_master/components/base.dart';
import 'package:flutter/material.dart';
import 'package:battle_master/components/bottom_nav.dart';

class GameState extends State<BasePage> {
  List<int> _currentPlayerDex = List.empty(growable: true);

  addPokemon(int dexNum) {
    print(dexNum);
    if (!_currentPlayerDex.contains(dexNum)) {
      _currentPlayerDex.add(dexNum);
    }
    var numCaptured = _currentPlayerDex.length;
    print('Currently caught \'$numCaptured\' pokemon');
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.

    return Scaffold(
        appBar: AppBar(),
        body: SafeArea(child: widget.child),
        bottomNavigationBar: BottomNav().getNav(context));
  }
}
