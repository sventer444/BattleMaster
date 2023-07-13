import 'package:battle_master/components/opponent.dart';
import 'package:flutter/material.dart';

import '../../responsive_window.dart';

class ProfessorsLab extends StatelessWidget {
  const ProfessorsLab(
      {super.key,
      required this.name,
      required this.choice1,
      required this.choice2,
      required this.choice3});

  final String name;

  final String choice1;

  final String choice2;

  final String choice3;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ResponsiveScreen(
        squarishMainArea: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Center(
                child: Text(name),
              ),
            ),
            const SizedBox(height: 50),
            Expanded(
              child: Center(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Choice 1
                    Opponent(name: choice1, onClick: () {}),
                    const SizedBox(
                      width: 15,
                    ),
                    // Choice 2
                    Opponent(name: choice2, onClick: () {}),
                    const SizedBox(
                      width: 15,
                    ),
                    // Choice 3
                    Opponent(name: choice3, onClick: () {}),
                    const SizedBox(
                      width: 15,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
