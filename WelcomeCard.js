const Canvas = require("canvas");
const { AttachmentBuilder } = require("discord.js");
/**
 * Returns the number suffix for a given integer. For example, 1 returns '1st', 2 returns '2nd', etc.
 * @param {number} number - The integer for which to return the suffix.
 * @returns {string} The number suffix for the given integer.
 */
function getNumberSuffix(number) {
	// Special case: 11, 12, and 13 use 'th' as the suffix
	if (number % 100 >= 11 && number % 100 <= 13) {
		return number + "th";
	}
	// For all other numbers, check the last digit to determine the suffix
	else if (number % 10 === 1) {
		return number + "st";
	} else if (number % 10 === 2) {
		return number + "nd";
	} else if (number % 10 === 3) {
		return number + "rd";
	}
	// Default case: use 'th' as the suffix
	else {
		return number + "th";
	}
}

module.exports =
	/**
	 * A class representing a WelcomeCard.
	 * @class
	 */
	class WelcomeCard {
		/**
		 * Creates a new instance of the WelcomeCard class.
		 */
		canvas = Canvas.createCanvas(1024, 500);
		/**
		 * Sets the tag for the WelcomeCard.
		 * @param {string} tag - The tag to set.
		 */
		setTag(tag) {
			this._tag = tag;
			return this;
		}
		/**
		 * Gets the member tag for the WelcomeCard.
		 * @returns {string} The member tag for the WelcomeCard.
		 */
		get tag() {
			return this._tag;
		}
		/**
		 * Sets the member count for the WelcomeCard.
		 * @param {number} memberCount - The member count to set.
		 */
		setMemberCount(memberCount) {
			this._memberCount = memberCount;
			return this;
		}
		/**
		 * Gets the member count for the WelcomeCard.
		 * @returns {number} The member count for the WelcomeCard.
		 */
		get memberCount() {
			return this._memberCount;
		}
		/**
		 * Sets the avatar URL for the WelcomeCard.
		 * @param {string} avatarUrl - The avatar URL to set.
		 */
		setAvatarUrl(avatarUrl) {
			this._avatarUrl = avatarUrl;
			return this;
		}
		/**
		 * Gets the avatar URL for the WelcomeCard.
		 * @returns {string} The avatar URL for the WelcomeCard.
		 */
		get avatarUrl() {
			return this._avatarUrl;
		}
		/**
		 * Draws the WelcomeCard on the canvas and returns an attachment of it.
		 * @returns {Promise<AttachmentBuilder>} A Promise containing an AttachmentBuilder with the WelcomeCard image.
		 */
		async draw() {
			Canvas.registerFont("./Algerian Regular.ttf", {
				family: "Algerian",
				weight: "Regular",
				style: "Regular"
			});
			// Loads the background image and draws it on the canvas
			await Canvas.loadImage("./img/bg.png").then((image) => {
				const context = this.canvas.getContext("2d");
				context.font = "72px  Algerian";
				context.fillStyle = "#000000";
				context.drawImage(image, 0, 0, 1024, 500);
				context.fillText("Welcome", 360, 360);
				context.beginPath();
				context.arc(512, 166, 128, 0, Math.PI * 2, true);
				context.closePath();
				context.stroke();
				context.fill();
			});
			const context = this.canvas.getContext("2d");
			context.font = "42px  Algerian";
			context.textAlign = "center";
			context.fillText(this.tag, 512, 410);
			context.font = "27px  Algerian";
			context.fillText(`You are our ${getNumberSuffix(this.memberCount)} member`, 512, 455);
			context.beginPath();
			context.arc(512, 166, 119, 0, Math.PI * 2, true);
			context.closePath();
			context.clip();
			await Canvas.loadImage(this.avatarUrl).then((image) => {
				context.drawImage(image, 393, 47, 238, 238);
			});
			const attachment = new AttachmentBuilder(this.canvas.toBuffer(), "welcome.png");
			return attachment;
		}
	};
