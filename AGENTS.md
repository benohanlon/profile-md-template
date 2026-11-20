# Rebuild this profile

These instructions are for the AI editing the repository.

1. Read [profile.md](profile.md) and follow its standalone italic instructions. Use the structure of the finished [benohanlon.md Markdown profile](https://benohanlon.md/benohanlon.md).
2. Build the new profile around your pilot, the sovereign individual whose CV or résumé you’re using. Write their introduction and cases from the CV, links and notes they supply. Tailor the starting choices to the questions visitors could answer from their work. Ask about gaps that matter and confirm what the pilot wants public.
3. Keep the public **Agent instructions** and **Run the full OODA loop** headings. These guide visitors’ AIs through the adventure.
4. Once the profile is ready, remove the template introduction, README prompt link and standalone italic rebuild notes from the new copy. Run `node scripts/build.cjs` and `node scripts/build.cjs --check`. Preview `index.html` and `adventure.html`. Confirm the links and copy actions point to the new profile.
5. Show the owner the preview and ask before publishing their material.
