export const templates = {
  python: `def main():\n    # Your code here\n\nif __name__ == "__main__":\n    main()`,
  cpp: `#include <iostream>\n\nint main() {\n    // Your code here\n    return 0;\n}`,
  c: `#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`,
  rust: `fn main() {\n    // Your code here\n}`,
  go: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}`,
  javascript: `function main() {\n    console.log("Hello, World!");\n}\n\nmain();`,
};
