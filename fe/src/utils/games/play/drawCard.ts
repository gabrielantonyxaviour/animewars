import { Card } from "../../interface";

export default function drawCard(deck: Card[]): Card | undefined {
  return deck.pop();
}
