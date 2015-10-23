export default function random (min, max) {

    return (Math.max(min, Math.floor(Math.random() * (max + 1))));

}