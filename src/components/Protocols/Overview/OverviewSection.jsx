function OverviewSection(props) {
  const { title, children } = props;

  return (
    <div
      style={{
        padding: "20px 0",
        borderTop: "1px solid gray",
      }}
    >
      <h4 style={{ textAlign: "center", color: "#035EAA", marginBottom: 10 }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

export default OverviewSection;
