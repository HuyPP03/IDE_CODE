import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";
import { go } from "@codemirror/lang-go";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import axios from "axios";
import { templates } from "./Data";
import run from "./run-code.jpg";

const CodeEditor = ({
  serverUrl,
  outp,
  style,
  className,
  height,
}: {
  serverUrl?: string;
  outp?: boolean;
  style?: React.CSSProperties;
  className?: string;
  height?: string;
}) => {
  const [language, setLanguage] = useState<
    "python" | "cpp" | "c" | "java" | "rust" | "go" | "javascript"
  >("cpp");
  const [code, setCode] = useState<string>(templates["cpp"]);
  const [theme, setTheme] = useState<"oneDark" | "oneLight">("oneDark");
  const [output, setOutput] = useState<string>("");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as typeof language;
    setLanguage(lang);
    setCode(templates[lang]);
  };

  const runCode = async () => {
    try {
      console.log(1);
      const response = await axios.post(
        serverUrl || "http://localhost:5000/run-code",
        {
          language,
          code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOutput(response.data.output);
    } catch (error) {
      setOutput(JSON.stringify(error));
    }
  };

  return (
    <div
      style={{
        position: "relative",
        ...style,
      }}
      className={className}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: "1rem",
          position: "absolute",
          top: 0,
          right: 0,
          padding: "0.5rem",
          zIndex: 100,
        }}
      >
        <select value={language} onChange={handleLanguageChange}>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="rust">Rust</option>
          <option value="go">Go</option>
          <option value="javascript">JavaScript</option>
        </select>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as "oneDark" | "oneLight")}
        >
          <option value="oneDark">One Dark</option>
          <option value="oneLight">One Light</option>
        </select>
        <button
          onClick={runCode}
          style={{
            borderRadius: "6px",
          }}
        >
          <img
            src={run}
            alt="Run Code"
            style={{
              width: "30px",
              height: "30px",
              cursor: "pointer",
            }}
          />
        </button>
      </div>
      <CodeMirror
        value={code}
        height={height}
        theme={theme === "oneDark" ? oneDark : "light"}
        extensions={
          language === "python"
            ? [python()]
            : language === "cpp" || language === "c"
            ? [cpp()]
            : language === "java"
            ? [java()]
            : language === "rust"
            ? [rust()]
            : language === "go"
            ? [go()]
            : language === "javascript"
            ? [javascript()]
            : []
        }
        onChange={(value) => setCode(value)}
        style={{
          fontSize: "15px",
          lineHeight: "1.5",
          border: "2px solid #ddd",
        }}
      />
      {outp && (
        <div
          style={{
            marginTop: "1rem",
            borderTop: "1px solid #ddd",
            paddingTop: "1rem",
          }}
        >
          <h3>Output</h3>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#f5f5f5",
              padding: "1rem",
            }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
