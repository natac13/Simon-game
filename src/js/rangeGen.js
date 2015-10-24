export default function range(num1, num2) {
    let start = Math.min(num1, num2);
    let end = Math.max(num1, num2);
    let list = [];
        for (let i = start; i < end + 1; i++) {
            list.push(i);
        }

        return list;
}