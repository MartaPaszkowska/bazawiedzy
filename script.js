const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const suggestionsList = document.getElementById('suggestions');
const wordList = document.getElementById('word-list');
const selectedLinkDiv = document.getElementById('selected-link');

let selectedWord = null;

// Pobierz listę słów z elementu ul, uwzględniając tekst i linki
const words = Array.from(wordList.querySelectorAll('li')).map(li => ({
  text: li.querySelector('a').textContent,
  url: li.querySelector('a').href,
}));

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  suggestionsList.innerHTML = '';
  selectedLinkDiv.style.display = 'none';

  if (query) {
    const filteredWords = words.filter(word =>
      word.text.toLowerCase().startsWith(query)
    );

    filteredWords.forEach(word => {
      const suggestionItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = word.url;
      link.textContent = word.text;
      suggestionItem.appendChild(link);
      suggestionItem.addEventListener('click', event => {
        event.preventDefault();
        searchInput.value = word.text;
        selectedWord = word;
        suggestionsList.innerHTML = '';
        displaySelectedLink(word);
      });
      suggestionsList.appendChild(suggestionItem);
    });
  }
});

searchButton.addEventListener('click', () => {
  if (selectedWord) {
    window.location.href = selectedWord.url;
  } else {
    const query = searchInput.value.toLowerCase();
    const foundWord = words.find(word => word.text.toLowerCase() === query);
    if (foundWord) {
      window.location.href = foundWord.url;
    } else {
      iziToast.error({
        position: 'topRight',
        message: 'Please select a valid search term.',
      });
    }
  }
});

function displaySelectedLink(word) {
  selectedLinkDiv.innerHTML = '';
  const link = document.createElement('a');
  link.href = word.url;
  link.textContent = `Go to ${word.text}`;
  selectedLinkDiv.appendChild(link);
  selectedLinkDiv.style.display = 'block';
}
