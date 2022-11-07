const TelegramApi = require('node-telegram-bot-api')
const token = '5406818198:AAFnYqov3E3eMc3LyZMY5TQGw4YhrVDRW-c'

const bot = new TelegramApi(token, {polling: true})

bot.setMyCommands([
    {command: '/start', description: 'Что-то Написал'},
    {command: '/about', description: 'О нас'},
])

const pagination_page = 1

const pagination = [{text: 'еще...', callback_data: 'ь'}]
const state = [
    [{text: '11.11, 10:00-11:00', callback_data: 'sdasd'}],
    [{text: '11.11, 11:00-12:00', callback_data: 'sdasd'}],
    [{text: '11.11, 12:00-13:00', callback_data: 'sdasd'}],
    [{text: '11.11, 13:00-14:00', callback_data: 'sdasd'}],
    [{text: '11.11, 14:00-15:00', callback_data: 'sdasd'}],
    [{text: '11.11, 15:00-16:00', callback_data: 'sdasd'}],
    [{text: '11.11, 16:00-17:00', callback_data: 'sdasd'}],
    [{text: '11.11, 17:00-18:00', callback_data: 'sdasd'}],
    [{text: '11.11, 18:00-19:00', callback_data: 'sdasd'}],
    [{text: '11.11, 19:00-20:00', callback_data: 'sdasd'}],
    [{text: '11.11, 20:00-21:00', callback_data: 'sdasd'}],
    [{text: '11.11, 21:00-22:00', callback_data: 'sdasd'}],
    [{text: '11.11, 22:00-23:00', callback_data: 'sdasd'}],
    [{text: '11.11, 23:00-00:00', callback_data: 'sdasd'}],
]

bot.on('message', msg => {
    const charId = msg.chat.id
    if (msg.text === '/start') {
        if (state.length > 10) {
            const newState = [...state.slice(pagination_page-1, pagination_page * 10), pagination]
            return bot.sendMessage(charId, 'Выбери удобное для тебя время',
                {
                    reply_markup: JSON.stringify({
                        inline_keyboard: newState
                    })
                })
        }
    }
    if (msg.text === '/about') {
        return bot.sendMessage(charId, 'Мы платформа для регистрации')
    }
    return bot.sendMessage(charId, 'Я не так умен')
})