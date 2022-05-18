<div align="center">
<a href="https://sinkaroid.github.io/jalter"><img width="470" src="https://cdn.discordapp.com/attachments/952117487166705747/975121178857459795/jalter-gh.png" alt="jalter"></a>


<h4 align="center">A NodeJS wrapper for Discord Selfbot</h4>

<p align="center">
	<a href="https://github.com/sinkaroid/jalter/actions/workflows/docs.yml"><img src="https://github.com/sinkaroid/jalter/actions/workflows/docs.yml/badge.svg"></a>
    <a href="https://codeclimate.com/github/sinkaroid/jalter/maintainability"><img src="https://api.codeclimate.com/v1/badges/385abc152872873786f4/maintainability" /></a>
</p>

Jalter is lightweight libs for Discord selfbot, yet it handle the most of Discord endpoint needs.  
Automating user is against [Discord's Terms of Service](#automated-user-accounts-self-bots). This may result in termination

<a href="https://github.com/sinkaroid/jalter/blob/master/CONTRIBUTING.md">Contributing</a> •
<a href="https://sinkaroid.github.io/jalter">Documentation</a> •
<a href="https://github.com/sinkaroid/jalter/issues/new/choose">Report Issues</a>
</div>

---

- [Jalter](#)
  - [Features](#features)
  - [Installationn](#Installation)
    - [Prerequisites](#Prerequisites)
    - [Get user token](#User-token)
  - [Documentation](#Documentation)
    - [Quick example](#Example)
      - [Methods](#Methods)
      - [Non standard methods](#Non-standard-methods)
    - [Experimental](#Experimental)
      - [Make your own tests](#Experimental)
    - [Listen to events](#Listen-to-events) 
    - [Discord API docs](https://discord.com/developers/docs/intro)
  - [Limitations](#limitations)
  - [Pronunciation](#Pronunciation)
  - [Automated user accounts (self-bots)](#automated-user-accounts-self-bots)

## Features

- Covers the most endpoints.
- Non-standard stuff
- Respect the rate limit
- Documented and tested
- Easy to use: check your intelisense

## 🚀Installation
`yarn add jalter` / `npm i jalter`

## Prerequisites
<table>
	<td><b>NOTE:</b> NodeJS 14.x or higher</td>
</table>

## User token

<table>
	<td><b>How to get token?</b> Open <a href="http://prntscr.com/26epqp9">browser devtools</a> try to request something then check the network tab</td>
</table>

## Documentation
The documentation can be found [https://sinkaroid.github.io/jalter](https://sinkaroid.github.io/jalter)
### Example
```js
import Jalter from "jalter";

const jalter = new Jalter("wwgwgwgbadadaadpunopupupuu.X7hb5Q.-ngent00dinaLteer1213ngENt0dCcWW_1M");

jalter.getMe().then((res) => { console.log("me", res); });
```
CommonJS should do with `const Jalter = require("jalter")`  


### Methods
- [`Jalter.banUser(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#banUser)
    - Ban a member from a guild
- [`Jalter.createChannel(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#createChannel)
    - Create a new channel object for the guild
- [`Jalter.deleteMessage(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#deleteMessage)
    - Delete a message
- [`Jalter.getAuditLogs(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#getAuditLogs)
    - Returns an audit log object for the guild 
- [`Jalter.getChannels(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#getChannels)
    - Returns a list of guild channel objects. Does not include threads.
- [`Jalter.getMe(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#getMe)
    - Returns the user object of the requester's account.
- [`Jalter.getMessage(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#getMessage)
    - Returns the messages for a channel.
- [`Jalter.getRoles(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#getRoles)
    - Returns a list of role objects for the guild.
- [`Jalter.getUser(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#getUser)
    - Returns a user object for a given user ID.
- [`Jalter.joinGuild(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#joinGuild)
    - Join a guild
- [`Jalter.kickUser(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#kickUser)
    - Kick a member from a guild
- [`Jalter.leaveGuild(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#leaveGuild)
    - Leave a guild. Returns a 204 empty response on success.
- [`Jalter.replyMessage(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#replyMessage)
    - Reply to a message
- [`Jalter.typingMessage(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#typingMessage)
    - Trigger typing indicator

### Non standard methods
- [`Jalter.sendInterval(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#sendInterval)

#### Example send message or random message every X seconds

Example From array given:
```js
jalter.sendInterval("974918359500075041", 2000, ["hey", "ho", "let's go"])
    .then((res) => { console.log("sendInterval", res); });
```

If not specified will use random ["Hello World"](https://github.com/sinkaroid/jalter/blob/master/src/const.ts#L4):
```js
jalter.sendInterval("974918359500075041", 2000)
    .then((res) => { console.log("sendInterval", res); });
```

- [`Jalter.sendCount(options)`](https://sinkaroid.github.io/jalter/classes/index.Jalter.html#sendCount)

#### Automated send message and will stop once the count is reached

Desired count is 5, and with 2 second interval
```js
jalter.sendCount("974918359500075041", 2000, "hey", 5)
    .then((res) => { console.log("sendCount", res); });
```

## Limitations
- There is a hard rate limit every 1 seconds per request

## Listen to events
The answer is no, This is intended for something raw and pure HTTP request without extended actions, If you still rely listen events to implement a full-featured bot, use real bot account.

## Pronunciation
[`id_ID`](https://www.localeplanet.com/java/id-ID/index.html) • **/jalter/** — Jalan Alternatif _(?)_ Jadikan ini sebagai jalan alternatif, bukan sebuah tujuan.

## Experimental
This library is maintained but i never use it in production. However it is still somewhat experimental, You are encouraged to make your own tests with your specific endpoints and data types.

## Automated user accounts (self-bots)

Cc: https://support.discord.com/hc/en-us/articles/115002192352-Automated-user-accounts-self-bots-  
The question regarding "self bots" has come up here and there, and we'd like to make our stance clear:

Discord's API provides a separate type of user account dedicated to automation, called a bot account. Bot accounts can be created through the applications page, and are authenticated using a token (rather than a username and password). Unlike the normal OAuth2 flow, bot accounts have full access to all API routes without using bearer tokens, and can connect to the Real Time Gateway. Automating normal user accounts (generally called "self-bots") outside of the OAuth2/bot API is forbidden, and can result in an account termination if found.  </table>