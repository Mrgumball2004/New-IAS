function processText(isDecrypt) {
  const shiftText = document.getElementById("shift").value;
  let shift = parseInt(shiftText, 10);

  if (isDecrypt) {
    shift = -shift; // Reverse the shift for decryption
  }

  const textElem = document.getElementById("inputText");
  const text = textElem.value;

  // Get the result textarea element to display the result
  const resultElem = document.getElementById("resultText");

  // Update the result text with the encrypted/decrypted result
  resultElem.value = caesarShift(text, shift);
}

function caesarShift(text, shift) {
  const customCharset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  const charsetLength = customCharset.length;
  let result = "";

  // Normalize the shift to ensure it stays within bounds
  shift = ((shift % charsetLength) + charsetLength) % charsetLength;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const index = customCharset.indexOf(char);

    if (index === -1) {
      // If the character is not in the charset, leave it unchanged
      result += char;
    } else {
      // Find the new index after shifting
      const newIndex = (index + shift) % charsetLength;
      result += customCharset[newIndex];
    }
  }

  return result;
}

function clearInput() {
  document.getElementById("inputText").value = "";  // Clears the input field
  document.getElementById("resultText").value = "";  // Optionally clear the result field
}


// Clipboard copy functionality
document.getElementById("clipboard").addEventListener("click", copyToClipboard);

function copyToClipboard() {
  let textArea = document.createElement("textarea");
  const resultField = document.getElementById("resultText");
  const resultText = resultField.value;

  if (!resultText) {
    alert("There is no result to copy!");
    return;
  }

  textArea.value = resultText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();

  alert("Caesaris codice copied to clipboard!");
}