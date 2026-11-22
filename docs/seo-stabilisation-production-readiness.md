# PR #45 — Production Readiness

**Release candidate SHA:** `816e706538d99ade5a5ad8247e36a2cd6b173fe4` (update if follow-up commits land)  
**PR:** https://github.com/azimjmi-bot/Gaf-healthcare/pull/45  
**Base:** `release/stage4-rsc-prod` @ `8eabd88`  
**Verdict:** **APPROVE for owner-controlled merge/deploy** after local validation below. Agent must not merge or deploy.

## Scope lock

| In | Out |
|---|---|
| One permanent redirect + tests + SEO docs | Candidate/NO_MATCH redirects |
| Protected 410/308 untouched | Mass 410, taxonomy, gates, DNS, R2, CF config |

## Expected post-deploy responses

| Request | Expected |
|---|---|
| `GET /treatments/cardiology/pacemaker-implantation` | **308** → `/treatments/pacemaker-implantation-in-india` (single hop on apex) |
| Same + `?utm_source=test` | **308** → successor **with query preserved** |
| `GET /treatments/pacemaker-implantation-in-india` | **200**, self-canonical, indexable (no noindex) |
| `GET https://gafhealthcare.in/treatments/cardiology/pacemaker-implantation` | **301** → apex nested path, then **308** → flat (2 hops; hostname 301 unchanged) |
| EN sitemap | Nested treatment path **absent**; flat successor **present** |

## Deployment checklist (owner only)

1. Confirm PR #45 green / reviewed; tip SHA recorded.
2. Merge into `release/stage4-rsc-prod` (human).
3. Run production Cloudflare build from merged SHA.
4. Publish Worker; confirm version @ 100%.
5. Update R2 `.version.json` stamp to short SHA (existing runbook).
6. Probe nested → one 308; successor 200; Googlebot + browser.
7. Confirm no 1101 on probe set.
8. Start 28-day monitoring (`docs/seo-stabilisation-monitoring-plan.md`).

## Rollback

1. Revert the merge commit on `release/stage4-rsc-prod` **or** redeploy previous Worker version `d54aff0e` / stamp `8eabd88`.
2. Confirm nested path returns to **404** (pre-fix) and successor remains **200**.
3. Do **not** expand 410 list as an emergency substitute for this redirect.

## CI note

This repository has **no `.github/workflows` PR CI**. Release readiness depends on the validation commands in the audit report, not GitHub check runs.
