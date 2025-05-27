import { useEffect, useState } from "react";
import MenuLateral from "../components/MenuAdmi_Doc";
import { useForm } from "react-hook-form";
import { UseSimulaciones } from "../context/SimulacionesContex";
import Alerta from "../components/AlertasDocente";
import { useLogin } from "../context/LoginContext";
import { UseCategoria } from "../context/CategoriaContext";
import { Image, FileUp, UploadIcon, Trash2 } from "lucide-react";

const SubirAPK = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const { sigout, errors: SimulacionesErrors, mensaje, setMensaje, setErrors } = UseSimulaciones();
    const { Usuario } = useLogin();
    const [setRegistroExitoso] = useState(false);
    const { TraerCategoria, Categoria } = UseCategoria();
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB

    const archivoAPK = watch('urlArchivoapk');
    const portada = watch('portada');
    const urlDoc = watch('urlDoc');

    // NUEVO: Manejo dinámico de autores
    const [autores, setAutores] = useState([""]);

    const agregarAutor = () => setAutores([...autores, ""]);
    const eliminarAutor = (index) => {
        const nuevosAutores = [...autores];
        nuevosAutores.splice(index, 1);
        setAutores(nuevosAutores);
    };
    const actualizarAutor = (index, valor) => {
        const nuevosAutores = [...autores];
        nuevosAutores[index] = valor;
        setAutores(nuevosAutores);
    };

    useEffect(() => {
        TraerCategoria();
    }, []);

    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                setRegistroExitoso(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [mensaje]);

    useEffect(() => {
        if (SimulacionesErrors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [SimulacionesErrors]);

    return (
        <div className="flex h-screen bg-gray-100">
            {mensaje && (
                <div className="fixed top-5 right-5 z-50">
                    <Alerta tipo="exito" mensaje={mensaje} onClose={() => setMensaje(null)} />
                </div>
            )}

            {SimulacionesErrors.length > 0 && (
                <div className="fixed top-20 right-5 z-50 space-y-2">
                    {SimulacionesErrors.map((error, i) => (
                        <Alerta key={i} tipo="error" mensaje={error.msg} />
                    ))}
                </div>
            )}

            <MenuLateral rol="docente" />

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Subir simulación</h2>

                    <form
                        onSubmit={handleSubmit(async (data) => {
                            const formData = new FormData();
                            formData.append("nombre_proyecto", data.nombre_proyecto);
                            formData.append("descripcion", data.descripcion);
                            formData.append("fechaPublicacion", data.fechaPublicacion);
                            formData.append("materia", data.materia);
                            formData.append("Usuario", Usuario.Id);
                            formData.append("categoriaId", data.categoriaId);

                            // Validación: al menos un autor no vacío
                            const autoresValidos = autores.map(a => a.trim()).filter(a => a !== "");
                            if (autoresValidos.length === 0) {
                                setErrors([{ msg: "Debe ingresar al menos un autor" }]);
                                return;
                            }
                            formData.append("autores", JSON.stringify(autoresValidos));

                            if (data.urlArchivoapk && data.urlArchivoapk[0]) {
                                formData.append("urlArchivoapk", data.urlArchivoapk[0]);
                            }
                            if (data.urlDoc && data.urlDoc[0]) {
                                formData.append("urlDoc", data.urlDoc[0]);
                            }
                            if (data.portada && data.portada[0]) {
                                formData.append("portada", data.portada[0]);
                            }

                            formData.append("seccion", "simulaciones");
                            const resultado = await sigout(formData);
                            if (resultado?.success) {
                                setRegistroExitoso(true);
                            }
                        })}
                        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-1">Nombre de la simulación</label>
                                <input
                                    {...register('nombre_proyecto', { required: true })}
                                    type="text"
                                    className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                                    placeholder="Ej: MiAplicación v1.0"
                                />
                                {errors.nombre_proyecto && (
                                    <p className="text-red-500 text-sm font-semibold">El nombre es requerido</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-1">Autores</label>
                                <div className="space-y-2">
                                    {autores.map((autor, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={autor}
                                                onChange={(e) => actualizarAutor(index, e.target.value)}
                                                placeholder={`Autor ${index + 1}`}
                                                className="w-full border-2 border-gray-200 rounded-md px-3 py-2"
                                            />
                                            {autores.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => eliminarAutor(index)}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Eliminar autor"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={agregarAutor}
                                        className="text-blue-600 font-semibold hover:underline mt-2"
                                    >
                                        + Añadir autor
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-1">Fecha de compilación</label>
                                <input
                                    {...register('fechaPublicacion', { required: true })}
                                    type="datetime-local"
                                    className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                                />
                                {errors.fechaPublicacion && (
                                    <p className="text-red-500 text-sm font-semibold">La fecha es requerida</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-1">Categoría</label>
                                <select
                                    {...register('categoriaId', { required: true })}
                                    className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                                >
                                    <option value="">Seleccionar categoría</option>
                                    {Categoria && Categoria.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.Nombre_Categoria}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoriaId && (
                                    <p className="text-red-500 text-sm font-semibold">Categoría es requerida</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-base font-semibold text-gray-800 mb-1">Descripción técnica</label>
                                <textarea
                                    {...register('descripcion', { required: true })}
                                    rows="4"
                                    className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                                    placeholder="Especificaciones técnicas requeridas"
                                ></textarea>
                                {errors.descripcion && (
                                    <p className="text-red-500 text-sm font-semibold">La descripción es requerida</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-base font-semibold text-gray-800 mb-1">Materia</label>
                                <select
                                    {...register('materia', { required: true })}
                                    className="mt-1 block w-full border-2 border-gray-200 rounded-md px-4 py-2"
                                >
                                    <option value="">Seleccionar materia</option>
                                    <option value="Fisica">Fisica</option>
                                    <option value="ingenieria civil">Ingeniería Civil</option>
                                    <option value="Matematicas">Matemáticas</option>
                                </select>
                                {errors.materia && (
                                    <p className="text-red-500 text-sm font-semibold">La materia es requerida</p>
                                )}
                            </div>
                        </div>

                        {/* Sección de archivos: se mantiene igual */}
                        {/* ... tu sección de carga de archivos APK, PDF e imágenes ... */}

                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                className="w-50 bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-indigo-200/50"
                            >
                                Subir simulación
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default SubirAPK;