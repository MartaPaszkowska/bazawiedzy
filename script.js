document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const suggestionsList = document.getElementById('suggestions');
  const wordList = document.getElementById('word-list');

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
          suggestionsList.innerHTML = '';
        });
        suggestionsList.appendChild(suggestionItem);
      });
    }
  });
});
