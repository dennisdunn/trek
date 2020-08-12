const TIME_FACTOR = 10

export const status = (state, action) => {
    switch (action.type) {
        case 'inc-stardate':
            return ({ ...state, starDate: state.starDate + TIME_FACTOR * action.payload })
        case 'set-alert':
            return ({ ...state, alert: action.payload })
        default:
            return state
    }
}