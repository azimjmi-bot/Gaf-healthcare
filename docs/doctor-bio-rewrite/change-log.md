# Doctor BIO rewrite — change log

Scope: every Radiation Oncology doctor in India in `src/data/ginger-catalog.json`.

| | |
|---|---|
| Radiation Oncology doctors in scope | 70 |
| Bios rewritten and applied | 68 |
| Flagged for manual review, left unchanged | 2 |
| Word count range of new bios | 200–277 (mean 231) |
| Fields changed per doctor | `bio` only |
| Files changed in production data | `content/catalog-cms.json` |

## How the change was made

Each bio is stored as a CMS overlay entry, `doctorOverrides["<slug>"].bio`, merged over the base
record at read time by `applyCatalogLayer`. Nothing in `src/data/ginger-catalog.json` was edited, and
no override contains a key other than `bio`. The pSEO-locked keys (slug, city, country, specialty,
procedure, treatment and hospital mappings) are rejected by the overlay layer and are absent from
every entry written here.

## Sources and constraints

Every factual statement in a new bio comes from that same doctor's existing record: designation,
hospital, city, years of experience, qualifications, education, affiliations, memberships, awards,
research and the previous bio. No external research, no inference, and no information carried across
from another doctor's profile. Where a record could not support 200 meaningful words without padding
or invention, the doctor was flagged instead of rewritten.

## Verification run after every batch

- `scripts/check-bio-batch.mjs` — 200–300 word range, plus traceability of every capitalised term,
  acronym, degree and year back to that doctor's own record.
- `scripts/apply-bio-batch.mjs` — writes `bio` and nothing else into the overlay.
- `scripts/verify-bio-batch.mjs` — resolves all 2,305 doctors before and after, deep-diffs each one,
  and fails if any field other than `bio` differs or if a pSEO-locked key appears in an override.
- `npm test` — 46 tests, all passing.

## Doctors

