const API = {
  GetChatbotResponse: async (message) => {
    try {
      if (message.toLowerCase() === "hi") {
        return "Merhaba. Ben yapay doktorun Sağlık Olsun. Sana nasıl yardımcı olabilirim?"; 
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
        return data.response; 
      }
    } catch (error) {
      console.error('Error communicating with backend:', error);
      throw error; 
    }
  },
};

export default API;
