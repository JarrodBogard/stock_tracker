function Input({ type, value, onChange, placeholder }) {
  // Todo: possibly add conditional label prop
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
