import { createContext, useContext, useState } from "react";
import { GetAllInvestigacion, subirInvestigacionAPI } from "../api/AdmiInvestigacion";

const InvestigacionContext = createContext();

export const useInvestigacion = () => {
  const context = useContext(InvestigacionContext);
  if (!context) {
    throw new Error("Debe estar dentro de un provider");
  }
  return context;
};

export const InvestigacionProvider = ({ children }) => {
  const [investigaciones, setInvestigaciones] = useState([]);
  const [errors, setErrors] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  const traerInvestigaciones = async () => {
    try {
      const response = await GetAllInvestigacion();
      console.log(response.data)
      setInvestigaciones(response.data);
    } catch (error) {
      console.error("Error al traer investigaciones:", error);
    }
  };

  const sigout = async (data) => {
    try {
      const response = await subirInvestigacionAPI(data);
      setInvestigaciones((prev) => [...prev, response.data]);

      if (response.status >= 200 && response.status <= 399) {
        setMensaje("¡Investigación registrada correctamente!");
        setErrors([]);
      }
    } catch (error) {
      setMensaje(null);
      setErrors(error.response?.data?.errors || [{ msg: "Error desconocido" }]);
    }
  };

  return (
    <InvestigacionContext.Provider
      value={{
        investigaciones,
        traerInvestigaciones,
        sigout,
        mensaje,
        setMensaje,
        errors,
      }}
    >
      {children}
    </InvestigacionContext.Provider>
  );
};