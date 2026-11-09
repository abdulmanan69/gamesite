// All prices are in Pakistani rupees.
export const rs = (n: number) => `Rs ${Math.round(n).toLocaleString('en-US')}`;
