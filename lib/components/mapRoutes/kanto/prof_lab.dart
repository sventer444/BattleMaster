import 'package:flutter/material.dart';

import '../../responsive_window.dart';

class ProfessorsLab extends StatelessWidget {
  const ProfessorsLab({super.key, required this.name});

  final String name;

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
            const Expanded(
              child: Center(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Choice 1
                    Text('Bulbasaur'),
                    SizedBox(
                      width: 15,
                    ),
                    // Choice 2
                    Text('Squirtle'),
                    SizedBox(
                      width: 15,
                    ),
                    // Choice 3
                    Text('Charmander'),
                    SizedBox(
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
