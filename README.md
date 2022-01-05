# Morpheus

An all purpose discord bot for everyone.

[Invite link](https://discord.com/api/oauth2/authorize?client_id=927533069211172885&permissions=8&scope=bot)

# About

This bot was created to complement the existance of [Codify](https://github.com/CCodeCommunity/Codify) and as a rewrite of it, since that the code of Codify is already getting old and messy I hope that this will be a more general purpose bot that is not focused on only one community. Of course I will not abandon Codify entirely, since it's easy for me to add new features, but contributing to it, for other people, has proven to be rather difficult because of the setup, which made some people give up on doing it, Morpheus, hopefully will be a lot easier to set up and contribute to. I will also try to bring all of the functionality of Codify to Morpheus and much more.

## Contributing
----
### General
Please follow the [angular commit message conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format), as semantic release is set to use that.

Please use `yarn`

### Scripts

```
    "dev": "nodemon -r dotenv/config",
    "build": "tsc",
    "start": "node ./dist/index.js",
    "lint": "eslint **/*.ts",
    "lint:fix": "eslint **/*.ts --fix",
    "migrate": "prisma migrate dev --preview-feature && prisma generate",
    "deploy": "prisma migrate deploy --preview-feature",
    "studio": "prisma studio"
```

- `dev`: This starts the bot. Used in development.
- `build`: This will build the files. There is no need to build the files in development unless you want to test the build system.
- `start`: This will start the files that have been built using the `build` command.
- `lint`: This will show you linting warnings and errors in your code.
- `lint:fix`: This will try to fix the linting errors and warning but be careful because it could introduce changes that break the code, use with caution.
- `migrate`: Used after making changes to the prisma schema to generate new migrations.
- `deploy`: This will deploy the migrations to the database.
- `studio`: If you want to have an easy way to access the data in the database and make changes this will open a browser window with everything you need.

### Setting up the repository

1. Create a discord bot in the discord developer portal, you can use this guide [from discord.js](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
2. Make sure you have postgresql installed on your computer.
3. In `psql` create a new user using this command: `CREATE USER morpheus WITH PASSWORD 'password' CREATEDB;`
4. In `psql` create a new database using this command: `CREATE DATABASE morpheus OWNER morpheus;`
5. In the root directory of the repository, create a new file called `.env` and copy the contents of `default.env` in it.
6. Add the bot token from the bot you made earlier to your `.env` file.
7. Run `yarn` to install the packages, make sure you have yarn installed.
8. Run `yarn deploy` to deploy the migrations to your database and make it up to date.
9. You are now done, you can run `yarn dev` to start your bot. You have more information about the scripts, above.




