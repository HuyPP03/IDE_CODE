const Preview = ({
  id,
  title = "Preview",
  className = "",
  style,
}: {
  id: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return <iframe id={id} style={style} title={title} className={className} />;
};

export default Preview;
