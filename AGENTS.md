# Rebuild this profile

These instructions are for the AI editing the repository.

1. Start with the pilot’s CV or résumé. If they haven’t supplied it, ask for it before drafting.
2. Read [profile.md](profile.md) and follow its standalone italic instructions. Use [benohanlon.md](https://benohanlon.md/benohanlon.md) only as a worked example of structure and how the adventure uses evidence. Base all claims about the pilot on their résumé and the links, notes or answers they supply. Ask focused questions about material gaps or unclear claims. Omit details that remain unsupported and drop optional sections without evidence. Tailor the starting choices to questions visitors can answer from the resulting profile.
3. Keep the public **Agent instructions** and **Run the full OODA loop** headings. These guide visitors’ AIs through the adventure.
4. Once the profile is ready, remove the template introduction, README prompt link and standalone italic rebuild notes from the new copy. Run `node scripts/build.cjs` and `node scripts/build.cjs --check`. Preview `index.html` and `adventure.html`. Confirm the links and copy actions point to the new profile.
5. Show the owner the preview and ask before publishing their material.
