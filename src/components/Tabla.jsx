import React from 'react';

const TablaDinamica = ({ titulo, datos, columnas, acciones, onFilaClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {titulo && <h3 className="text-lg font-semibold p-4 bg-gray-50 border-b">{titulo}</h3>}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 text-sm font-medium">
              {columnas.map((col) => (
                <th 
                  key={col.key} 
                  className={`p-3 ${col.className || ''}`}
                >
                  {col.nombre}
                </th>
              ))}
              {acciones && acciones.length > 0 && (
                <th className="p-3 text-right">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {datos.map((item, index) => (
              <tr 
                key={index} 
                className={`hover:bg-gray-50 ${onFilaClick ? 'cursor-pointer' : ''}`}
                onClick={() => onFilaClick && onFilaClick(item)}
              >
                {columnas.map((col) => (
                  <td 
                    key={col.key} 
                    className={`p-3 text-sm ${col.className || ''}`}
                  >
                    {col.formateador ? col.formateador(item[col.key], item) : item[col.key]}
                  </td>
                ))}
                
                {acciones && acciones.length > 0 && (
                  <td className="p-3">
                    <div className="flex justify-end space-x-2">
                      {acciones.map((accion, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            accion.fn(item);
                          }}
                          className={`text-xs px-3 py-1 rounded transition-colors ${
                            typeof accion.estilo === 'function' 
                              ? accion.estilo(item)
                              : accion.estilo
                          }`}
                        >
                          {typeof accion.nombre === 'function' 
                            ? accion.nombre(item) 
                            : accion.nombre}
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