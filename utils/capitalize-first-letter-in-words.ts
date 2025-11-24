export function capitalizeFirstLetterInWords(sentence: string): string {
  return sentence
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
