# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- postman test runner with test-cases

- user picture CDN

- improve custom router

## [1.0.4] - 2020-10-22
### Added
- added "upload photo" route
- added "delete photo" route

## [1.0.3] - 2020-10-03
### Added
- added "delete my user" route
- added "change password" route
- CHANGELOG added

### Changed
- improved authMiddleware, custom router
- added new methods to FireAuthHelper (deleteUser, changePassword)


## [1.0.2] - 2020-10-02
### Changed
- enhanced ctx.state model with FireAuth 'uid' (ctx.state.uid)
- fixed CORS middleware to handle incoming requests from different production sources

## [1.0.1] - 2020-10-01
### Added
- added CORS middleware to handle incoming requests from production in browsers

### Changed
- improved error check-up in "register" action

## [1.0.0] - 2020-08-10
### Added
- README page
- custom "router"
- custom "action runner"
- custom "input params validator" for actions
- FireAuth integration
- login / register actions with FireAuth/FIrestore system
- deploy app to FireFunctions
- helpers and utilities
- other
