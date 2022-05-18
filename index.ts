import { loopInterval, loopCount, rateLimit, request } from "./src/utils";
import c from "./src/const";

class Jalter {

  private base: string
  private auth: object

  static default: typeof Jalter;

  constructor(token: string) {
    if (!token) throw new Error(c.error.missingToken);
    this.base = c.endpoint.baseurl;
    this.auth = { "authorization": token };

    /*
    get(`${this.base}/users/@me`, this.auth).then(res => {
      if (res.statusCode !== 200) throw new Error(c.error.invalidToken);
    });
    */
  }

  /**
  * Returns the user object of the requester's account.
  * @returns the current user object
  * @example
  * ```js
  * jalter.getMe().then((res) => { console.log("getMe", res); });
  * ```
  * https://discord.com/developers/docs/resources/user#get-current-user
  */
  async getMe(): Promise<object> {
    const endpoint = `${this.base}/users/@me`;
    return await request(endpoint, this.auth, "GET").then(res => {
      return res.body as object;
    });
  }

  /**
   * Returns a user object for a given user ID.
   * @param {string} userId the user id
   * @returns the user object
   * @example
   * ```js
   * jalter.getUser("317255788324454400").then((res) => { console.log("getUser", res); });
   * ```
   * https://discord.com/developers/docs/resources/user#get-user
   */
  async getUser(userId: string): Promise<object> {
    const endpoint = `${this.base}/users/${userId}`;
    return await request(endpoint, this.auth, "GET").then(res => {
      return res.body as object;
    });
  }

  /**
   * Post a message to a guild text or DM channel. Returns a message object
   * @param {string} channelId the channel id
   * @param {string} text the message text
   * @returns the message object send
   * @example
   * ```js
   * jalter.sendMessage("974918359500075041", "hey").then((res) => { console.log("sendMessage", res); });
   * ```
   * https://discord.com/developers/docs/resources/channel#create-message
   */
  async sendMessage(channelId: string, text: string): Promise<object> {
    const endpoint = `${this.base}/channels/${channelId}/messages`;
    return await request(endpoint, this.auth, "POST", { content: text }).then(res => {
      return res.body as object;
    });
  }


  /**
   * Returns the messages for a channel.
   * @param {string} channelId
   * @param {number} limit
   * @return the messages that were received
   * @example
   * ```js
   * jalter.getMessages("974918359500075041", 10).then((res) => { console.log("getMessages", res); });
   * ```
   * https://discord.com/developers/docs/resources/channel#get-channel-messages
   */
  async getMessage(channelId: string, limit: number): Promise<object> {
    const endpoint = `${this.base}/channels/${channelId}/messages?limit=${limit}`;
    return await request(endpoint, this.auth, "GET").then(res => {
      return res.body as object;
    });
  }

  /**
   * Returns an audit log object for the guild
   * @param {string} guildId the guild id
   * return the audit logs from related guild
   * @example
   * ```js
   * jalter.getAuditLogs("974918359500075041").then((res) => { console.log("getAuditLogs", res); });
   * ```
   * https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log
   */
  async getAuditLogs(guildId: string): Promise<object> {
    const endpoint = `${this.base}/guilds/${guildId}/audit-logs`;
    return await request(endpoint, this.auth, "GET").then(res => {
      return res.body as object;
    });
  }

  /**
   * Returns a list of role objects for the guild.
   * @param {string} guildId the guild id
   * @returns the list of roles from related guild
   * @example
   * ```js
   * jalter.getRoles("974918359500075041").then((res) => { console.log("getRoles", res); });
   * ```
   * https://discord.com/developers/docs/resources/guild#get-guild-roles
   */
  async getRoles(guildId: string): Promise<object> {
    const endpoint = `${this.base}/guilds/${guildId}/roles`;
    return await request(endpoint, this.auth, "GET").then(res => {
      return res.body as object;
    });
  }

  /**
   * Kick a member from a guild
   * @param {string} guildId the guild id
   * @param {string} userId the user id
   * @returns 204 empty response on success
   * @example
   * ```js
   * jalter.kickUser("974918359500075041", "317255788324454400").then((res) => { console.log("kickUser", res); });
   * ```
   * https://discord.com/developers/docs/resources/guild#remove-guild-member
   */
  async kickUser(guildId: string, userId: string): Promise<object> {
    const endpoint = `${this.base}/guilds/${guildId}/members/${userId}`;
    return await request(endpoint, this.auth, "DELETE").then(res => {
      return res.body as object;
    });
  }


