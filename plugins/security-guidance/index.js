#!/usr/bin/env node
/**
 * security-guidance — Claude Code PreToolUse hook
 *
 * Reads the tool input from stdin (JSON), scans any file content being
 * written or edited for common security anti-patterns, and prints
 * actionable warnings to stdout so Claude sees them before proceeding.
 *
 * Exit codes:
 *   0  — no issues, or issues found but non-blocking (warnings only)
 *   2  — block the tool use (reserved for critical findings if desired)
 */

const CHECKS = [
  // Command injection
  {
    id: "CMD_INJECTION",
    pattern: /\b(exec|execSync|spawn|spawnSync|child_process)\s*\(/g,
    severity: "HIGH",
    message:
      "Potential command injection: ensure all arguments are validated and never built from user input.",
  },
  {
    id: "SHELL_TRUE",
    pattern: /shell\s*:\s*true/g,
    severity: "HIGH",
    message:
      "`shell: true` in child_process calls enables shell injection. Pass an argument array instead.",
  },
  // XSS
  {
    id: "INNER_HTML",
    pattern: /\.innerHTML\s*=/g,
    severity: "HIGH",
    message:
      "Setting innerHTML directly can introduce XSS. Use textContent or a sanitisation library.",
  },
  {
    id: "DOCUMENT_WRITE",
    pattern: /document\.write\s*\(/g,
    severity: "HIGH",
    message: "document.write() is a classic XSS vector. Prefer DOM APIs.",
  },
  {
    id: "DANGEROUS_SET_INNER_HTML",
    pattern: /dangerouslySetInnerHTML\s*=/g,
    severity: "MEDIUM",
    message:
      "dangerouslySetInnerHTML bypasses React's XSS protections. Sanitise the value with DOMPurify before use.",
  },
  // Code injection
  {
    id: "EVAL",
    pattern: /\beval\s*\(/g,
    severity: "HIGH",
    message:
      "eval() executes arbitrary code. Remove it, or replace with JSON.parse / a safe alternative.",
  },
  {
    id: "FUNCTION_CTOR",
    pattern: /new\s+Function\s*\(/g,
    severity: "HIGH",
    message:
      "new Function() is equivalent to eval(). Avoid constructing functions from strings.",
  },
  // SQL injection
  {
    id: "SQL_CONCAT",
    pattern: /(?:SELECT|INSERT|UPDATE|DELETE|FROM|WHERE).*?\+\s*(?:req\.|params|query|body|user)/gi,
    severity: "HIGH",
    message:
      "SQL query assembled via string concatenation — use parameterised queries / prepared statements.",
  },
  // Hardcoded secrets
  {
    id: "HARDCODED_SECRET",
    pattern:
      /(?:password|secret|api_?key|token|private_?key)\s*[:=]\s*['"`][^'"`]{6,}/gi,
    severity: "MEDIUM",
    message:
      "Possible hardcoded credential. Store secrets in environment variables or a secrets manager.",
  },
  // Prototype pollution
  {
    id: "PROTO_POLLUTION",
    pattern: /\.__proto__\s*[=[]/g,
    severity: "HIGH",
    message:
      "Direct __proto__ mutation can cause prototype pollution. Use Object.create(null) or structuredClone().",
  },
  // Unsafe regex (ReDoS)
  {
    id: "REDOS",
    pattern: /new\s+RegExp\s*\(\s*(?:req\.|params|query|body|user)/g,
    severity: "MEDIUM",
    message:
      "Building RegExp from user input risks ReDoS. Validate and escape the input first.",
  },
];

function extractContent(toolInput) {
  // Works for both Write (full content) and Edit (new_string) tool shapes
  return [toolInput?.content, toolInput?.new_string, toolInput?.old_string]
    .filter(Boolean)
    .join("\n");
}

function main() {
  let raw = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => (raw += chunk));
  process.stdin.on("end", () => {
    let toolInput = {};
    try {
      const parsed = JSON.parse(raw);
      // Claude Code wraps the payload under `tool_input`
      toolInput = parsed?.tool_input ?? parsed;
    } catch {
      // Not JSON — nothing to check
      process.exit(0);
    }

    const content = extractContent(toolInput);
    if (!content) process.exit(0);

    const filePath = toolInput?.file_path ?? toolInput?.path ?? "(unknown file)";
    const findings = [];

    for (const check of CHECKS) {
      check.pattern.lastIndex = 0; // reset stateful regex
      if (check.pattern.test(content)) {
        findings.push(check);
      }
    }

    if (findings.length === 0) process.exit(0);

    const lines = [
      `\n[security-guidance] ${findings.length} potential issue(s) detected in ${filePath}:\n`,
    ];
    for (const f of findings) {
      lines.push(`  [${f.severity}] ${f.id}`);
      lines.push(`  → ${f.message}\n`);
    }
    lines.push(
      "Please review the above before finalising this change. Fix issues or explicitly acknowledge them.\n"
    );

    process.stdout.write(lines.join("\n"));
    // Exit 0 so the tool call is not blocked — these are advisory warnings.
    process.exit(0);
  });
}

main();
