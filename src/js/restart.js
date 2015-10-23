export default function restart(state) {
    return {
            ...state,
            soundSequence: [],
            userSequence: [],
            round: 1
        };
}