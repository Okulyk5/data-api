const { Telegraf } = require('telegraf');
const web3 = require('web3');

// TODO: move telegram stuff to separated file
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(token);
const telegramUsers = process.env.NOTIFICATION_USERS_IDS
  ? process.env.NOTIFICATION_USERS_IDS.split(',')
  : null;

if (!token) {
  throw Error('env var TELEGRAM_BOT_TOKEN is not specified');
}

bot.start((ctx) => {
  console.log(`New client: id = ${ctx.chat.id}`);
  ctx.reply('Greetings!');
});

bot.catch((error) => {
  console.error('Telegraf error:', error);
});

bot.launch();


const sendApplyNotification = (address) => {
  if (!telegramUsers) {
    console.error('No users specified for notification!');
    return;
  }
  for (const userId of telegramUsers) {
    return bot.telegram.sendMessage(userId, `${address} applied for whitelist`);
  }
};

const checkFunds = async (address) => {
  // TODO: actually check funds: >200K KYEFI or >1000$ in UNI-V2
  return true;
};

const failure = (reason) => ({
  success: false,
  error: reason,
});

exports.applyForKeyfiAccess = async (params) => {
  const { address } = params;

  if (!web3.utils.isAddress(address)) {
    return failure('address must be correct ethereum address');
  }

  if (await checkFunds(address)) {
    await sendApplyNotification(address);

    return {
      success: true,
      error: null,
    };
  }

  return failure('You are not eligible!');
};
