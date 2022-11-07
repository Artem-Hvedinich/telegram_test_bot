const TelegramApi = require('node-telegram-bot-api')
const token = '5406818198:AAFnYqov3E3eMc3LyZMY5TQGw4YhrVDRW-c'

const bot = new TelegramApi(token, {polling: true})
const mainState = {
    userName: '',
    day: '',
    time: '',
    userId: 0
}

let dayState = {
    friday: [
        [{text: '00:00-01:00', callback_data: '00:00-01:00'}, {text: '01:00-02:00', callback_data: '01:00-02:00'}],
        [{text: '02:00-03:00', callback_data: '02:00-03:00'}, {text: '03:00-04:00', callback_data: '03:00-04:00'}],
        // [{text: '04:00-05:00', callback_data: '04:00-05:00'}, {text: '05:00-06:00', callback_data: '05:00-06:00'}],
        // [{text: '06:00-07:00', callback_data: '06:00-07:00'}, {text: '07:00-08:00', callback_data: '07:00-08:00'}],
        // [{text: '08:00-09:00', callback_data: '08:00-09:00'}, {text: '09:00-10:00', callback_data: '09:00-10:00'}],
        // [{text: '10:00-11:00', callback_data: '10:00-11:00'}, {text: '11:00-12:00', callback_data: '11:00-12:00'}],
        // [{text: '12:00-13:00', callback_data: '12:00-13:00'}, {text: '13:00-14:00', callback_data: '13:00-14:00'}],
        // [{text: '14:00-15:00', callback_data: '14:00-15:00'}, {text: '15:00-16:00', callback_data: '15:00-16:00'}],
        // [{text: '16:00-17:00', callback_data: '16:00-17:00'}, {text: '17:00-18:00', callback_data: '17:00-18:00'}],
        // [{text: '18:00-19:00', callback_data: '18:00-19:00'}, {text: '19:00-20:00', callback_data: '19:00-20:00'}],
        // [{text: '20:00-21:00', callback_data: '20:00-21:00'}, {text: '21:00-22:00', callback_data: '21:00-22:00'}],
        // [{text: '22:00-23:00', callback_data: '22:00-23:00'}, {text: '23:00-00:00', callback_data: '23:00-00:00'}],
    ],
    saturday: [
        [{text: '00:00-01:00', callback_data: '00:00-01:00'}, {text: '01:00-02:00', callback_data: '01:00-02:00'}],
        [{text: '02:00-03:00', callback_data: '02:00-03:00'}, {text: '03:00-04:00', callback_data: '03:00-04:00'}],
        // [{text: '04:00-05:00', callback_data: '04:00-05:00'}, {text: '05:00-06:00', callback_data: '05:00-06:00'}],
        // [{text: '06:00-07:00', callback_data: '06:00-07:00'}, {text: '07:00-08:00', callback_data: '07:00-08:00'}],
        // [{text: '08:00-09:00', callback_data: '08:00-09:00'}, {text: '09:00-10:00', callback_data: '09:00-10:00'}],
        // [{text: '10:00-11:00', callback_data: '10:00-11:00'}, {text: '11:00-12:00', callback_data: '11:00-12:00'}],
        // [{text: '12:00-13:00', callback_data: '12:00-13:00'}, {text: '13:00-14:00', callback_data: '13:00-14:00'}],
        // [{text: '14:00-15:00', callback_data: '14:00-15:00'}, {text: '15:00-16:00', callback_data: '15:00-16:00'}],
        // [{text: '16:00-17:00', callback_data: '16:00-17:00'}, {text: '17:00-18:00', callback_data: '17:00-18:00'}],
        // [{text: '18:00-19:00', callback_data: '18:00-19:00'}, {text: '19:00-20:00', callback_data: '19:00-20:00'}],
        // [{text: '20:00-21:00', callback_data: '20:00-21:00'}, {text: '21:00-22:00', callback_data: '21:00-22:00'}],
        // [{text: '22:00-23:00', callback_data: '22:00-23:00'}, {text: '23:00-00:00', callback_data: '23:00-00:00'}],
    ]
}
const daysState = {
    friday: [{text: 'Пятница', callback_data: 'friday',}],
    saturday: [{text: 'Суббота', callback_data: 'saturday'}]
}


function setDays(charId) {
    const daysItems = []
    if (dayState.friday.length > 0 || dayState.saturday.length > 0) {
        if (dayState.friday.length > 0) daysItems.push(daysState.friday)
        if (dayState.saturday.length > 0) daysItems.push(daysState.saturday)
        return bot.sendMessage(charId, 'Выберите день',
            {
                reply_markup: JSON.stringify({
                    inline_keyboard: daysItems
                })
            })
    } else bot.sendMessage(charId, 'К сожалению мест нет')
}

async function setTime(msg) {
    mainState.day = msg.data
    await bot.sendMessage(msg.message.chat.id, `Выберите время (${daysState[msg.data][0].text})`, {
        reply_markup: JSON.stringify({
            inline_keyboard: dayState[msg.data]
        })
    })
}

async function setUserName(msg) {
    if (msg.from.first_name) {
        mainState.userName += msg.from.first_name + " "
    }
    if (msg.from.last_name) {
        mainState.userName += msg.from.last_name
    }
    mainState.userName = `${msg.from.first_name} ${msg.from.last_name}`
    // await bot.sendMessage(msg.message.chat.id, `Введите имя в поле ввода`)
}

const start = async () => {
    await bot.setMyCommands([
        {command: '/start', description: 'Начать'},
    ])

    await bot.on('message', msg => {
        if (msg.text === '/start') return setDays(msg.chat.id)
        return bot.sendMessage(msg.chat.id, 'Я не так умен')
    })

    await bot.on('callback_query', async (msg) => {

            if (msg.data === 'friday' || msg.data === 'saturday') {
                await setTime(msg)
            } else if (msg.data) {
                let newArr
                for (let i = 0; i < dayState[mainState.day].length; i++) {
                    dayState = {
                        ...dayState,
                        [mainState.day]: dayState[mainState.day]
                            .map((m, i) => [...m.filter(f => f.text !== msg.data)]).filter(j => j.length > 0)
                    }
                }
                console.log(dayState)


                mainState.time = msg.data
                mainState.userId = msg.message.chat.id
                await setUserName(msg)
                if (mainState.day && mainState.userName && mainState.userId && mainState.time) {
                    bot.sendMessage(msg.message.chat.id, `Ваше "${mainState.userName}" время: ${daysState[mainState.day][0].text} ${mainState.time}`)
                }
                // if (!mainState.day || !mainState.userName || !mainState.userId || !mainState.time) {
                // console.log(mainState)
                // !mainState.day && await setDays(msg.message.chat.id)
                // !mainState.time && await setTime(msg.message.chat.id)
            }
        }
    )
}
start()