import { Card } from "../interface";

export default function shuffleCards(cards: number[]) {
  let randomNumber = 11231412312;
  for (let i = cards.length - 1; i >= 0; i--) {
    // Generate a pseudo-random index based on the random number
    let n = randomNumber % (i + 1);
    randomNumber = hash(randomNumber);

    // Swap elements
    let temp = cards[i];
    cards[i] = cards[n];
    cards[n] = temp;
  }

  return cards;
}

function hash(num: number) {
  let str = num.toString();
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