  /**
   * Ban a member from a guild
   * @param {string} guildId the guild id
   * @param {string} userId the user id
   * @param {string} reason the reason for banning
   * @returns 204 empty response on success
   * @example
   * ```js
   * jalter.banUser("974918359500075041", "974918359500075041", "I don't like you").then((res) => { console.log("banUser", res); });
   * ```
   * https://discord.com/developers/docs/resources/guild#remove-guild-member
   */
  async banUser(guildId: string, userId: string, reason = ""): Promise<object> {
    const endpoint = `${this.base}/guilds/${guildId}/bans/${userId}`;
    return await request(endpoint, this.auth, "PUT", { delete_message_days: "7", reason }).then(res => {
      return res.body as object;
    });
  }

  /**
   * Unban a member from a guild
   * @param {string} guildId the guild id
   * @param {string} userId the user id
   * @returns the user object that was unbanned
   * @example
   * ```js
   * jalter.unBanUser("974918359500075041", "974918359500075041").then((res) => { console.log("unBanUser", res); });
   * ```
   * https://discord.com/developers/docs/resources/guild#remove-guild-member
   */
  async unBanUser(guildId: string, userId: string): Promise<void> {
    const endpoint = `${this.base}/guilds/${guildId}/bans/${userId}`;
    await request(endpoint, this.auth, "DELETE").then(res => {
      return res.body as object;
    });
  }

  /**
   * Join a guild
   * @param {string} inviteUrl the code invites
   * @returns the guild object that was joined
   * @example
   * ```js
   * jalter.joinGuild("ApHu666E").then((res) => { console.log("joinGuild", res); });
   * ```
   * https://discord.com/developers/docs/resources/invite#get-invite
   */
  async joinGuild(inviteUrl: string): Promise<object> {
    if (inviteUrl.startsWith("https")) throw new Error(c.error.notValidCode);
    const endpoint = `${this.base}/invites/${inviteUrl}`;
    return await request(endpoint, this.auth, "POST", { content: "" }).then(res => {
      return res.body as object;
    });
  }

  /**
   * Leave a guild. Returns a 204 empty response on success.
   * @param {string} guildId the guild id
   * @returns 204 empty response on success
   * @example
   * ```js
   * jalter.leaveGuild("974918359500075041").then((res) => { console.log("leaveGuild", res); });
   * ```
   * https://discord.com/developers/docs/resources/user#leave-guild
   */
  async leaveGuild(guildId: string): Promise<object> {
    const endpoint = `${this.base}/users/@me/guilds/${guildId}`;
    return await request(endpoint, this.auth, "DELETE").then(res => {
      return res.body as object;
    });
  }

  /**
   * Trigger Typing Indicator
   * @param {string} channelId the channel id
   * @returns 204 empty response on success
   * @example
   * ```js
   * jalter.startTyping("974918359500075041").then((res) => { console.log("startTyping", res); });
   * ```
   * https://discord.com/developers/docs/resources/channel#trigger-typing-indicator
   */
  async typingMessage(channelId: string, timeout = 3000): Promise<void> {
    const endpoint = `${this.base}/channels/${channelId}/typing`;
    await request(endpoint, this.auth, "POST").then(res => {
      return res.body as object;
    });
    await rateLimit(timeout);
  }

  /**
   * Reply to a message
   * @param {string} channelId the channel id
   * @param {string} messageId the message id
   * @param {string} text the desired reply text
   * @returns the message object that was replied
   * @example
   * ```js
   * jalter.replyMessage("974918359500075041", "974963134144069662", "uh?").then((res) => { console.log("replyMessage", res); });
   * ```
   * https://discord.com/developers/docs/resources/channel#create-message
   */
  async replyMessage(channelId: string, messageId: string, text: string): Promise<object> {
    const endpoint = `${this.base}/channels/${channelId}/messages`;
    return await request(endpoint, this.auth, "POST", {
      content: text,
      message_reference: { message_id: messageId }
    }).then(res => {
      return res.body as object;
    });
  }

