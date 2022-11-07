const TelegramApi = require('node-telegram-bot-api')
const {ignore} = require("nodemon/lib/rules");
const token = '5406818198:AAFnYqov3E3eMc3LyZMY5TQGw4YhrVDRW-c'

const bot = new TelegramApi(token, {polling: true})

const pagination_page = 1
const pagination = [{text: 'еще...', callback_data: 'more'}]
const state = [
    [{text: '11.11, 00:00-01:00', callback_data: '11.11, 00:00-01:00'}],
    [{text: '11.11, 01:00-02:00', callback_data: '11.11, 01:00-02:00'}],
    [{text: '11.11, 02:00-03:00', callback_data: '11.11, 02:00-03:00'}],
    [{text: '11.11, 03:00-04:00', callback_data: '11.11, 03:00-04:00'}],
    [{text: '11.11, 04:00-05:00', callback_data: '11.11, 04:00-05:00'}],
    [{text: '11.11, 05:00-06:00', callback_data: '11.11, 05:00-06:00'}],
    [{text: '11.11, 06:00-07:00', callback_data: '11.11, 06:00-07:00'}],
    [{text: '11.11, 07:00-08:00', callback_data: '11.11, 07:00-08:00'}],
    [{text: '11.11, 08:00-09:00', callback_data: '11.11, 08:00-09:00'}],
    [{text: '11.11, 09:00-10:00', callback_data: '11.11, 09:00-10:00'}],
    [{text: '11.11, 10:00-11:00', callback_data: '11.11, 10:00-11:00'}],
    [{text: '11.11, 11:00-12:00', callback_data: '11.11, 11:00-12:00'}],
    [{text: '11.11, 12:00-13:00', callback_data: '11.11, 12:00-13:00'}],
    [{text: '11.11, 13:00-14:00', callback_data: '11.11, 13:00-14:00'}],
    [{text: '11.11, 14:00-15:00', callback_data: '11.11, 14:00-15:00'}],
    [{text: '11.11, 15:00-16:00', callback_data: '11.11, 15:00-16:00'}],
    [{text: '11.11, 16:00-17:00', callback_data: '11.11, 16:00-17:00'}],
    [{text: '11.11, 17:00-18:00', callback_data: '11.11, 17:00-18:00'}],
    [{text: '11.11, 18:00-19:00', callback_data: '11.11, 18:00-19:00'}],
    [{text: '11.11, 19:00-20:00', callback_data: '11.11, 19:00-20:00'}],
    [{text: '11.11, 20:00-21:00', callback_data: '11.11, 20:00-21:00'}],
    [{text: '11.11, 21:00-22:00', callback_data: '11.11, 21:00-22:00'}],
    [{text: '11.11, 22:00-23:00', callback_data: '11.11, 22:00-23:00'}],
    [{text: '11.11, 23:00-00:00', callback_data: '11.11, 23:00-00:00'}],

    [{text: '12.11, 10:00-11:00', callback_data: '12.11, 10:00-11:00'}],
    [{text: '12.11, 11:00-12:00', callback_data: '12.11, 11:00-12:00'}],
    [{text: '12.11, 12:00-13:00', callback_data: '12.11, 12:00-13:00'}],
    [{text: '12.11, 13:00-14:00', callback_data: '12.11, 13:00-14:00'}],
    [{text: '12.11, 14:00-15:00', callback_data: '12.11, 14:00-15:00'}],
    [{text: '12.11, 15:00-16:00', callback_data: '12.11, 15:00-16:00'}],
    [{text: '12.11, 16:00-17:00', callback_data: '12.11, 16:00-17:00'}],
    [{text: '12.11, 17:00-18:00', callback_data: '12.11, 17:00-18:00'}],
    [{text: '12.11, 18:00-19:00', callback_data: '12.11, 18:00-19:00'}],
    [{text: '12.11, 19:00-20:00', callback_data: '12.11, 19:00-20:00'}],
    [{text: '12.11, 20:00-21:00', callback_data: '12.11, 20:00-21:00'}],
    [{text: '12.11, 21:00-22:00', callback_data: '12.11, 21:00-22:00'}],
    [{text: '12.11, 22:00-23:00', callback_data: '12.11, 22:00-23:00'}],
    [{text: '12.11, 23:00-00:00', callback_data: '12.11, 23:00-00:00'}],
]
charId = ''


function setDataState(charId) {
    if (state.length > 10) {
        const newState = [...state.slice(pagination_page - 1, pagination_page * 10), pagination]
        return bot.sendMessage(charId, 'Выбери удобное для тебя время',
            {
                reply_markup: JSON.stringify({
                    inline_keyboard: newState
                })
            })
    }
}

bot.setMyCommands([
    {command: '/start', description: 'Что-то Написал'},
    {command: '/about', description: 'О нас'},
])

bot.on('message', msg => {
    charId = msg.chat.id
    if (msg.text === '/start') {
        return setDataState(msg.chat.id)
    }
    if (msg.text === '/about') {
        return bot.sendMessage(charId, 'Мы платформа для регистрации')
    }
    return bot.sendMessage(charId, 'Я не так умен')
})

bot.on('callback_query', msg => {
    console.log(msg)
    if (msg.data === 'more') {
        return setDataState(charId)
    }
})