---
name: cyoa-profile
description: Turn a CV and evidence of someone’s work into a Choose Your Own Adventure profile.md and a prompt they can send alongside the CV or in a follow-up.
---

# CYOA Profile

Build a Markdown profile that a prospective client, employer or collaborator can explore in their own AI chat. They can start with a question or choose a route through the work.

1. Start with the user's CV or résumé and work samples. Ask what work they want to find and which information or contact details they want to share. If the CV is missing, ask for it before drafting.
2. Read [the public Markdown starter](https://hiddenjobs.ai/profile-md/starter.md) or ask the user to attach it if retrieval fails. Use [Ben’s worked example](https://benohanlon.md/benohanlon.md) for structure when useful. Draw claims about the user from their own supplied material. Ask about material gaps and leave out unsupported claims.
3. Draft the profile with a brief opening, a few distinct choices and links to the user's evidence. Let a reader with their own question start there. Check that the example links resolve and give the reader evidence relevant to their question. Show the draft to the user for review.
4. Give the user a prompt to share alongside their CV or in a follow-up. If the profile is hosted, use: “Read [profile URL]. Let me ask a question about this person's work or choose where to start.” If the user is sharing the Markdown as an attachment, have the recipient point their AI to the attached file.

Return a draft in the chat unless the user asks for a file. Use an existing copy of the [website starter](https://github.com/benohanlon/profile-md-template) only when the user asks for a site. Follow that project's build instructions and show the preview for review. Ask before publishing the user's material or sending the prompt to anyone.
