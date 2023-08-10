import 'package:battle_master/constants/animation_type.dart';
import 'package:flutter/material.dart';

//TODO: Implement animation class
class AnimationWidget extends StatelessWidget {
  AnimationWidget(
      {super.key, required this.animationType, required this.child});
  final AnimationType animationType;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    switch (animationType) {
      default:
        return child;
    }
  }
}
