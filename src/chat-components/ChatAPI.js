const API = {
  GetChatbotResponse: async (message) => {
    try {
      if (message.toLowerCase() === "hi") {
        return "Hoşgeldiniz, rahatsızlığınız nedir?"; // Default response for "hi" message
      } else {
        const response = await fetch('http://127.0.0.1:8000/api/chatbot/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.response; // Response from the backend chatbot
      }
    } catch (error) {
      console.error('Error communicating with backend:', error);
      throw error; // Rethrow the error to be caught by the caller
    }
  },
};

export default API;
