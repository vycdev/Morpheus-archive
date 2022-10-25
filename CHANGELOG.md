# [1.6.0](https://github.com/vycdev/Morpheus/compare/v1.5.0...v1.6.0) (2022-10-25)


### Bug Fixes

* if the total xp in the guild was 0 the function would return without giving xp to the user ([a15fde7](https://github.com/vycdev/Morpheus/commit/a15fde70d689a2cce3f9304843743c85d6149d7f))


### Features

* a bunch of functions to compute levels and xp and get levels from the database ([86c8e95](https://github.com/vycdev/Morpheus/commit/86c8e95a3f006f0f439491c48edfbc80f78ef8a7))
* age command ([952c0fe](https://github.com/vycdev/Morpheus/commit/952c0fed3875f2903fd1bec5e5d2956df7458b66))
* auto xp claiming ([f5cc543](https://github.com/vycdev/Morpheus/commit/f5cc543999b6b1f32f6d4b29af86bb76beae6330))
* Basic level ups YAAAY ([865a96c](https://github.com/vycdev/Morpheus/commit/865a96c5b6ac8fa1b09a37e88ff0cfe720bc6ba5))
* guilds initialization in the database ([b00fdf9](https://github.com/vycdev/Morpheus/commit/b00fdf93aa80bc7858f8eb87ac4ae51ba410be20))
* init users in the database ([28d66ac](https://github.com/vycdev/Morpheus/commit/28d66acbae2a4ef0da3b2064844d1b291b182343))
* init users xp in the database ([138a606](https://github.com/vycdev/Morpheus/commit/138a606dc932b89919f45b17fd41513ff2ca0614))
* init xpdays into the database ([0a5440a](https://github.com/vycdev/Morpheus/commit/0a5440ad61b42b779cfda6eafd3675a9e799a080))
* scream command ([275e223](https://github.com/vycdev/Morpheus/commit/275e223d718769690fe0e89123723e9db3a1c786))
* servertime command ([0af12fb](https://github.com/vycdev/Morpheus/commit/0af12fbece39f2541fc46272d724d5815061e6d3))

# [1.5.0](https://github.com/vycdev/Morpheus/compare/v1.4.0...v1.5.0) (2022-10-08)


### Bug Fixes

* the context builder making the content be the prefix if there was nothing that followed the prefix of the command ([e3f520d](https://github.com/vycdev/Morpheus/commit/e3f520d22f60ba87720e5ca48dfd1933cab7f063))
* the prefix matcher was totaly broken ([661cae9](https://github.com/vycdev/Morpheus/commit/661cae9a478612a97ba35ef3948a93e58045e52d))


### Features

* changing the style of the log handler code showing in discord ([9a28dec](https://github.com/vycdev/Morpheus/commit/9a28dec21d12dcf64eb590bac25d4807587b07bf))
* copy pasta command that pulls copy pastas from reddit ([f37f6a2](https://github.com/vycdev/Morpheus/commit/f37f6a2a9ce9a6df2d73f3eff40de4aac382265d))
* joke command that pulls jokes from reddit ([f0c7f30](https://github.com/vycdev/Morpheus/commit/f0c7f308fa9a9d87e7131e5ea92f068eff60e564))
* the say command throwing an error if the user doesnt provide any arguments ([68acc6c](https://github.com/vycdev/Morpheus/commit/68acc6c4683be11b51fe56c8868cce78c802ccde))
* until xmas command added ([d1684be](https://github.com/vycdev/Morpheus/commit/d1684be4af1f6d4ef7417a631b059ee8bbbde9fb))

# [1.4.0](https://github.com/vycdev/Morpheus/compare/v1.3.0...v1.4.0) (2022-10-08)


### Bug Fixes

* Added a way to handle edge cases when outdated intreactions are used to avoid interaction failed error. ([5d95739](https://github.com/vycdev/Morpheus/commit/5d957396e0d46352f85463fdad45c6f6f6b8048b))


### Features

* command cooldowns are now working ([8c7ff39](https://github.com/vycdev/Morpheus/commit/8c7ff39c8172efebf0485cb061296cae847bf3e1))

# [1.3.0](https://github.com/vycdev/Morpheus/compare/v1.2.0...v1.3.0) (2022-10-03)


### Bug Fixes

* command matching, this couldve created some problems if I had multiple matchers in one command ([e37ee0d](https://github.com/vycdev/Morpheus/commit/e37ee0d4227ee26a25fc503a3f1644ea85e58361))


### Features

* added help command in the style of the fmbot help command featuring a select menu for categories and individual commands that is automatically generated ([d27fed6](https://github.com/vycdev/Morpheus/commit/d27fed6adb5fb0f39fd1054239b44ac007a4c493))

# [1.2.0](https://github.com/vycdev/Morpheus/compare/v1.1.0...v1.2.0) (2022-10-01)


### Features

* wrote an error handler and changed the way errors are handled for text commands ([6096c8f](https://github.com/vycdev/Morpheus/commit/6096c8fe1bae362e8028283f086e85d21de5010f))

# [1.1.0](https://github.com/vycdev/Morpheus/compare/v1.0.0...v1.1.0) (2022-03-27)


### Bug Fixes

* all intents ([893715c](https://github.com/vycdev/Morpheus/commit/893715cb05448478d51e32744a8aa2fb6b365ab2))
* context builder content was not the right string ([d717255](https://github.com/vycdev/Morpheus/commit/d717255d9a208471af269c46c3e17ee001564a9f))
* removed log return and changed what it was sending. ([a289b8f](https://github.com/vycdev/Morpheus/commit/a289b8f9b9309bcf4ef290ac98d6e05d6937499e))


### Features

* added a human matcher function hopefully it works ([dfb24de](https://github.com/vycdev/Morpheus/commit/dfb24deabc6827456ba3816f8fbd23541d33f2df))
* added prefix to guilds for commands ([e4138ae](https://github.com/vycdev/Morpheus/commit/e4138aee4fddb1539ce71c586c24e7eb11317b2e))
* basic prisma schema ([e74090a](https://github.com/vycdev/Morpheus/commit/e74090a04b3fb5677ec2605988e954ebf078b195))
* first text command, havent tested yet ([255b19c](https://github.com/vycdev/Morpheus/commit/255b19cf539ff2bc214b920534246328b798eb33))
* made a simple prefix matcher ([1fbdc48](https://github.com/vycdev/Morpheus/commit/1fbdc48f22c355a3a1b5bc9af2bb914e6f96cfed))
* say command ([a559ce4](https://github.com/vycdev/Morpheus/commit/a559ce444a40864fc1ea9520fdbb720b02ff552c))
* simple context builder ([101abf2](https://github.com/vycdev/Morpheus/commit/101abf2af42ea54835c0f34d3daa09d0604d9b03))
* simple log handler ([fd0fd29](https://github.com/vycdev/Morpheus/commit/fd0fd293871342c42be6313e5b1d026cd077630a))
* try commands function ([c188b5a](https://github.com/vycdev/Morpheus/commit/c188b5ad2eb95ad4f5a76cb50b52c1cb430844f5))

# 1.0.0 (2022-01-06)


### Bug Fixes

* default env with bad comments syntax ([9ac3852](https://github.com/vycdev/Morpheus/commit/9ac3852ceb102403e471a7c3042f248d45a152a4))
* small thing with linting that was outdated and created errors ([624f035](https://github.com/vycdev/Morpheus/commit/624f0355ad3d9e4f0673e4853fc7467d757a3ec6))


### Features

* basic bot connecting and activity setup ([845b611](https://github.com/vycdev/Morpheus/commit/845b61183dd776b4148fff837ac4f02dde2a2b3e))
* basic slash commands support ([3ebc48e](https://github.com/vycdev/Morpheus/commit/3ebc48e1b17d3ea444125906a252f9e9b1fbfc2b))
