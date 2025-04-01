import React from 'react';

/**
 * Componente de tabla reutilizable
 * 
 * @param {string} titulo - Título que aparecerá sobre la tabla
 * @param {Array} datos - Los datos que se mostrarán en la tabla
 * @param {Array} columnas - Configuración de las columnas
 * @param {Array} acciones - Acciones disponibles para cada fila
 * @param {function} onFilaClick - Función opcional al hacer click en una fila
 */
const TablaDinamica = ({ titulo, datos, columnas, acciones, onFilaClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {titulo && <h3 className="text-xl font-bold mb-4">{titulo}</h3>}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {columnas.map((col) => (
                <th 
                  key={col.key} 
                  className={`text-left p-3 border-b ${col.className || ''}`}
                >
                  {col.nombre}
                </th>
              ))}
              {acciones && acciones.length > 0 && (
                <th className="text-left p-3 border-b">ACCIONES</th>
              )}
            </tr>
          </thead>
          <tbody>
            {datos.map((item, index) => (
              <tr 
                key={index} 
                className={`hover:bg-gray-50 ${onFilaClick ? 'cursor-pointer' : ''}`}
                onClick={() => onFilaClick && onFilaClick(item)}
              >
                {columnas.map((col) => (
                  <td 
                    key={col.key} 
                    className={`p-3 border-b ${col.className || ''}`}
                  >
                    {col.formateador ? col.formateador(item[col.key], item) : item[col.key]}
                  </td>
                ))}
                
                {acciones && acciones.length > 0 && (
                  <td className="p-3 border-b">
                    <div className="flex space-x-2">
                      {acciones.map((accion, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            accion.fn(item);
                          }}
                          className={`px-3 py-1 rounded ${accion.estilo || 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        >
                          {accion.nombre}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaDinamica;