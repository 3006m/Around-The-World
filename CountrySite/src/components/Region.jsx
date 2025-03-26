import React, { useEffect, useState } from "react";
import "./page.css";

function Page1() {
  const [region, setRegion] = useState(""); // Estado para armazenar a região

  const [countryName, setCountryName] = useState(""); // Estado para armazenar o nome do país

  useEffect(() => {
    const fetchRegion = async () => {
      // Obtém o país selecionado do localStorage
      const savedCountry = localStorage.getItem("selectedCountry");
      setCountryName(savedCountry || "No country selected");

      if (savedCountry) {
        try {
          // Faz a requisição para obter a região do país
          const response = await fetch(
            `https://restcountries.com/v3.1/name/${savedCountry}?fields=region`
          );
          const data = await response.json();

          // Verifica se a região foi encontrada
          if (data && data[0] && data[0].region) {
            setRegion(data[0].region);
          } else {
            setRegion("Region not found");
          }
        } catch (error) {
          console.error("Error fetching country details:", error);
          setRegion("Error fetching region");
        }
      }
    };

    fetchRegion();
  }, []);
  
  
  return (
    <div>
      <h1>{countryName}</h1>
      <p>Welcome to Page 1!</p>
      <h1>Region: {region}</h1>
    </div>
  );
}

export default Page1;