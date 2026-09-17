# CLAUDE.md — nanyaru

## Verify & Git (agent harness)
- Verify: `bash scripts/verify.sh` (next typegen + tsc + eslint --max-warnings=0; không có test) | `--full` (+ next build).
- Package manager: yarn 4.5.3 (Berry). Không dùng npm; `package-lock.json` cũ đã xoá, không tạo lại.
- Nhánh tích hợp = `main` (repo chỉ có main; push main = deploy production qua deploy.yaml). Agent: nhánh feature → PR vào `main`, KHÔNG merge (hook chặn merge vào main); người dùng merge sau khi review.
- Session nền (cwd trong .claude/worktrees/*): làm theo plan đã chốt, không hỏi; xong thì push nhánh + mở PR + báo.
- Sau khi clone/tạo worktree: `git config core.hooksPath .githooks` (pre-push chặn push develop/main; wt-setup.sh tự làm).

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript; eslint 9 flat config; prettier. Không có backend trong repo này.
- Không thêm dependency khi plan không nói. Không sửa file generated.
