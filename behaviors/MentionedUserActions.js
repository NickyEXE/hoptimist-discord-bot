import DiscordMember from "../discord_objects/DiscordMember.js";
import UserService from "../requests/userService.js";
export default class MentionedUserActions {
  constructor(message) {
    this.message = message;
    this.mentionedUser = message.mentions.members.first();
  }

  selfCancel = () => {
    const cancellingMember = new DiscordMember(this.message.member).identifiers;
    this.message.channel.send(
      `What kind of shop do you think I'm running here, ${cancellingMember.username}?`
    );
    this.cancelByUserIdentifier(cancellingMember, cancellingMember);
  };

  cancel = () => {
    const cancelledMember = new DiscordMember(this.mentionedUser).identifiers;
    const cancellingMember = new DiscordMember(this.message.member).identifiers;
    this.cancelByUserIdentifier(cancelledMember, cancellingMember);
  };

  getCancelStatus = () => {
    const member = new DiscordMember(this.mentionedUser).identifiers;
    if (!member.discord_id) {
      this.message.channel.send(
        "Please tag the user you wish to find the cancellation status of."
      );
    } else {
      UserService.getCancelStatus(this.mentionedUser.id).then((res) => {
        if (res.messages) {
          res.messages.forEach((message) => {
            this.message.channel.send(message);
          });
        } else {
          this.message.channel.send(
            `Something went wrong and we couldn't find data on ${member.username}.`
          );
        }
      });
    }
  };

  getLeaderboard = () => {
    UserService.getCancellationLeaderboard().then((res) => {
      if (res.messages) {
        res.messages.forEach((message) => {
          this.message.channel.send(message);
        });
      } else {
        this.message.channel.send(
          `Something went wrong and we couldn't find the leaderboard.`
        );
      }
    });
  };

  cancelByUserIdentifier = (cancelledMember, cancellingMember) => {
    if (!cancelledMember.discord_id) {
      this.message.channel.send("Please tag the user you wish to cancel.");
    } else {
      const payload = {
        cancelled_member: cancelledMember,
        cancelling_member: cancellingMember,
      };
      UserService.cancelUser(payload).then((res) => {
        if (res.messages) {
          res.messages.forEach((message) => {
            this.message.channel.send(message);
          });
        } else {
          this.message.channel.send(
            `Something went wrong and ${cancelledMember.username} has not been cancelled.`
          );
        }
      });
    }
  };
}
