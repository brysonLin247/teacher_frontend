export const useLocalStroage = () => {
  const user_info = JSON.parse(localStorage.getItem('user_info') || '');
  const { id, is_admin, name, telephone } = user_info;
  return { id, is_admin, name, telephone };
}