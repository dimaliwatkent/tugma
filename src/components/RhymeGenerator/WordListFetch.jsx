const fetchTagalogWordList = async () => {
  try {
    const response = await fetch("src/components/TagalogWords.txt");
    const data = await response.text();
    const words = data.split("\n");
    return words.filter(Boolean);
  } catch (error) {
    console.error("Error fetching Tagalog word list:", error);
    return [];
  }
};

export default fetchTagalogWordList;
