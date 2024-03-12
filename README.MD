
Battle Master
==================

Fight to become the very best!


Battle
-----------
- Player team add damage left to right, using the left type for effectiveness
- With multiple player teams, each of their damage is added flatly to each other
- Pokemon from the Pokedex add their damage at the end flatly?
- Two attack buttons, Physical and Special to choose between
- Opponents pokemon gets stat boosts depending on player team size
- Player can equip pokemon abilities?
- Speed increases crit chance?
- Hp is added flatly from team
- Defeating a wild pokemon adds it at level 1 to the pokedex



Train
-------------
- Pokemon team gains exp during a run
- Pokemon reset to the state captured in the pokedex after a run ends
- Rare candy let a trainer permenantly level up a pokemon
- Infinite Evs during a run
- Infinite Ivs for permenant power up
- Only shiny pokemon are carried over between runs, otherwise a player must catch the pokemon first


Master
-----------------
- Pokemon caught are stored in the pokedex for permenant progress between runs
- Challenge runs are available and completing them earns multiplier bonuses
- When a pokemon reaches level 100 in the pokedex, it can prestige
- Prestige resets to level 1 but keeps the stats. It also rolls a 35% of it becoming shiny
- Shiny pokemon get a 50% boost to stat gains?
- Prestige unlocks the pokemons ability for the player to equip? Only unlocked after reaching region 2?
- Prestige can happen during a run, but if a pokemon is prestiged in the dex it is unlocked from the start
- Game Corner lets you roll for items during a run in exchange for badges

#### Features
- [ ] 6 member team max (additional team for each region?)
- [ ] Pc to swap team on the fly
- [ ] Type effectiveness
- [ ] Multiple regions
- [ ] Pokedex
- [ ] Achievements
- [ ] Quests/Challenges
- [ ] Catch bonus for mon during individual runs?
- [ ] No limit to EVs during a run?
- [ ] Healing???
- [ ] Pokemon stats are implemented
    - Speed: Increases attack per turn
    - Attack: Damage given per turn
    - Hp: Health
    - Defense: Damage reduction
- [ ] Critical hits
- [ ] Party Added Per Region
- [ ] Pokemon at front is targeted?
- [ ] National Dex
- [ ] Level 100 Max
- [ ] Moves? (phys / special split)
- [ ] At 100 prestige levels, unlock a permenant passive ability
- [ ] Evolution at normal levels?
- [ ] Pokemon can faint, and need to be re-caught?
- [ ] IVs for permenant upgrades to a pokemon?
- [ ] Shiny mechanics?
- [ ] Make money from battling, can buy pokeballs to catch with
- [ ] Map/Travel System?
- [ ] Perm Evolution? 
- [ ] Badge Mechanics (With Level up?)
- [ ] Reset progress at pokelab
- [ ] Shadow pokemon?
- [ ] Status effects?
- [ ] Starter choice
- [ ] New Journey (Prestige)
- [ ] Inverse Challenge (unlockable reverse path through region)
    - Inverse Challenge gets harder the more badges the player has spent in Game Corner?


### Bugs
- [ ] Able to move last pokemon from team to pc
- [ ] Badges arent showing on trainer card
- [x] Query one region at a time rather than all
- [ ] Can add a pokemon to the team already there
- [ ] Single entries in region list are off center
- [x] Location whitelist isnt working
- [ ] Check team/pc for starter choice rather than pokedex

### Running The Game (Dev)


#### Todo
- [ ] Implement giving Ivs/Rare Candies to pokedex pokemon
- [ ] Logic for displaying pokemons stats during a run? From pc vs from pokedex browser
- [ ] Logic for ending a run at the professors lab
- [x] Dialogue directing player to professors lab when they have no pokemon
- [ ] Add items to playerstore
- [x] Add a battle component
- [ ] Implement rival battle after prof lab
- [ ] Add Game Corner view
- [ ] Handle evolution during a run
- [ ] Implement exp logic for pokemon during runs
- [ ] Add shiny boolean to pokemon object, handle displaying shiny sprites
- [x] Split the stores into playerInfo and gameInfo stores
- [x] Dynamically center the pokemon on the team during battle
- [ ] give maushold to god
- [ ] Rival starter logic
- [ ] Implement critical hits
- [ ] Prestige a pokemon during a run?
- [ ] Color/Bold pokemon team boxes based on damage
- [ ] Buff opponents stats based on player
- [ ] Add a popup to confirm when running from a battle
- [ ] Add logic to handle multiple pokemon in opponents team
- [ ] Add battle victory logic
- [ ] Add logic to color the healthbar green/yellow/red and size based on current health



### Resources
ChatGpt
PokeApi
Vue