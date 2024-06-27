export default function NoDataFound({ children, className, id }) {
  return (
    <p className={`${className} no-data-found`} id={id}>
      {children}
    </p>
  );
}
