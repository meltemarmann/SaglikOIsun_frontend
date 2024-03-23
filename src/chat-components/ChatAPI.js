const API = {
    GetChatbotResponse: async message => {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          if (message === "hi") resolve("Hoşgeldiniz, rahatsızlığınız nedir?");
          else resolve("echo : " + message);
        }, 2000);
      });
    }
  };
  
  export default API;
  