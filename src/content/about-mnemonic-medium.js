/**
 * About the Mnemonic Medium — an essay explaining the principle
 * Written in simple language as the user requested ("dumb down the scientific study")
 */

export const aboutEssay = {
    id: 'about-mnemonic-medium',
    title: 'Why You Forget Everything You Read (And How This Medium Fixes It)',
    subtitle: 'The science behind this reading experience, explained simply',
    content: [
        {
            type: 'paragraph',
            text: 'You\'ve probably had this experience: you read a book, loved it, told people about it... and three months later, you can barely remember the key ideas. Maybe you remember a vague feeling — "it was about software complexity" — but the specifics have vanished.'
        },
        {
            type: 'paragraph',
            text: 'This is normal. <strong>Forgetting is the default behavior of the human brain.</strong> It\'s not a bug; it\'s a feature. Your brain is ruthlessly efficient about storage — if you don\'t actively signal that a memory is important, it gets quietly discarded.'
        },
        {
            type: 'heading',
            text: 'The Forgetting Curve'
        },
        {
            type: 'paragraph',
            text: 'In 1885, a German psychologist named Hermann Ebbinghaus discovered something shocking. He memorized lists of nonsense syllables (things like "ZOL" and "DAX") and then measured how quickly he forgot them. He found that memory decays <em>exponentially</em> — you lose about 50% within an hour, 70% within a day, and nearly everything within a week. He called this the <strong>forgetting curve</strong>.'
        },
        {
            type: 'paragraph',
            text: 'This curve applies to everything you read, hear, or learn. That brilliant insight from a book? Gone in a week. That interesting fact from a podcast? Gone in three days. Your brain simply doesn\'t hold onto things by default.'
        },
        {
            type: 'heading',
            text: 'The Trick That Beats the Curve'
        },
        {
            type: 'paragraph',
            text: 'But over the last century, cognitive scientists discovered something else: there\'s a simple trick that <em>flattens</em> the forgetting curve. It\'s called <strong>spaced repetition</strong>.'
        },
        {
            type: 'paragraph',
            text: 'Here\'s how it works: if you test yourself on something at just the right moment — right before you\'re about to forget — your brain consolidates that memory more deeply. Each time you do this, the memory lasts longer. The intervals between tests grow exponentially:'
        },
        {
            type: 'list',
            items: [
                'First test: <strong>5 days</strong> after you first learn it',
                'Second test: <strong>2 weeks</strong> later',
                'Third test: <strong>1 month</strong> later',
                'Fourth test: <strong>3 months</strong> later',
                'Fifth test: <strong>6+ months</strong> later',
            ]
        },
        {
            type: 'paragraph',
            text: 'After just 5 tests — taking maybe <strong>30 seconds each</strong> — you\'ll remember that fact for <em>years</em>. The total time investment is about 2-3 minutes per fact, spread over months. That\'s it. That\'s the whole trick.'
        },
        {
            type: 'heading',
            text: 'Why Don\'t More People Use This?'
        },
        {
            type: 'paragraph',
            text: 'There are tools like <strong>Anki</strong> that implement spaced repetition with flashcards, and they work incredibly well. Medical students use them to memorize thousands of facts. Language learners use them to acquire vocabulary.'
        },
        {
            type: 'paragraph',
            text: 'But there\'s a problem: <strong>creating good flashcards is hard work</strong>. You have to read a book, decide what\'s important, write good questions, and then maintain a separate flashcard habit. Most people give up. The friction is too high.'
        },
        {
            type: 'heading',
            text: 'The Mnemonic Medium: Memory Built Into Reading'
        },
        {
            type: 'paragraph',
            text: 'This is the core innovation behind what you\'re experiencing right now. The <strong>mnemonic medium</strong> — created by Andy Matuschak and Michael Nielsen — takes a different approach: instead of making <em>you</em> create flashcards, the <em>author</em> embeds review cards directly into the text.'
        },
        {
            type: 'paragraph',
            text: 'Think about what this means:'
        },
        {
            type: 'list',
            items: [
                '<strong>The author writes the questions.</strong> They know the material deeply and can craft questions that test genuine understanding, not just recall of surface facts.',
                '<strong>The cards appear in context.</strong> You encounter them right after reading the relevant concept, when your understanding is freshest.',
                '<strong>There\'s zero friction.</strong> No separate app. No card creation. No export/import. You just read normally, and the memory reinforcement happens alongside the reading.',
                '<strong>The computer schedules everything.</strong> You don\'t have to remember to review. The system tracks what you\'ve seen and when you need to see it again.',
            ]
        },
        {
            type: 'heading',
            text: 'Memory as a Choice'
        },
        {
            type: 'paragraph',
            text: 'Here\'s the profound part: normally, remembering what you read is left to chance. You might remember some things if they\'re dramatic enough or if you happen to use them soon. But mostly, the knowledge evaporates.'
        },
        {
            type: 'paragraph',
            text: 'The mnemonic medium turns memory into a <strong>choice</strong>. You decide you want to remember the key ideas of this essay, and the medium guarantees it. That\'s a fundamentally different relationship with text than we\'ve ever had before.'
        },
        {
            type: 'paragraph',
            text: 'The first real implementation of this idea is <a href="https://quantum.country" target="_blank">Quantum Country</a>, a free textbook on quantum computing. Readers who engaged with the review cards demonstrated retention of key concepts for <strong>months and years</strong>, with a total review time investment of less than <strong>2 hours</strong> across more than 100 questions. The return is exponential — every extra minute of review provides more and more benefit.'
        },
        {
            type: 'heading',
            text: 'How This App Works'
        },
        {
            type: 'paragraph',
            text: 'As you read the essays here, you\'ll encounter review cards embedded between sections. Here\'s what to do:'
        },
        {
            type: 'list',
            items: [
                '<strong>Try to answer before revealing.</strong> Even if you\'re not sure, the act of trying to recall strengthens your memory far more than passively reading the answer.',
                '<strong>Be honest.</strong> If you didn\'t remember, click "Didn\'t remember." The system will show you this card again sooner. There\'s no penalty for forgetting — it\'s information your brain needs to consolidate.',
                '<strong>Getting one wrong is good news.</strong> A miss tells the system exactly what to bring back. As Andy Matuschak puts it, the right response to a wrong answer is to throw your hands in the air and shout "wonderful!" — now your brain knows what to work on.',
                '<strong>Come back for reviews.</strong> The real magic happens not during first reading, but during review sessions. Each review takes just a few minutes but extends your retention by weeks or months.',
                '<strong>These questions serve you — not the other way around.</strong> They are never a test or a judgment. If they ever start to feel stressful or make you feel bad, that\'s a signal to stop and come back later. The point is to help you, calmly.',
            ]
        },
        {
            type: 'paragraph',
            text: 'The scheduling algorithm used here is adapted from <a href="https://github.com/andymatuschak/orbit" target="_blank">Orbit</a>, Matuschak\'s open-source spaced repetition platform. It uses a growth factor of 2.3x — meaning each successful review more than doubles the time until the next one. After just 5-6 reviews, you\'re testing at intervals of months.'
        },
        {
            type: 'paragraph',
            text: 'This is not a gimmick. It\'s one of the most robust findings in cognitive science, backed by over a century of research. The only question is: <strong>do you want to remember what you read?</strong>'
        },
        {
            type: 'paragraph',
            text: '<em>If yes, just keep reading. The medium will handle the rest.</em>'
        },
    ]
};
