document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const suggestionsList = document.getElementById('suggestions');
  const wordList = document.getElementById('word-list');
  const iframe = document.getElementById('iframe');

  let selectedWord = null;

  // Pobierz listę słów z elementu ul, uwzględniając tekst i linki
  const words = Array.from(wordList.querySelectorAll('li')).map(li => ({
    text: li.querySelector('a').textContent,
    url: li.querySelector('a').href,
  }));

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    suggestionsList.innerHTML = '';
    iframe.style.display = 'none';

    if (query) {
      const filteredWords = words.filter(word =>
        word.text.toLowerCase().startsWith(query)
      );

      filteredWords.forEach(word => {
        const suggestionItem = document.createElement('li');
        suggestionItem.textContent = word.text;
        suggestionItem.addEventListener('click', () => {
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
    const query = searchInput.value.toLowerCase();
    const foundWord = words.find(word => word.text.toLowerCase() === query);
    if (foundWord) {
      selectedWord = foundWord;
      displaySelectedLink(foundWord);
    } else {
      iziToast.error({
        position: 'topRight',
        message: 'Please select a valid search term.',
      });
    }
  });

  function displaySelectedLink(word) {
    iframe.src = word.url;
    iframe.style.display = 'block';
  }
});
