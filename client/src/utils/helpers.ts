export const getApiServer = () => {
  const { protocol, hostname } = window.location
  return hostname === 'localhost'
    ? `${protocol}//${hostname}:8000/api`
    : `${protocol}//${hostname}/api`
}