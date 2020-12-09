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
1. The game is not predictable or boring, but neither does it punish the player arbitrarily. The player is **rewarded for skill** and for paying close attention to the **dependable rules and physics** of the game.
1. The design prioritises consistency and attractiveness over complexity/realism.
1. The sound of the game is not just a repetitive feature that becomes irritating. All sounds and music must contribute positively to the gameplay and experience of the game.
1. The game does not emphasise changes in surface-level appearance that only serve to distract the player from the game itself. Players don't enjoy being needlessly distracted by features which are irrelevant to the gameplay.

### Evaluation

I can personally vouch that my own experience playing the game matches the description in Aim 1. The unpredictable aspects of the game such as platform/coin placements keep the player on their toes, but with the ability to triple-jump, the player is well-equipped to deal with challenges and earn more coins if they are skilled enough, so I also consider Aim 2 to have been achieved.

The design priorities were also borne out into the game. I put a good deal of work into making the background scenery attractive, to great effect I think, which also contributed to the Emotional Experience I initially intended.

To achieve Aim 4, I implemented a "song selector" to pick from 4 possible background tracks to stop the music feeling too repetitive. The two sound effects I used were for jumping and coin-collecting, which are both key gameplay aspects, so the player's attention is not diverted from the gameplay. Jumping only has a 1 in 4 chance of triggering a sound effect, and when it does, it is a random jump sound from 4 possible sounds, so it is a more subtle feature that won't become too irritating. The coin-collection sound effect takes place for every coin collected, because this is the central activity of the game and I wanted to audibly acknowledge this special event. It was for this same reason that I broke with simplicity to add the small, spinning, collected coin animation.

In summary, I am very happy with the game and it's clear to me that writing a GDD before starting work really helped to guide my efforts towards a coherent idea of the game I wanted to make. One downfall of the game that arose from prioritising a pleasant and relaxing experience is that the potential for advancement and mastery is quite limited. Having a 60-second timer means that even the best possible player can't get a higher score than the number of coins that the game makes available during those 60 seconds. But all in all, I achieved my aims and I'm very pleased with the final product.

## Built With

- JavaScript
- [PhaserJS](https://phaser.io/)
- [npm](https://www.npmjs.com/) with [webpack](https://webpack.js.org/)
- Linted with [ESLint](https://eslint.org/)
- Tested with [Jest](https://jestjs.io/)

### Local Setup

To set this project up locally, follow these simple instructions:

1. Open a Terminal and navigate to the location in your system where you would like to download the project. **New to Terminal? [Learn here](https://www.freecodecamp.org/news/conquering-the-command-line-f85f5e46c07c/).**

2. Enter the following line of code to clone this repository:

`git clone git@github.com:epinczinger/Robbin-Hoodz.git`

3. Now that the repository has been cloned, navigate inside it using `cd Robbin-Hoodz`.

4. The project's dependencies are managed by npm. To install them, enter the following line of code in the Terminal.

`npm install`

5. Congratulations! All necessary files have been installed. To view the website, just open 'dist/index.html' in a browser of your choosing.

## Authors

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
