/* eslint-disable @typescript-eslint/no-explicit-any */
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import html from "./html.png";
import css from "./css.png";
import js from "./js.png";

const CodeIDEComponent = ({
  type,
  setType,
  code,
  setCode,
  theme,
  extension,
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  style,
  className,
}: {
  type: string;
  setType: (type: string) => void;
  code: string;
  setCode: (code: string) => void;
  theme: "light" | "oneDark";
  extension: any;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  style?: React.CSSProperties;
  className?: string;
}) => {
  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "4px",
          borderBottom: "1px solid #ccc",
          backgroundColor: "#282c34",
        }}
      >
        <div
          style={{
            width: "200px",
            lineHeight: "40px",
            padding: "0 10px",
            marginRight: "10px",
            color: "#fff",
            cursor: "pointer",
            backgroundColor: type === "html" ? "black" : "#222",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          onClick={() => {
            setType("html");
          }}
        >
          <img
            src={html}
            style={{
              width: "16px",
              height: "auto",
            }}
          />
          main.html
        </div>
        <div
          style={{
            width: "200px",
            lineHeight: "40px",
            padding: "0 10px",
            marginRight: "10px",
            color: "#fff",
            cursor: "pointer",
            backgroundColor: type === "css" ? "black" : "#222",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          onClick={() => {
            setType("css");
          }}
        >
          <img
            src={css}
            style={{
              width: "16px",
              height: "auto",
            }}
          />
          style.css
        </div>
        <div
          style={{
            width: "200px",
            lineHeight: "40px",
            padding: "0 10px",
            marginRight: "10px",
            color: "#fff",
            cursor: "pointer",
            backgroundColor: type === "javascript" ? "black" : "#222",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          onClick={() => {
            setType("javascript");
          }}
        >
          <img
            src={js}
            style={{
              width: "16px",
              height: "auto",
            }}
          />
          script.js
        </div>
      </header>
      <CodeMirror
        value={code}
        height={height}
        width={width}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        minWidth={minWidth}
        minHeight={minHeight}
        style={style}
        className={className}
        theme={theme === "oneDark" ? oneDark : "light"}
        extensions={[extension()]}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
};

export default CodeIDEComponent;
