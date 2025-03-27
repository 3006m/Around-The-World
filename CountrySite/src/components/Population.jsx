import React, { useEffect, useState } from "react";

function Population() {
  const [population, setPopulation] = useState(""); // Estado para armazenar a população
  const [countryName, setCountryName] = useState(""); // Estado para armazenar o nome do país

  useEffect(() => {
    const fetchPopulation = async () => {
      // Obtém o país selecionado do localStorage
      const savedCountry = localStorage.getItem("Países");
      setCountryName(savedCountry || "No country selected");

      if (savedCountry) {
        try {
          // Faz a requisição para obter a população do país
          const response = await fetch(
            `https://restcountries.com/v3.1/name/${savedCountry}?fields=population`
          );
          const data = await response.json();

          // Verifica se a população foi encontrada
          if (data && data[0] && data[0].population) {
            setPopulation(data[0].population.toLocaleString()); // Formata a população com separadores
          } else {
            setPopulation("Population not found");
          }
        } catch (error) {
          console.error("Error fetching country details:", error);
          setPopulation("Error fetching population");
        }
      }
    };

    fetchPopulation();
  }, []);

  return (
    <div>
      <h1>Population of {countryName}: {population}</h1>
    </div>
  );
}

export default Population;