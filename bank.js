const { create_stream, get_tail, get_head } = require('./stream')
const { each } = require('./operation')
const readlineSync = require('readline-sync');

const getWithdraw = () => {
  return parseInt(readlineSync.question('How much do you want to withdraw? '));
}

const generate_withdraw_stream = () => {
  return create_stream(getWithdraw(), () => generate_withdraw_stream());
}

const balance_stream = (balance, withdraw_stream_getter) => {
  return create_stream(balance, () => {
    const withdraw_stream = withdraw_stream_getter();
    const calc_balance = () => {
      if (balance < get_head(withdraw_stream)) {
        console.log('Insufficient Funds!');
        return balance;
      }
      return balance - get_head(withdraw_stream);
    }
    return balance_stream(calc_balance(), () => get_tail(withdraw_stream)
    )
  });
}

each((balance_stream(100, () => generate_withdraw_stream())),
  amount => console.log('Current balance is ', amount));