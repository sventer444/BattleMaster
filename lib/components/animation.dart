import 'package:battle_master/constants/animation_type.dart';
import 'package:flutter/material.dart';

import '../styles/delayed_appear.dart';

//TODO: Implement animation class
class AnimationWidget extends StatelessWidget {
  AnimationWidget(
      {super.key, required this.animationType, required this.child});
  final AnimationType animationType;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    switch (animationType) {
      case AnimationType.wildEncounter:
        return DelayedAppear(
          ms: ScreenDelays.first,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: child,
          ),
        );
      default:
        return child;
    }
  }
}
