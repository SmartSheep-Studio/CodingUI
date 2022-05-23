export default function (level: number, requirement: number, difficulty: number) {
    return Math.round(level * requirement * difficulty)
}
