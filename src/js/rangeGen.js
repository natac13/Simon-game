export default function range(start, end) {
    let list = [];
        for (let i = start; i < end + 1; i++) {
            list.push(i);
        }

        return list;
}