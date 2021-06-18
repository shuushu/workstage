const Layout = ({ id, children }) => {
  return (
    <div id={id ? id : "layout"}>
      <main>{children}</main>
    </div>
  );
};
export default Layout;
