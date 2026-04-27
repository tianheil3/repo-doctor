#!/usr/bin/env node
import { formatTextReport } from "./report.js";
import { runDoctor } from "./index.js";

const root = process.argv[2] ?? process.cwd();
const result = await runDoctor({ root });

console.log(formatTextReport(result));
process.exitCode = result.ok ? 0 : 1;