| Batch | Doctor | City | Old words | New words | Status |
|---|---|---|---|---|---|
| 01 | Dr. Anil Kumar Anand | Delhi NCR | 197 | 257 | updated |
| 01 | Dr. Ashwin M Shah | Hyderabad | 193 | 269 | updated |
| 01 | Dr. B. Ramakrishna Prasad | Hyderabad | 150 | — | **flagged — unchanged** |
| 01 | Dr. Dipali Bhorikar Borade | Mumbai | 177 | 260 | updated |
| 01 | Dr. Dodul Mondal | Delhi NCR | 197 | 269 | updated |
| 01 | Dr. M. Janarthinakani | Chennai | 189 | 269 | updated |
| 01 | Dr. Naman Utreja | Delhi NCR | 196 | 273 | updated |
| 01 | Dr. Pradeep Kumar Karumanchi | Hyderabad | 204 | 261 | updated |
| 01 | Dr. S. Alex Antony Prasad | Chennai | 209 | 267 | updated |
| 01 | Dr. Sridhar P S | Bengaluru | 188 | 264 | updated |
| 02 | Dr. Aditi Aggarwal | Delhi NCR | 198 | 259 | updated |
| 02 | Dr. Azmi Saundarya K | Chennai | 196 | 254 | updated |
| 02 | Dr. Bharath Chandra Gurram | Hyderabad | 197 | 277 | updated |
| 02 | Dr. Debnarayan Dutta | Hyderabad | 197 | 264 | updated |
| 02 | Dr. Garima Singh | Delhi NCR | 182 | 248 | updated |
| 02 | Dr. Khushboo Rastogi | Delhi NCR | 184 | 230 | updated |
| 02 | Dr. P. Vijay Anand Reddy | Hyderabad | 204 | 268 | updated |
| 02 | Dr. Prahlad Yathiraj | Chennai | 179 | 224 | updated |
| 02 | Dr. Shyam Singh Bisht | Delhi NCR | 189 | 248 | updated |
| 02 | Dr. Vijay Bhasker L | Bengaluru | 209 | 257 | updated |
| 03 | Dr. Anusheel Munshi | Delhi NCR | 168 | 233 | updated |
| 03 | Dr. Charu Garg | Delhi NCR | 176 | 225 | updated |
| 03 | Dr. Indu Bansal Aggarwal | Delhi NCR | 181 | 246 | updated |
| 03 | Dr. K. R. Prasanna Kumar | Chennai | 196 | 241 | updated |
| 03 | Dr. Kalyani Premchandra | Bengaluru | 179 | 229 | updated |
| 03 | Dr. Mayur Mayank | Delhi NCR | 178 | 220 | updated |
| 03 | Dr. Ranjeet Bajpai | Mumbai | 184 | 250 | updated |
| 03 | Dr. Sandeep De | Mumbai | 184 | 235 | updated |
| 03 | Dr. Srinivas Chilukuri | Chennai | 200 | 229 | updated |
| 03 | Dr. Vineeta Goel | Delhi NCR | 181 | 235 | updated |
| 04 | Dr. Anbarasi Kumaresan | Chennai | 197 | 225 | updated |
| 04 | Dr. D. Shiva Prasad | Hyderabad | 182 | 213 | updated |
| 04 | Dr. Kushal Narang | Delhi NCR | 194 | 235 | updated |
| 04 | Dr. M. Suneetha | Hyderabad | 207 | 216 | updated |
| 04 | Dr. S Jayalakshmi | Delhi NCR | 193 | 217 | updated |
| 04 | Dr. Subodh Chandra Pande | Delhi NCR | 209 | 235 | updated |
| 04 | Dr. Swarupa Mitra | Delhi NCR | 205 | 235 | updated |
| 04 | Dr. Tejinder Kataria | Delhi NCR | 193 | 219 | updated |
| 04 | Dr. V. Balasundaram | Chennai | 199 | 238 | updated |
| 04 | Dr. Y. Nalini | Hyderabad | 188 | 238 | updated |
| 05 | Dr. Anita Malik | Delhi NCR | 193 | 223 | updated |
| 05 | Dr. Anitha Gopinath | Bengaluru | 182 | 231 | updated |
| 05 | Dr. Christopher John | Chennai | 196 | 245 | updated |
| 05 | Dr. K. Kiran Kumar | Hyderabad | 176 | 215 | updated |
| 05 | Dr. M. R. Vishwateja | Hyderabad | 178 | 214 | updated |
| 05 | Dr. Natarajan V | Bengaluru | 182 | 208 | updated |
| 05 | Dr. Neha Sehgal | Delhi NCR | 154 | 220 | updated |
| 05 | Dr. Rakesh Jalali | Chennai | 189 | 202 | updated |
| 05 | Dr. Sandeep Goel | Delhi NCR | 173 | 209 | updated |
| 05 | Dr. Susovan Banerjee | Delhi NCR | 187 | 228 | updated |
| 06 | Dr. Amal Roy Chaudhoory | Delhi NCR | 175 | 205 | updated |
| 06 | Dr. Devashish Tripathi | Delhi NCR | 178 | 214 | updated |
| 06 | Dr. G K Jadhav | Delhi NCR | 192 | 202 | updated |
| 06 | Dr. Kamal Verma | Delhi NCR | 164 | 212 | updated |
| 06 | Dr. M Vinay Ural | Bengaluru | 181 | 221 | updated |
| 06 | Dr. Prashant Upadhyay | Hyderabad | 175 | 206 | updated |
| 06 | Dr. Rajeev G | Bengaluru | 181 | 206 | updated |
| 06 | Dr. Satyesh Nadella | Hyderabad | 187 | 207 | updated |
| 06 | Dr. Shilpareddy Keesara | Hyderabad | 184 | 222 | updated |
| 06 | Dr. Vineet Nakra | Delhi NCR | 87 | 212 | updated |
| 07 | Dr. Deepak Gupta | Delhi NCR | 169 | 204 | updated |
| 07 | Dr. Divya Gupta | Delhi NCR | 174 | 201 | updated |
| 07 | Dr. Gowhar Ahmad Shigan | Delhi NCR | 176 | 200 | updated |
| 07 | Dr. Mathangi J | Bengaluru | 154 | 206 | updated |
| 07 | Dr. Neha Kakkar | Delhi NCR | 131 | 207 | updated |
| 07 | Dr. S. Usha | Chennai | 172 | 208 | updated |
| 07 | Dr. Sapna Manocha Verma | Delhi NCR | 62 | 208 | updated |
| 07 | Dr. Sapna Nangia | Chennai | 172 | 215 | updated |
| 07 | Dr. Sravanthi Reddy T | Hyderabad | 183 | 204 | updated |
| 07 | Dr. Sri Sai Tejaswini Muddana | Hyderabad | 89 | — | **flagged — unchanged** |

## Flagged for manual review

- **Dr. B. Ramakrishna Prasad** (Hyderabad, batch 01) — record lacks the education, affiliation,
  membership, award and research detail needed for a 200-word bio.
- **Dr. Sri Sai Tejaswini Muddana** (Hyderabad, batch 07) — record holds only designation, hospital,
  city, 4+ years of experience, an MBBS college and a technique list, with no disease sites,
  memberships, awards or research; the qualifications and education fields also disagree on the
  postgraduate degree.

Both are left exactly as they were. Neither can be completed without new source material being added
to the underlying profile.
