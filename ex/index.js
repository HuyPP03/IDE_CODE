const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const createTempFileName = (language) => {
  const timestamp = Date.now();
  const fileExtension = {
    python: ".py",
    cpp: ".cpp",
    c: ".c",
    java: ".java",
    rust: ".rs",
    go: ".go",
    javascript: ".js",
  }[language];
  return `temp_${timestamp}${fileExtension}`;
};

const runCode = (language, code, input = null) => {
  return new Promise((resolve, reject) => {
    const fileName = createTempFileName(language);
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath, code);

    let command;
    switch (language) {
      case "python":
        command = `echo "${input}" | python ${filePath}`;
        break;
      case "cpp":
        command = `g++ ${filePath} -o ${filePath}.out && echo "${input}" | ${filePath}.out`;
        break;
      case "c":
        command = `gcc ${filePath} -o ${filePath}.out && echo "${input}" | ${filePath}.out`;
        break;
      case "java":
        command = `javac ${filePath} && echo "${input}" | java ${path.basename(
          filePath,
          ".java"
        )}`;
        break;
      case "rust":
        command = `rustc ${filePath} -o ${filePath}.out && echo "${input}" | ${filePath}.out`;
        break;
      case "go":
        command = `echo "${input}" | go run ${filePath}`;
        break;
      case "javascript":
        command = `echo "${input}" | node ${filePath}`;
        break;
      default:
        return reject("Ngôn ngữ không được hỗ trợ!");
    }

    exec(command, (err, stdout, stderr) => {
      // Xóa file tạm
      fs.unlinkSync(filePath);
      if (
        (language === "cpp" || language === "c" || language === "rust") &&
        fs.existsSync(`${filePath}.out`)
      ) {
        fs.unlinkSync(`${filePath}.out`);
      }

      if (err) return resolve(stderr);
      resolve(stdout.trim() || "No output");
    });
  });
};

app.post("/run-code", async (req, res) => {
  const { language, code, problemId } = req.body;
  try {
    // Lấy input từ database dựa trên problemId (giả sử bạn lấy input từ đây)
    let input; // Ví dụ input cố định
    const output = await runCode(language, code, input);
    res.json({ success: true, output });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() });
  }
});

app.get("/", (req, res) => {
  res.send("Hello, this is a simple code execution API!");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
