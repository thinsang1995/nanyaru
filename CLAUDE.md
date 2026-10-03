# CLAUDE.md — nanyaru

## Verify & Git (agent harness)
- Verify: `bash scripts/verify.sh` (next typegen + tsc + eslint --max-warnings=0; không có test) | `--full` (+ next build).
- Package manager: yarn 4.5.3 (Berry). Không dùng npm; `package-lock.json` cũ đã xoá, không tạo lại.
- Nhánh tích hợp = `develop` (từ 03/10/2026). `main` = production (push main = deploy qua deploy.yaml), chỉ nhận PR release develop → main do người dùng merge. Agent: nhánh feature → PR vào `develop`; merge bằng `gh pr merge <số> --squash --repo thinsang1995/nanyaru` sau `VERDICT: MERGE` và CI xanh.
- Session nền (cwd trong .claude/worktrees/*): làm theo plan đã chốt, không hỏi; review tại local (`code-reviewer` + `second-review.sh`) rồi push nhánh MỘT lần + mở PR tiếng Anh với `## Evidence` + báo.
- Sau khi clone/tạo worktree: `git config core.hooksPath .githooks` (pre-push chặn push develop/main; wt-setup.sh tự làm).

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript; eslint 9 flat config; prettier. Không có backend trong repo này.
- Không thêm dependency khi plan không nói. Không sửa file generated.
