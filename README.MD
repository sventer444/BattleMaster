### Darkest Day Simulator

#### TODO



### Recc Strategy
1. Understand Copyright & Fair Use

Pokémon assets, such as sprites, are owned by The Pokémon Company. To use them:

    Fan Project Disclaimer: Clearly state that your project is unofficial and has no affiliation with The Pokémon Company.
    Non-commercial: Avoid monetizing your game to reduce the risk of legal action. Hosting the game for free with proper disclaimers often falls under fan-use tolerance.

2. Development Workflow
Choose a Game Framework/Engine

    Browser-Based: For accessibility on mobile and desktop.
        p5.js: Great for 2D games, especially if you’re already using it.
        Phaser.js: A powerful game framework for 2D games.
        Godot (HTML5 Export): If you want a structured engine for game logic.
    Consider Vue or React: If your game needs UI-heavy features like menus, modals, or dynamic interaction.

Asset Management

    Use resources like The Spriters Resource or other repositories with Pokémon sprites.
    Organize assets into folders (sprites, audio, maps) for clarity.
    Optimize asset sizes for better game performance.

3. Hosting Options

Here are free and effective hosting platforms for public access:
Static Hosting

    GitHub Pages:
        Perfect for simple HTML/CSS/JavaScript games.
        Guide to GitHub Pages.
    Vercel:
        Great for modern web apps, supports frameworks like Vue or React.
        Deploying to Vercel.
    Netlify:
        Similar to Vercel with global CDN support.

Cloud Hosting

    Azure Static Web Apps (Free tier available):
        Leverage Azure for hosting static assets with CI/CD.
        Azure Static Web Apps Guide.

Embedded Hosting

    Platforms like itch.io are designed for hosting and sharing games:
        Free and easy to use for indie projects.
        Players can find your game via the platform.

4. Example Deployment Workflow
Step 1: Prepare Your Code

    Structure your game files (index.html, script.js, assets/).
    Test locally using VS Code Live Server or a simple local server.

Step 2: Push to a Repository

    Initialize a Git repository and push your code to GitHub.

Step 3: Configure Hosting

    For GitHub Pages:
        Go to your repo settings > Pages > Enable Pages for the main or docs branch.
    For Vercel/Netlify:
        Link your GitHub repository and deploy with one click.

Step 4: Share Your Game

    Once deployed, you’ll receive a public URL to share with others.

5. Pokerogue-Like Advanced Features

To achieve features like Pokerogue (progress saving, larger maps):

    Use a backend to store player progress:
        Firebase: Real-time database for storing save data and user sessions.
        Supabase: Open-source alternative to Firebase.
    Implement responsive UI for mobile compatibility.