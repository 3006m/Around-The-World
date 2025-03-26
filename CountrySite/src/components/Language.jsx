import React, { useEffect, useState } from "react";

function Language() {
  const [language, setLanguage] = useState(""); // Estado para armazenar a linguagem
  const [countryName, setCountryName] = useState(""); // Estado para armazenar o nome do país

  useEffect(() => {
    const fetchLanguage = async () => {
      // Obtém o país selecionado do localStorage
      const savedCountry = localStorage.getItem("selectedCountry");
      setCountryName(savedCountry || "No country selected");

      if (savedCountry) {
        try {
          // Faz a requisição para obter a linguagem do país
          const response = await fetch(
            `https://restcountries.com/v3.1/name/${savedCountry}?fields=languages`
          );
          const data = await response.json();

          // Verifica se a linguagem foi encontrada
          if (data && data[0] && data[0].languages) {
            const languages = Object.values(data[0].languages).join(", ");
            setLanguage(languages);
          } else {
            setLanguage("Language not found");
          }
        } catch (error) {
          console.error("Error fetching country details:", error);
          setLanguage("Error fetching language");
        }
      }
    };

    fetchLanguage();
  }, []);

  return (
    <div>
     
      <h1>Language(s) of {countryName}: {language}</h1>
    </div>
  );
}

export default Language;