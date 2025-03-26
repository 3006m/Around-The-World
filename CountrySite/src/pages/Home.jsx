import { useState, useEffect } from "react";
import Page1 from "./Page1";

function Home() {
  const [todosPaises, setTodosPaises] = useState([]);

  const [nomePaisEspecifico, setNomePaisEspecifico] = useState(() => {
    const salvarNomePais = window.localStorage.getItem('Países');
    return salvarNomePais ? JSON.parse(salvarNomePais) : 'Brazil';
  });

  const [paisEspecifico, setPaisEspecifico] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function TodosOsPaises() {
      try {
        const respostaTodos = await fetch("https://restcountries.com/v3.1/independent?status=true&fields=name&quot");

        if (!respostaTodos.ok) {
          throw new Error("Viadão bem legalzão");
        }

        const dadosTodos = await respostaTodos.json();
        setTodosPaises(dadosTodos);

      } catch (error) {
        setError(error.message);
      }
    }

    TodosOsPaises();
  }, []);

  console.log(todosPaises);

  useEffect(() => {
    async function PaisEspecificoEncontrar() {
        try {
            const respostaPaisEspecifico = await fetch(`https://restcountries.com/v3.1/name/${nomePaisEspecifico}`)

            localStorage.setItem("Países", JSON.stringify(nomePaisEspecifico));

            if (!respostaPaisEspecifico.ok) {
                throw new Error("Viadão bem legalzão");
            }

            const dadosEspecificos = await respostaPaisEspecifico.json();
            setPaisEspecifico(dadosEspecificos);

        } catch {
            setError("Pais não encontrado");
        }

    }

    PaisEspecificoEncontrar();
  }, [nomePaisEspecifico]);

  console.log("Pais especifico: ", paisEspecifico)

  console.log(error)

  return (
    <>
      <p>Kawaii</p>

      <select
        onChange={(e) => {
          setNomePaisEspecifico(e.target.value);
        }}
        value={nomePaisEspecifico}
      >
        {todosPaises.map((pais) => {
          return (
            <option key={pais.latlng} value={pais.name.common}>
              {pais.name.common}
            </option>
          );
        })}
      </select>

      <div>
        {paisEspecifico.map((dadosDosPaises) => {
            return (
                <div key={dadosDosPaises.latlng}>
                    <h2>{dadosDosPaises.name.common}</h2>
                    <img src={dadosDosPaises.flags.png} alt={dadosDosPaises.name.common} />
                    <p>Capital: {dadosDosPaises.capital}</p>
                    <p>População: {dadosDosPaises.population}</p>
                    <p>continents: {dadosDosPaises.continents}</p>
                    <p>Area: {dadosDosPaises.area}km²</p>
                    <Page1/>
                </div>

                
            )
        })}
      </div>

    </>
  );
}
export default Home;