const STAR_DATE_INC = 0.3

export const status = (state, action) => {
    switch (action.type) {
        case 'inc-stardate':
            return ({ ...state, starDate: state.starDate + STAR_DATE_INC })
        case 'set-alert':
            return ({ ...state, alert: action.payload })
        default:
            return state
    }
}