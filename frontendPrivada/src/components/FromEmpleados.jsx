import { useResource } from "../hooks/useAppContext";
import { useCrudForm } from "../hooks/useCrudForm";
import Boton from "./Boton";

const DEFAULT_VALUES = {
  nombre: "",
  correo: "",
  telefono: "",
  fechaNacimiento: "",
  estado: true,
};

export default function FormRegistroUsuario({ resource = "usuarios" }) {
  const { isModalOpen, editingRecord, closeModal, createItem, updateItem } =
    useResource(resource);

  const {
    register,
    submit,
    reset,
    isSubmitting,
    isEditing,
    formState: { errors },
  } = useCrudForm({
    defaultValues: DEFAULT_VALUES,
    editingRecord,
    onCreate: createItem,
    onUpdate: updateItem,
    onSuccess: closeModal,
  });

  if (!isModalOpen) return null;

  const handleCancel = () => {
    reset(DEFAULT_VALUES);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-[#0b1f4d] text-white rounded-lg shadow-xl w-full max-w-sm p-6"
      >
        <h2 className="text-lg font-semibold text-center mb-6">
          {isEditing ? "Editar Usuario" : "Registro de Usuarios"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Nombre</label>
          <input
            {...register("nombre", { required: "El nombre es obligatorio" })}
            placeholder="Nombre completo"
            className="w-full rounded px-3 py-2 text-sm text-gray-800 focus:outline-none"
          />
          {errors.nombre && (
            <p className="text-red-300 text-xs mt-1">{errors.nombre.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Correo</label>
          <input
            type="email"
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Correo inválido" },
            })}
            placeholder="Correo"
            className="w-full rounded px-3 py-2 text-sm text-gray-800 focus:outline-none"
          />
          {errors.correo && (
            <p className="text-red-300 text-xs mt-1">{errors.correo.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Teléfono</label>
          <input
            {...register("telefono", {
              required: "El teléfono es obligatorio",
              pattern: { value: /^[0-9+\-\s]{8,}$/, message: "Teléfono inválido" },
            })}
            placeholder="Teléfono"
            className="w-full rounded px-3 py-2 text-sm text-gray-800 focus:outline-none"
          />
          {errors.telefono && (
            <p className="text-red-300 text-xs mt-1">{errors.telefono.message}</p>
          )}
        </div>

        <div className="mb-6 flex items-end justify-between gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-1">Fecha de nacimiento</label>
            <input
              type="date"
              {...register("fechaNacimiento", {
                required: "La fecha es obligatoria",
              })}
              className="w-full rounded px-3 py-2 text-sm text-gray-800 focus:outline-none"
            />
          </div>
          <label className="flex flex-col items-center text-xs gap-1">
            Estado
            <input
              type="checkbox"
              {...register("estado")}
              className="h-5 w-5 accent-white"
            />
          </label>
        </div>

        <div className="flex justify-center gap-4">
          <Boton type="submit" variant="secondary" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Agregar"}
          </Boton>
          <Boton type="button" variant="secondary" onClick={handleCancel}>
            Cancelar
          </Boton>
        </div>
      </form>
    </div>
  );
}
