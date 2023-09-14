type HeaderProp = {
  className?: string;
};
function Header({ className }: HeaderProp) {
  return (
    <header className={`${className}`}>
      <h1>Header</h1>
    </header>
  );
}

export default Header;
