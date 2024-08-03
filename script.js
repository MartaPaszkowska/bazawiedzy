document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const suggestionsList = document.getElementById('suggestions');
  const wordList = document.getElementById('word-list');

  let selectedWord = null;

  // Pobierz listę słów z elementu ul, uwzględniając tekst i linki
  const words = Array.from(wordList.querySelectorAll('li')).map(li => ({
    text: li.querySelector('a').textContent,
    url: li.querySelector('a').href,
  }));

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    suggestionsList.innerHTML = '';

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
});
