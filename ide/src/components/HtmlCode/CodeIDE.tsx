/* eslint-disable @typescript-eslint/no-explicit-any */
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import CodeIDEComponent from "./CodeIDEComponent";
import Preview from "./Preview";
import { useState } from "react";
import "./style.css";

const CodeIDE = ({
  htmlCode,
  cssCode,
  jsCode,
  theme,
  setHtmlCode,
  setCssCode,
  setJsCode,
  setTheme,
}: {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  theme: string;
  setHtmlCode: (code: string) => void;
  setCssCode: (code: string) => void;
  setJsCode: (code: string) => void;
  setTheme: (theme: "light" | "oneDark") => void;
}) => {
  const [typeFile, setTypeFile] = useState("html");
  const data: any = {
    html: {
      code: htmlCode,
      setCode: setHtmlCode,
      extension: html,
    },
    css: {
      code: cssCode,
      setCode: setCssCode,
      extension: css,
    },
    javascript: {
      code: jsCode,
      setCode: setJsCode,
      extension: javascript,
    },
  };
  const updatePreview = () => {
    const previewFrame = document.getElementById(
      "preview-html-css-javascript-frame"
    ) as HTMLIFrameElement;
    const iframeDoc =
      previewFrame.contentDocument || previewFrame.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
        </html>
      `);
      iframeDoc.close();
    }
  };

  return (
    <div>
      <div style={{ display: "flex", width: "100%" }}>
        <div
          className="relative"
          style={{
            flex: 1,
          }}
        >
          <CodeIDEComponent
            setType={setTypeFile}
            type={typeFile}
            code={data[typeFile].code}
            setCode={data[typeFile].setCode}
            theme={theme as "light" | "oneDark"}
            extension={data[typeFile].extension}
            height="500px"
            className="code-ide"
          />
          <div className="absolute">
            <div style={{ marginBottom: "1rem" }}>
              <select
                value={theme}
                onChange={(e) =>
                  setTheme(e.target.value as "oneDark" | "light")
                }
              >
                <option value="oneDark">One Dark</option>
                <option value="light">One Light</option>
              </select>
            </div>
            <button onClick={updatePreview} className="button">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/005/536/604/small_2x/save-icon-in-trendy-line-style-isolated-on-soft-blue-background-free-vector.jpg"
                className="image"
              />
            </button>
          </div>
        </div>
        <Preview
          id="preview-html-css-javascript-frame"
          style={{
            flex: 1,
            border: "2px solid black",
          }}
        />
      </div>
    </div>
  );
};

export default CodeIDE;
