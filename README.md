# Creative Web S2a

**Josh Joseph**

S2a Checkpoint for Creative Web. Project concept and Svelte student pet list.

---

## Project Concept

### AI User Creator

My current idea is to create a visual web application that lets users configure and test the behaviour of an existing language model. The project would not train a new AI model. Instead, users would change instructions, behaviours and settings, then test how those changes affect the AI's responses.

I want the experience to feel more creative and approachable than existing AI workflow tools. Rather than relying completely on a traditional node editor, I am exploring a system based around large visual building blocks and possibly an AI character that the user creates.

The user could then test their AI in different simulated situations, such as a tutoring environment, a messaging conversation or another everyday scenario. The main interaction would follow a simple loop:

**Build → Test → Observe → Change → Re-run**

The intended audience is people who are interested in AI but may find current tools too technical. I want to use simple language, visual explanations and an interface that encourages experimentation.

Some of my main inspirations so far are **Langflow**, **Flowise**, **Promptfoo**, **Scratch** and **ComfyUI**. These have helped me think about visual building systems, testing AI behaviour and how technical tools could be made easier to understand.

The application could eventually include user accounts, saved AI configurations, persistent results, shareable links and a public area for viewing other users' creations.

The main areas I still need to explore are what the user should learn from each experiment, how the results should be explained, and what will make the experience meaningfully different from existing AI-building tools.

---

## Svelte Project — Student Pet List

The second part of this checkpoint is a small Svelte application that connects students with pets.

### Required features

- [ ] Component composition
- [ ] `bind:value`
- [ ] Shared state using a `.svelte.js` module
- [ ] `{#each}`
- [ ] `{#if}`

### Planned structure

- `App.svelte`
- `StudentForm.svelte`
- `StudentList.svelte`
- `roster.svelte.js`
- `classless.css`