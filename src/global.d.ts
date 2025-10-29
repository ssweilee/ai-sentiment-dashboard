declare module "*.json" {
  const value: unknown; // instead of any
  export default value;
}
