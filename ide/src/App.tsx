import { useState } from "react";
import CodeIDE from "./components/HtmlCode/CodeIDE";
import { templates } from "./components/HtmlCode/Data";
// import CodeEditor from "./components/RunCode/CodeMirrorEditor";

const App = () => {
  const [htmlCode, setHtmlCode] = useState<string>(templates.html);
  const [cssCode, setCssCode] = useState<string>(templates.css);
  const [jsCode, setJsCode] = useState<string>(templates.javascript);
  const [theme, setTheme] = useState<"oneDark" | "light">("oneDark");
  return (
    <div>
      <CodeIDE
        htmlCode={htmlCode}
        setHtmlCode={setHtmlCode}
        cssCode={cssCode}
        setCssCode={setCssCode}
        jsCode={jsCode}
        setJsCode={setJsCode}
        theme={theme}
        setTheme={setTheme}
      />
      {/* <CodeEditor
        outp={true}
        height="500px"
        style={{
          width: "700px",
        }}
      /> */}
    </div>
  );
};

export default App;
