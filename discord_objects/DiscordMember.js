export default class DiscordMember {
  constructor(member) {
    this.member = member;
  }

  get identifiers() {
    return { discord_id: this.member?.id, username: this.member?.displayName };
  }
}
