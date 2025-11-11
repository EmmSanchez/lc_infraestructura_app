export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    // Añadimos timeZone: 'UTC' para evitar problemas de desfase de un día
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch (error) {
    return dateString; // Devuelve el original si falla
  }
};
