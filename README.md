# Create your own CYOA profile.md

Share your CYOA profile.md alongside your résumé. Someone can give it to their own AI to ask questions about you and explore the parts of your work that matter to them.

You’re the sovereign individual piloting your AI. Give it your résumé and the work you want to share. It uses this template and [benohanlon.md](https://benohanlon.md/benohanlon.md) as structural guides to build your profile.

## Make your own

The starter has bracketed placeholders for your introduction, work preferences, cases, method and writing. Standalone italic paragraphs guide your AI. Use [benohanlon.md](https://benohanlon.md/benohanlon.md) as the live worked example.

**Rebuild prompt**

```text
I’m your pilot. Start with my CV or résumé. If I haven’t shared it yet, ask me for it before drafting. Read AGENTS.md and the standalone italic instructions in the starter profile.md. Read https://benohanlon.md/benohanlon.md as a worked example of how to structure the profile and its adventure.

Build my CYOA profile.md from my résumé and any links, notes or answers I provide. Fill the placeholders with my material. Use Ben’s profile only for structure. Ask me what work I want, where I’m a good fit and which introductions I welcome. Use my supported cases, methods, writing, projects and approved contact routes. Ask a focused question about any material gap and leave out unsupported claims. Write my opening scene and choices, and connect each to evidence about me.

Generate both pages and the agent quickstart. Show me the preview and walk one reader question from the opening to the evidence. Confirm what I want to make public before publishing.
```

1. Click **Use this template** on GitHub and create a repository.
2. Open your copy with an AI that can edit its files. Give it your CV and any links you want to use, then paste the rebuild prompt.
3. Review `profile.md` and open both generated pages. To generate them yourself, run `node scripts/build.cjs`.
4. Before publishing, state in your README which terms apply to the biography, writing and artwork you add. Keep the starter’s MIT notice and the bundled parser’s own notice. When you’re ready to publish, commit your changes and enable GitHub Pages from the root of your default branch. Your Markdown will be available at `profile.md` on your site. A custom domain is optional. [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

## Join in

Ben O’Hanlon is launching this CYOA profile.md template through [AI Builders LCR](https://www.aibuilderslcr.co.uk/), the Liverpool City Region community for people building with AI. Thanks to Alex Keyter ([@a-keyter](https://github.com/a-keyter)) from Generative Minds for helping bring the community together.

- [Show what you built](https://github.com/benohanlon/profile-md-template/discussions). Share a link and tell us where you got stuck.
- [Contribute to the starter](CONTRIBUTING.md). Report a problem, suggest an improvement or submit a fix.

Built from [benohanlon.md](https://benohanlon.md/). The starter is MIT-licensed. The bundled Markdown parser carries [its own licence notice](scripts/vendor/marked.LICENSE.md).
