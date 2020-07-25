let subscriptions = {}

const unsubscribe = (event, handler) => {
    const idx = subscriptions[event].indexOf(handler)
    subscriptions[event].splice(idx, 1)
}

const subscribe = (event, handler, once = false) => {
    if (!!subscriptions[event] === false) subscriptions[event] = []
    handler.once = once
    subscriptions[event].push(handler)

    return () => unsubscribe(subscriptions, event, handler)
}

const publish = (event, data) => {
    if (!!subscriptions[event] === false) return

    subscriptions[event].forEach(handler => {
        handler(data)
        if (!!handler.once) unsubscribe(event, handler)
    })
}

export const Pubsub = {
    subscribe,
    publish
}
