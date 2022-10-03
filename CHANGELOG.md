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
