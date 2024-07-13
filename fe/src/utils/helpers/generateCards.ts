import { Card } from "../interface";

export default function generateCards(
  template: Omit<Card, "id">,
  initId: number,
  count: number
): Card[] {
  const cards: Card[] = [];

  for (let i = 0; i < count; i++) {
    cards.push({ ...template, id: initId + i });
  }

  return cards;
}
