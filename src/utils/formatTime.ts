export const formatTime = (id: string) => {
  const timestamp = parseInt(id.split("-")[0], 10);
  if (isNaN(timestamp)) return new Date().toLocaleTimeString();
  return new Date(timestamp).toLocaleTimeString();
};
