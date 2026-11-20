# Create your own Markdown profile and adventure

This starter turns one Markdown file into a public profile and a choose-your-own-adventure that visitors can run in their own AI. [See the finished example at benohanlon.md](https://benohanlon.md/).

## Make your own

**Rebuild prompt**

```text
Reassemble profile.md as a public profile and choose-your-own-adventure for your pilot, the person whose CV or résumé I provide. Read AGENTS.md and follow the standalone italic instructions in profile.md.

Use the CV and any links or notes the pilot provides as evidence. Use benohanlon.md as a finished example of the structure. Replace the fictional profile, cases and starting choices with the pilot’s own work. Ask about gaps that affect the result, and confirm what the pilot wants to make public.

Build both pages and show the pilot a preview for review.
```

1. Click **Use this template** on GitHub and create a repository.
2. Open your copy with an AI that can edit its files. Give it your CV and any links you want to use, then paste the rebuild prompt.
3. Review `profile.md` and open both generated pages. To generate them yourself, run `node scripts/build.cjs`.
4. When you’re ready to publish, commit your changes and enable GitHub Pages from the root of your default branch. Your Markdown will be available at `profile.md` on your site. A custom domain is optional. [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

## Join in

- [Show what you built](https://github.com/benohanlon/profile-md-template/discussions). Share a link and tell us where you got stuck.
- [Contribute to the starter](CONTRIBUTING.md). Report a problem, suggest an improvement or submit a fix.

Built from [benohanlon.md](https://benohanlon.md/). The starter is MIT-licensed. The bundled Markdown parser carries [its own licence notice](scripts/vendor/marked.LICENSE.md).
