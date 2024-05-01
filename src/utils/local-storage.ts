function getItem(key: string) {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }
  
  function setItem({ key, value }: { key: string; value: any }) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  function removeItem({ key }: { key: string }) {
    localStorage.removeItem(key);
  }
  
  export { getItem, setItem, removeItem };
  