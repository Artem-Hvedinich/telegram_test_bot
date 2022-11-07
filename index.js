const TelegramApi = require('node-telegram-bot-api')
const token = '5406818198:AAFnYqov3E3eMc3LyZMY5TQGw4YhrVDRW-c'

const bot = new TelegramApi(token, {polling: true})
bot.setMyCommands([
    {command: '/start', description:'Что-то Написал'},
    {command: '/about', description:'О нас'},
])
bot.on('message', msg => {
    const charId = msg.chat.id
    if (msg.text === '/start') {
        bot.sendMessage(charId, 'Привет, я помогу тебе')
    }
    if (msg.text === '/about') {
        bot.sendMessage(charId, 'Мы платформа для регистрации')
    }

})