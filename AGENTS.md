<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- GitHub Pages: `.github/workflows/deploy-pages.yml` builds a static SPA when `GITHUB_PAGES_BASE` is set; keep asset/link paths relative to `import.meta.env.BASE_URL` because Pages serves from /<repo>/.