  /**
   * Delete a message
   * @param {string} channelId the channel id
   * @param {string} messageId the message id
   * @returns the message object that was deleted or null
   * @example
   * ```js
   * jalter.deleteMessage("974918359500075041", "974963134144069662").then((res) => { console.log("deleteMessage", res); });
   * ```
   * https://discord.com/developers/docs/resources/channel#get-channel-message
   */
  async deleteMessage(channelId: string, messageId: string): Promise<object> {
    const endpoint = `${this.base}/channels/${channelId}/messages/${messageId}`;
    return await request(endpoint, this.auth, "DELETE").then(res => {
      return res.body as object;
    });
  }

  /**
   * Create a new channel object for the guild
   * @param {string} guildId the guild id
   * @param {string} name the desired name
   * @param {string} type the channel TYPE
   * @returns the channel object that was created
   * @example
   * ```js
   * jalter.createChannel("974918359500075041", "general", 0).then((res) => { console.log("createChannel", res); });
   * ```
   * https://discord.com/developers/docs/resources/channel#create-guild-channel
   */
  async createChannel(guildId: string, name: string, type: number): Promise<object> {
    if (!c.channelType.includes(type)) throw Error("Invalid channel type, please use one of the following: " + c.channelType.join(", "));
    const endpoint = `${this.base}/guilds/${guildId}/channels`;
    return await request(endpoint, this.auth, "POST", { name, type }).then(res => {
      return res.body as object;
    });
  }

  /**
   * Returns a list of guild channel objects. Does not include threads.
   * @param {string} guildId the guild id
   * @returns the list of channels from related guild
   * @example
   * ```js
   * jalter.getChannels("974918359500075041").then((res) => { console.log("getChannels", res); });
   * ```
   * https://discord.com/developers/docs/resources/guild#get-guild-channels
   */
  async getChannels(guildId: string): Promise<object> {
    const endpoint = `${this.base}/guilds/${guildId}/channels`;
    return await request(endpoint, this.auth, "GET").then(res => {
      return res.body as object;
    });
  }


  /**
  * For farming stuff, fill the array with your custom message, just dont greedy
  * @param {number} channelId The destination channel ID
  * @param {number} interval The interval time per ms
  * @param {string[]} textList The array of messages
  * @returns the message object send
  * @example
  * send random hey, ho, or let's go
  * ```js
  * jalter.sendInterval("974918359500075041", 2000, ["hey", "ho", "let's go"]).then((res) => { console.log("sendInterval", res); });
  * ```
  * 
  * @example
  * will send a random hello world in different 72 languages if array is not specified
  * ```js
  * jalter.sendInterval("974918359500075041", 2000).then((res) => { console.log("sendInterval", res); });
  * ```
  * Non standard stuff, there is no external links except [channel#create-message](https://discord.com/developers/docs/resources/channel#create-message)
  */
  async sendInterval(channelId: string, interval: number, textList: string[] = c.endpoint.hello): Promise<number> {
    if (!Array.isArray(textList)) throw new Error(c.error.notArray);
    if (interval < 1000) throw new Error(c.error.invalidDelay);

    return loopInterval(async () => {
      this.sendMessage(channelId, textList[Math.floor(Math.random() * textList.length)]).then(console.log);
    }, interval);
  }

  /**
   * Send a message on the channel and will stop once the count is reached 
   * @param {string} channelId the channel id
   * @param {number} interval the interval delay time
   * @param {string} text the message text
   * @param {number} count the number of messages to send
   * @returns the message object send
   * @example
   * send a message with a delay of 2 seconds and will stop after reaching 5 messages
   * ```js
   * jalter.sendCount("974918359500075041", 2000, "hey", 5).then((res) => { console.log("sendCount", res); });
   * ```
   * Non standard stuff, there is no external links except [channel#create-message](https://discord.com/developers/docs/resources/channel#create-message)
   */
  async sendCount(channelId: string, interval: number, text: string, count: number): Promise<void> {
    if (interval < 1000) throw new Error(c.error.invalidDelay);

    return loopCount(async () => {
      this.sendMessage(channelId, text).then(console.log);
    }, interval, count);
  }

}

Jalter.default = Jalter;
export = Jalter;