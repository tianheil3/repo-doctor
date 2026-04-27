export type CheckStatus = "pass" | "fail";

export interface CheckResult {
  id: string;
  title: string;
  status: CheckStatus;
  message: string;
}

export interface DoctorOptions {
  root: string;
}

export type RepoCheck = (options: DoctorOptions) => Promise<CheckResult>;

export interface DoctorResult {
  ok: boolean;
  root: string;
  checks: CheckResult[];
}
