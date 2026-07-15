import { createContext, useCallback, useMemo, useReducer } from "react";


const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

const initialState = {
  items: {},
  loading: {},
  error: {},
  search: {},
  modal: {
    resource: null,
    open: false,
    record: null,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: { ...state.loading, [action.resource]: action.value },
      };
    case "SET_ERROR":
      return {
        ...state,
        error: { ...state.error, [action.resource]: action.value },
      };
    case "SET_ITEMS":
      return {
        ...state,
        items: { ...state.items, [action.resource]: action.payload },
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: {
          ...state.items,
          [action.resource]: [
            action.payload,
            ...(state.items[action.resource] ?? []),
          ],
        },
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: {
          ...state.items,
          [action.resource]: (state.items[action.resource] ?? []).map((it) =>
            it.id === action.payload.id ? action.payload : it
          ),
        },
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: {
          ...state.items,
          [action.resource]: (state.items[action.resource] ?? []).filter(
            (it) => it.id !== action.id
          ),
        },
      };
    case "SET_SEARCH":
      return {
        ...state,
        search: { ...state.search, [action.resource]: action.value },
      };
    case "OPEN_MODAL":
      return {
        ...state,
        modal: { resource: action.resource, open: true, record: action.record ?? null },
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: { resource: null, open: false, record: null },
      };
    default:
      return state;
  }
}

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchItems = useCallback(async (resource) => {
    dispatch({ type: "SET_LOADING", resource, value: true });
    dispatch({ type: "SET_ERROR", resource, value: null });
    try {
      const res = await fetch(`${API_BASE_URL}/${resource}`);
      if (!res.ok) throw new Error(`No se pudo cargar ${resource}`);
      const data = await res.json();
      dispatch({ type: "SET_ITEMS", resource, payload: data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", resource, value: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", resource, value: false });
    }
  }, []);

  const createItem = useCallback(async (resource, values) => {
    const res = await fetch(`${API_BASE_URL}/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error(`No se pudo crear el registro en ${resource}`);
    const created = await res.json();
    dispatch({ type: "ADD_ITEM", resource, payload: created });
    return created;
  }, []);

  const updateItem = useCallback(async (resource, id, values) => {
    const res = await fetch(`${API_BASE_URL}/${resource}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error(`No se pudo actualizar el registro en ${resource}`);
    const updated = await res.json();
    dispatch({ type: "UPDATE_ITEM", resource, payload: updated });
    return updated;
  }, []);

  const removeItem = useCallback(async (resource, id) => {
    const res = await fetch(`${API_BASE_URL}/${resource}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`No se pudo eliminar el registro en ${resource}`);
    dispatch({ type: "REMOVE_ITEM", resource, id });
  }, []);

  const setSearch = useCallback((resource, value) => {
    dispatch({ type: "SET_SEARCH", resource, value });
  }, []);

  const openModal = useCallback((resource, record = null) => {
    dispatch({ type: "OPEN_MODAL", resource, record });
  }, []);

  const closeModal = useCallback(() => dispatch({ type: "CLOSE_MODAL" }), []);

  const value = useMemo(
    () => ({
      state,
      fetchItems,
      createItem,
      updateItem,
      removeItem,
      setSearch,
      openModal,
      closeModal,
    }),
    [state, fetchItems, createItem, updateItem, removeItem, setSearch, openModal, closeModal]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
