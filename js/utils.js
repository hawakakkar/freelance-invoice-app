export async function fetchClientsAPI() {
  try {
    const res = await fetch("https://randomuser.me/api/?results=5&nat=us");
    const data = await res.json();

    return data.results.map((user) => ({
      id: Date.now() + Math.random(),
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      company: "Freelance Inc.",
      notes: "",
    }));
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
}

export async function fetchQuote() {
  try {
    const res = await fetch("https://zenquotes.io/api/quotes");
    const data = await res.json();
    const quote = data[Math.floor(Math.random() * data.length)];

    return {
      text: quote.q || "No quote",
      author: quote.a || "Unknown",
    };
  } catch (err) {
    return { text: "Stay motivated!", author: "System" };
  }
}
