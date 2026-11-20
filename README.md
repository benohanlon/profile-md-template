# Create your own Markdown profile and adventure

Use this template to build a CYOA profile.md for yourself as a sovereign individual piloting your AI. Your AI uses your CV and the work you choose to share to assemble your profile, following the structure of [benohanlon.md](https://benohanlon.md/benohanlon.md). Visitors can then explore your work in their own AI.

## Make your own

**Rebuild prompt**

```text
I’m your pilot. Reassemble the structure of https://benohanlon.md/benohanlon.md into my own CYOA profile.md. Read AGENTS.md and follow the standalone italic instructions in profile.md.

Use my CV or résumé and the links and notes I provide to write the profile and its cases. Shape the starting choices around questions visitors could answer with that evidence. Ask me about gaps that affect the result and confirm what I want to make public.

Build both pages and show me a preview to review.
```

1. Click **Use this template** on GitHub and create a repository.
2. Open your copy with an AI that can edit its files. Give it your CV and any links you want to use, then paste the rebuild prompt.
3. Review `profile.md` and open both generated pages. To generate them yourself, run `node scripts/build.cjs`.
4. When you’re ready to publish, commit your changes and enable GitHub Pages from the root of your default branch. Your Markdown will be available at `profile.md` on your site. A custom domain is optional. [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

## Join in

- [Show what you built](https://github.com/benohanlon/profile-md-template/discussions). Share a link and tell us where you got stuck.
- [Contribute to the starter](CONTRIBUTING.md). Report a problem, suggest an improvement or submit a fix.

Built from [benohanlon.md](https://benohanlon.md/). The starter is MIT-licensed. The bundled Markdown parser carries [its own licence notice](scripts/vendor/marked.LICENSE.md).
