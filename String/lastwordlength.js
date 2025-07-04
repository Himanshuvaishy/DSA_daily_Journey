//~ Approach:1

function lengthOfLastWord(s) {
  // Remove trailing and leading spaces
  const trimmed = s.trim();

  // Split the string by space into words
  const words = trimmed.split(" ");

  // Return the length of the last word
  return words[words.length - 1].length;
}

// * Approach:2
   function lengthOfLastWord(s) {
  let i = s.length - 1;
  let count = 0;

  // Skip trailing spaces
  while (i >= 0 && s[i] === " ") {
    i--;
  }

  // Count characters of the last word
  while (i >= 0 && s[i] !== " ") {
    count++;
    i--;
  }

  return count;
}

