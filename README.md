# Robbin' Hoodz

Robbin' Hoodz is an "infinite runner" game made with PhaserJS.

In it, you play as old-school renegade **Robin Hood** as he goes on another acrobatic rampage of vigilante wealth re-distribution.

![Gameplay Footage](./gameplay.gif)

The aim of the game is to collect as many gold pieces as possible during sixty seconds.
All gold pieces can be found on platforms which you can jump up to by hitting the spacebar - Robin can jump once, twice or thrice consecutively.

More gold pieces are found on the highest platforms, so the player is encouraged to spend as much time as possible running and jumping on the high-up platforms and is penalised in lost earnings if they fall to the ground.

## Live Demo

What are you waiting for?!

**Play the Live Demo [here](https://keen-leakey-c08599.netlify.app/)!**

## Game Development

> **_Explain what your initial objectives for the project were (at the end of the day 2) and which ones you did (or did not) achieve and why_**

### Initial Aims

In the Game Design Document I created on the second day of this 5-day project, I laid out an "Emotional Experience" which described how I would like the player to feel. To paraphrase from that section and others from the same document:

1. The player feels **engaged**, consistently **interested**, but **never stressed**.
2. The game is not predictable or boring, but neither does it punish the player arbitrarily. The player is **rewarded for skill** and for paying close attention to the **dependable rules and physics** of the game.
3. The design prioritises consistency and attractiveness over complexity/realism.
4. The sound of the game is not just a repetitive feature that becomes irritating. All sounds and music must contribute positively to the gameplay and experience of the game.
5. The game does not emphasise changes in surface-level appearance that only serve to distract the player from the game itself. Players don't enjoy being needlessly distracted by features which are irrelevant to the gameplay.

___

### Evaluation

I can personally vouch that my own experience playing the game matches the description in Aim 1. The unpredictable aspects of the game such as platform/coin placements keep the player on their toes, but with the ability to triple-jump, the player is well-equipped to deal with challenges and earn more coins if they are skilled enough, so I also consider Aim 2 to have been achieved.

The design priorities were also borne out into the game. I put a good deal of work into making the background scenery attractive, to great effect I think, which also contributed to the Emotional Experience I initially intended.

To achieve Aim 4, I implemented a "song selector" to pick from 4 possible background tracks to stop the music feeling too repetitive. The two sound effects I used were for jumping and coin-collecting, which are both key gameplay aspects, so the player's attention is not diverted from the gameplay. Jumping only has a 1 in 4 chance of triggering a sound effect, and when it does, it is a random jump sound from 4 possible sounds, so it is a more subtle feature that won't become too irritating. The coin-collection sound effect takes place for every coin collected, because this is the central activity of the game and I wanted to audibly acknowledge this special event. It was for this same reason that I broke with simplicity to add the small, spinning, collected coin animation.

___

### Game Design

I made some design choices in accordance with my aims for the project. One was the choice of keys used to perform certain actions in the game. Initially, the character jumped on a mouseclick, but **I felt that a spacebar would generally be easier**, especially for quick jumps. I also made sure that the gameOver view required input that was **different from the jump control**, so the user wouldn't be able to press the space bar again accidentally and do something unintended. The GameScene itself has only a single control, which again contributed towards the **simplicity of design** and **ease of use** that I wanted my game to have. With only a single button to press, almost anyone could play this game and enjoy it.

**I also deviated from my initial GDD on one aspect**: While I had originally envisioned a more complex score and jump system which entailed a ten-second timer at the end of which the player would lose a certain amount of gold, increasing each time, I decided to simplify the whole concept. I came to the conclusion that the most fun aspect of the game is simply jumping around, trying to land difficult jumps, making unlikely recoveries from falls and having fun the with the physics and unpredictable ups and downs of the game. I thought that the added complexity of the scoring would make it harder for new players to get into the game. So for this reason, I opted for a single 60-second timer, an unchanging number of jumps available and a 1-point-per-coin system so that players would easily get the hang of the game and feel comfortable.

As for the structure of the Phaser scenes, I kept them as simple as possible. The attitude I gained during the design period was that players are interested in the gameplay and the fun of playing the game, so most of my attention was put into the GameScene itself. Another element of randomness was added in the preLoaderScene, where a random frame of my game's main character spriteSheet is displayed while the assets are loaded. Aside from that, all I wanted for the Interface scenes was that they present the player with options and information in a simple fashion. Given more time, I might have worked on these more, but with the time pressure as it was, I'm glad that I prioritised the GameScene itself.

___

In summary, I am very happy with the game and it's clear to me that writing a GDD before starting work really helped to guide my efforts towards a coherent idea of the game I wanted to make. One downfall of the game that arose from prioritising a pleasant and relaxing experience is that the potential for advancement and mastery is quite limited. Having a 60-second timer means that even the best possible player can't get a higher score than the number of coins that the game makes available during those 60 seconds. But all in all, I achieved my aims and I'm very pleased with the final product.

## Built With

- JavaScript
- [PhaserJS](https://phaser.io/)
- [npm](https://www.npmjs.com/) with [webpack](https://webpack.js.org/)
- Linted with [ESLint](https://eslint.org/)
- Tested with [Jest](https://jestjs.io/)

### Local Setup

## Prerequisites

Since the game's dependencies are managed by [npm](https://www.npmjs.com/), you must have **node.js** installed on your computer before following these set-up instructions. If you don't yet have node.js installed, you can choose a download method [here](https://nodejs.org/en/download/).

## Setup Instructions

To set this project up locally, follow these simple instructions:

1. Open a Terminal and navigate to the location in your system where you would like to download the project. **New to Terminal? [Learn here](https://www.freecodecamp.org/news/conquering-the-command-line-f85f5e46c07c/).**

2. Enter the following line of code to clone this repository:

`git clone git@github.com:Joseph-Burke/Robbin-Hoodz.git`

3. Now that the repository has been cloned, navigate inside it using `cd Robbin-Hoodz`.

4. The project's dependencies are managed by npm. The details of this project's dependencies can be found in `package.json` To install them, enter the following line of code in the Terminal.

`npm install`

5. Congratulations! All necessary files have been installed. To view the website, you can use the project's preconfigured npm script. Simply enter: `npm run start`. (This will bundle all relevant code into a single `build/project.bundle.js` file and then set up a local server to run the index.html file).

## Testing

This project's tests were created with [Jest](https://jestjs.io/). Once the project's dependencies have been installed (see Setup Instructions above), Jest will be available. **However**, the Jest Command Line Interface is only available if Jest is intalled globally:

1. Run `npm install jest --global` to make Jest globally available.

Once again, the project includes a handy script to run those tests for you:

2. Now you can run `npm run test` or simply `jest` to run the project's tests.

## Author

👤 **Joe Burke**

My name is Joe, and I'm a full-stack developer. 

Click on the links below to find out more about me. Please feel free to get in touch with any job opportunities, feedback on Robbin' Hoodz or just to say hello!

- Github: [@Joseph-Burke](https://github.com/Joseph-Burke)
- Twitter: [@__joeburke](https://twitter.com/__joeburke)
- Linkedin: [Joseph Burke](https://www.linkedin.com/in/--joeburke/)

## 🤝 Contributing

I would be honoured if anybody would like to contribute to this project in any way. If you have any feedback, go ahead and drop an issue on the [issues page](issues/) to get the conversation going.

## Show your support

If you've read this far, thank you. It's a great pleasure to share this project with you. If you've liked what you've seen and want to show it, give the project a ⭐️ at the top of the repository! 🙏 

If you _really_ like the project, why not follow me on GitHub to see what I get up to next? 🙂

## Acknowledgments

- This game was built as the Capstone project of Microverse's JavaScript module. Microverse is a remote school for web developers. Learn more about their Web Development course [here](https://www.microverse.org/).
- As always, massive thanks go to my team members for their support throughout the course: [Brandon](https://github.com/defoebrand), [Amita](https://github.com/Amita-Roy/), [Oyeleke](https://github.com/Haywhizzz), [Sercan](https://github.com/eypsrcnuygr) and [Moin](https://github.com/moinkhanif), as well as my JavaScript coding partner, [Esteban](https://github.com/epinczinger/). If you've enjoyed my work, be sure to check theirs out too!
- The game's background music is taken from Beedle The Bard's YouTube channel, where he posts medieval remixes of modern songs. The four selected tracks were originally written by Big L, Outkast, The Notorious B.I.G. and 2pac.

## 📝 License

This project is [MIT](lic.url) licensed.
