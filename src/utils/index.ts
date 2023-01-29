export const apiBase = "http://localhost:3000/api";

export function checkIfNumber(value: string, setNumber: Function) {
  if (value.length > 0) {
    var reg = /^\d+$/;
    if (reg.test(value)) {
      setNumber(value);
    }
  } else {
    setNumber(value);
  }
}
