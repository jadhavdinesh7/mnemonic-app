/**
 * A Philosophy of Software Design — Mnemonic Medium Content
 * 
 * Content adapted from John Ousterhout's book, structured as a mnemonic medium essay
 * with expert-placed review cards following quantum.country's principles:
 * 
 * Card placement rules (from studying quantum.country):
 * 1. Cards appear AFTER the concept they test has been fully introduced
 * 2. Cards come in sets of 2-4 questions — not isolated
 * 3. Some cards test the same concept from different angles (multiple encodings)
 * 4. Cards build on each other — earlier cards are simpler
 * 5. Cards test understanding, not just recall — "why" questions alongside "what" questions
 */

export const essayMeta = {
    id: 'philosophy-software-design',
    title: 'A Philosophy of Software Design',
    subtitle: 'The most important ideas, presented in a mnemonic medium',
    author: 'Based on the book by John Ousterhout',
    description: 'Learn the foundational principles of software design through an interactive essay that makes memory a choice.',
    cardCount: 0, // will be computed
    readingTime: '35 min',
};

// Each section has: id, heading, content (array of { type, text/items/cards })
// type can be: 'paragraph', 'heading', 'subheading', 'list', 'blockquote', 'red-flag', 'cards'
export const essaySections = [
    // ============================================================
    // CHAPTER 1: The Problem of Complexity
    // ============================================================
    {
        id: 'the-problem',
        heading: 'The Problem of Complexity',
        content: [
            {
                type: 'paragraph',
                text: 'All of software design can be reduced to one fight: the fight against <strong>complexity</strong>. It is the great monster of software engineering. It slows you down. It makes bugs hide. It makes simple changes feel terrifyingly risky. Every great principle in this essay — every technique, every heuristic — is ultimately a weapon in this fight.'
            },
            {
                type: 'paragraph',
                text: 'John Ousterhout, a professor of computer science at Stanford and the creator of the Tcl scripting language, wrote <em>A Philosophy of Software Design</em> to distill decades of teaching and practice into a single, coherent philosophy. His central argument is both simple and profound: <strong>the most fundamental problem in computer science is managing complexity</strong>. The purpose of design is to make systems easy to understand and modify.'
            },
            {
                type: 'paragraph',
                text: 'This is not a book about algorithms or data structures. It\'s about something harder to teach and more important to master: how to <em>decompose problems</em> so that the resulting system is simple, not just working.'
            },
            {
                type: 'blockquote',
                text: '"The greatest limitation in writing software is our ability to understand the systems we are creating." — John Ousterhout'
            },
        ]
    },

    // ============================================================
    // CHAPTER 2: Complexity Defined
    // ============================================================
    {
        id: 'complexity-defined',
        heading: 'What Is Complexity?',
        content: [
            {
                type: 'paragraph',
                text: 'Ousterhout defines complexity with unusual precision. <strong>Complexity is anything related to the structure of a software system that makes it hard to understand and modify.</strong> It is not about the size of the codebase or the sophistication of the algorithms. A small system can be deeply complex; a large system can be simple.'
            },
            {
                type: 'paragraph',
                text: 'Complexity manifests in three concrete symptoms that every developer has felt:'
            },
            {
                type: 'list',
                items: [
                    '<strong>Change amplification</strong> — a simple change requires modifications in many different places. You change one thing and must chase it across ten files.',
                    '<strong>Cognitive load</strong> — a developer must hold too much information in their head to complete a task. The mental juggling act becomes unbearable.',
                    '<strong>Unknown unknowns</strong> — the most dangerous symptom. It\'s not obvious what you need to know, or what could break. You don\'t even know what questions to ask.'
                ]
            },
            {
                type: 'paragraph',
                text: 'Of these three, <strong>unknown unknowns are the worst</strong>. Change amplification is annoying but visible — you\'ll notice the work. Cognitive load is heavy but at least you know you\'re carrying it. Unknown unknowns are silent. They cause bugs that appear in production weeks later, in code you didn\'t think was related.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-complexity-def',
                        question: 'How does Ousterhout define complexity in a software system?',
                        answer: 'Complexity is anything related to the structure of a software system that makes it hard to understand and modify.'
                    },
                    {
                        id: 'card-three-symptoms',
                        question: 'What are the three symptoms of complexity?',
                        answer: 'Change amplification (one change requires many modifications), cognitive load (too much information to hold in your head), and unknown unknowns (not obvious what could break).'
                    },
                    {
                        id: 'card-worst-symptom',
                        question: 'Which symptom of complexity is the most dangerous, and why?',
                        answer: 'Unknown unknowns — because you don\'t even know what you don\'t know. You can\'t ask the right questions, and bugs surface silently in production.'
                    },
                ]
            },
        ]
    },

    // ============================================================
    // CHAPTER 3: Causes of Complexity
    // ============================================================
    {
        id: 'causes-of-complexity',
        heading: 'The Two Causes of Complexity',
        content: [
            {
                type: 'paragraph',
                text: 'Complexity has exactly two causes: <strong>dependencies</strong> and <strong>obscurity</strong>.'
            },
            {
                type: 'paragraph',
                text: 'A <strong>dependency</strong> exists when a piece of code cannot be understood or modified in isolation — it relates to some other code, and the other code must be considered or changed if the first is changed. Dependencies are fundamental; you can never eliminate them entirely. The goal of design is to <em>reduce the number of dependencies</em> and to <em>make remaining dependencies obvious</em>.'
            },
            {
                type: 'paragraph',
                text: '<strong>Obscurity</strong> occurs when important information is not obvious. It might be a variable name that is too generic, or a dependency that is not documented, or a side effect that is not apparent from the interface. If a developer looking at the code cannot quickly determine what is relevant, the system is obscure.'
            },
            {
                type: 'paragraph',
                text: 'Here\'s the crucial insight: <strong>complexity is incremental</strong>. No single dependency or obscurity, by itself, makes a system complex. Complexity accumulates from hundreds of small decisions. Each shortcut seems reasonable in isolation — "it\'s just a small hack" — but they pile up relentlessly. This is why good software design requires a zero-tolerance philosophy toward complexity, applied consistently in every change.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-two-causes',
                        question: 'What are the two fundamental causes of complexity?',
                        answer: 'Dependencies (code that can\'t be understood or modified in isolation) and obscurity (important information that isn\'t obvious).'
                    },
                    {
                        id: 'card-incremental',
                        question: 'Why does Ousterhout say complexity is "incremental"?',
                        answer: 'No single decision makes a system complex. Complexity accumulates from hundreds of small shortcuts and hacks that each seem reasonable in isolation but pile up relentlessly over time.'
                    },
                ]
            },
        ]
    },

    // ============================================================
    // CHAPTER 4: Strategic vs Tactical
    // ============================================================
    {
        id: 'strategic-vs-tactical',
        heading: 'Working Code Isn\'t Enough',
        content: [
            {
                type: 'paragraph',
                text: 'Ousterhout identifies two fundamentally different mindsets for software development, and argues that choosing between them will determine the long-term quality of your code.'
            },
            {
                type: 'subheading',
                text: 'The Tactical Programmer'
            },
            {
                type: 'paragraph',
                text: '<strong>Tactical programming</strong> treats getting something working as the primary goal. Ship the feature. Fix the bug. Hit the deadline. It feels very productive in the moment. But the tactical programmer introduces complexity with each task — "just a small kludge here, a quick workaround there." Over time, the codebase becomes a minefield.'
            },
            {
                type: 'subheading',
                text: 'The Strategic Programmer'
            },
            {
                type: 'paragraph',
                text: '<strong>Strategic programming</strong> is the opposite mindset. Your primary goal is not just to make code work, but to produce a <em>great design</em>. Working code is a given — the bar is higher. You invest time upfront to find the cleanest solution, knowing this investment will pay for itself many times over as the project evolves.'
            },
            {
                type: 'paragraph',
                text: 'Ousterhout suggests investing about <strong>10-20% of your development time</strong> on improving the design of the system. This is not a luxury; it\'s the minimum investment to prevent the system from degenerating into a tactical disaster. Think of it as paying down technical debt with every commit.'
            },
            {
                type: 'blockquote',
                text: '"The best way to lower development costs is to hire great engineers: they don\'t cost much more than mediocre engineers but have tremendously higher productivity... The most important factor in their productivity is the quality of the codebase they work in."'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-tactical-def',
                        question: 'What is "tactical programming"?',
                        answer: 'A mindset where the primary goal is getting code working — shipping features, fixing bugs. It feels productive but introduces complexity with each task through shortcuts and kludges.'
                    },
                    {
                        id: 'card-strategic-def',
                        question: 'What is "strategic programming" and how does it differ from tactical?',
                        answer: 'Strategic programming prioritizes producing a great design, not just working code. You invest time upfront to find the cleanest solution, preventing long-term complexity accumulation.'
                    },
                    {
                        id: 'card-invest-pct',
                        question: 'How much of your development time does Ousterhout suggest investing in design improvement?',
                        answer: 'About 10-20% of total development time spent on improving the design — this is not a luxury but the minimum to prevent the system from degrading.'
                    },
                ]
            },
        ]
    },

    // ============================================================
    // CHAPTER 5: Deep Modules
    // ============================================================
    {
        id: 'deep-modules',
        heading: 'Modules Should Be Deep',
        content: [
            {
                type: 'paragraph',
                text: 'This is perhaps the most important idea in the entire book. Ousterhout introduces a visual metaphor that, once you see it, changes how you think about every class and function you write.'
            },
            {
                type: 'paragraph',
                text: 'Every module (class, function, service) has two parts: an <strong>interface</strong> and an <strong>implementation</strong>. The interface is what you must know to use the module. The implementation is how it does its job. A module\'s depth is determined by the ratio between these two.'
            },
            {
                type: 'paragraph',
                text: 'A <strong>deep module</strong> has a simple interface but hides a complex implementation. It provides powerful functionality with minimal cognitive cost to its users. Think of the Unix file I/O system: five basic calls (<code>open</code>, <code>read</code>, <code>write</code>, <code>lseek</code>, <code>close</code>) hide an enormously complex implementation dealing with disk blocks, caching, device drivers, and permissions.'
            },
            {
                type: 'paragraph',
                text: 'A <strong>shallow module</strong> is the opposite: its interface is complicated relative to the functionality it provides. Shallow modules don\'t help much in the fight against complexity because they don\'t do enough work to justify the cognitive cost of learning their interface.'
            },
            {
                type: 'red-flag',
                label: 'Red Flag: Shallow Module',
                text: 'A shallow module is one whose interface is complicated relative to the functionality it provides. Shallow modules don\'t reduce overall system complexity.'
            },
            {
                type: 'paragraph',
                text: 'Ousterhout warns against <strong>"classitis"</strong> — the disease of creating too many small, shallow classes on the mistaken belief that "classes should be small." Java\'s I/O system is his canonical example: to read a file with buffering, you must create a <code>FileInputStream</code>, wrap it in a <code>BufferedInputStream</code>, then wrap that in an <code>ObjectInputStream</code>. Three classes to do what Unix does with <code>open</code> plus <code>read</code>.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-interface-impl',
                        question: 'What are the two parts of every module?',
                        answer: 'An interface (what you must know to use it) and an implementation (how it does its job).'
                    },
                    {
                        id: 'card-deep-module-def',
                        question: 'What makes a module "deep"?',
                        answer: 'A deep module has a simple interface but hides a complex implementation — it provides powerful functionality with minimal cognitive cost to its users.'
                    },
                    {
                        id: 'card-shallow-module-def',
                        question: 'What is a "shallow module" and why is it problematic?',
                        answer: 'A shallow module\'s interface is complicated relative to the functionality it provides. It doesn\'t reduce system complexity because the cost of using it (learning the interface) isn\'t justified by the work it does.'
                    },
                    {
                        id: 'card-unix-example',
                        question: 'What example does Ousterhout use to illustrate a deep module?',
                        answer: 'Unix file I/O — just five basic calls (open, read, write, lseek, close) hide enormously complex implementation dealing with disk blocks, caching, device drivers, and permissions.'
                    },
                    {
                        id: 'card-classitis',
                        question: 'What is "classitis"?',
                        answer: 'The disease of creating too many small, shallow classes on the mistaken belief that classes should be small. Java\'s I/O system (FileInputStream → BufferedInputStream → ObjectInputStream) is the classic example.'
                    },
                ]
            },
        ]
    },

    // ============================================================
    // CHAPTER 6: Information Hiding
    // ============================================================
    {
        id: 'information-hiding',
        heading: 'Information Hiding and Leakage',
        content: [
            {
                type: 'paragraph',
                text: 'If deep modules are the goal, then <strong>information hiding</strong> is the primary technique for achieving them. This idea, first articulated by David Parnas in 1971, remains one of the most powerful principles in all of software engineering.'
            },
            {
                type: 'paragraph',
                text: 'The basic idea: each module should encapsulate a few pieces of knowledge — design decisions — within its implementation. These details should <em>not appear in its interface</em>, and should therefore be invisible to other modules. Examples of information that can be hidden:'
            },
            {
                type: 'list',
                items: [
                    'How to store information in a B-tree and access it efficiently',
                    'How to identify which physical disk block corresponds to each logical block in a file',
                    'How to implement the TCP network protocol',
                    'How to parse JSON documents',
                ]
            },
            {
                type: 'paragraph',
                text: 'Information hiding reduces complexity in two ways. First, it <strong>simplifies the interface</strong> — users of the module don\'t need to know the hidden details. Second, it <strong>makes the system easier to evolve</strong> — since no external code depends on the hidden details, those details can be changed without affecting anything else.'
            },
            {
                type: 'paragraph',
                text: 'The opposite of information hiding is <strong>information leakage</strong>. This occurs when a design decision is reflected in multiple modules. If a change to that design decision requires modifications to several modules, information has leaked. One common cause is <strong>temporal decomposition</strong> — structuring code around the order operations happen in time rather than around units of knowledge.'
            },
            {
                type: 'red-flag',
                label: 'Red Flag: Information Leakage',
                text: 'If a design decision is reflected in multiple modules, information has leaked. When a change to that decision requires modifications to several places, you have a design problem.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-info-hiding-def',
                        question: 'What is information hiding?',
                        answer: 'Each module encapsulates design decisions within its implementation, keeping them invisible to other modules by not exposing them in its interface.'
                    },
                    {
                        id: 'card-info-hiding-benefits',
                        question: 'What are the two ways information hiding reduces complexity?',
                        answer: 'First, it simplifies the interface (users don\'t need to know hidden details). Second, it makes the system easier to evolve (hidden details can change without affecting external code).'
                    },
                    {
                        id: 'card-info-leakage',
                        question: 'What is "information leakage" and what causes it?',
                        answer: 'Information leakage occurs when a design decision is reflected in multiple modules, requiring changes to several places when that decision changes. A common cause is temporal decomposition — structuring code around time order rather than units of knowledge.'
                    },
                ]
            },
        ]
    },

    // ============================================================
    // CHAPTER 7: General-Purpose Modules
    // ============================================================
    {
        id: 'general-purpose',
        heading: 'General-Purpose Modules Are Deeper',
        content: [
            {
                type: 'paragraph',
                text: 'One of the most common design questions is: should I make this module general-purpose or special-purpose? Ousterhout\'s answer is nuanced but powerful: <strong>make classes somewhat general-purpose</strong>.'
            },
            {
                type: 'paragraph',
                text: 'The key insight is that general-purpose interfaces tend to be <em>simpler</em> than special-purpose ones. This seems counterintuitive — wouldn\'t a general-purpose module need to do more? Yes, but its <strong>interface</strong> can actually be simpler because it expresses a few powerful operations rather than many specific ones.'
            },
            {
                type: 'paragraph',
                text: 'Ousterhout provides a litmus test. Ask yourself:'
            },
            {
                type: 'list',
                items: [
                    'What is the simplest interface that will cover all my current needs?',
                    'In how many situations will this method be useful? (If only one, it\'s probably too specific.)',
                    'Is this API easy to use for my current needs? (If you have to write a lot of additional code, it\'s too general.)',
                ]
            },
            {
                type: 'paragraph',
                text: 'The sweet spot: the module\'s <em>functionality</em> should reflect current needs, but its <em>interface</em> should be general enough to support multiple uses. This approach also leads to better information hiding — the special-purpose knowledge gets pushed up to the caller, where it belongs.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-general-purpose',
                        question: 'Why do general-purpose interfaces tend to be simpler than special-purpose ones?',
                        answer: 'Because they express a few powerful operations rather than many specific ones. The interface is simpler even though the implementation may do more.'
                    },
                    {
                        id: 'card-sweet-spot',
                        question: 'What is the "sweet spot" for module design regarding generality?',
                        answer: 'The module\'s functionality should reflect current needs, but its interface should be general enough to support multiple uses. Special-purpose knowledge is pushed up to the caller.'
                    },
                ]
            },
        ]
    },

    // ============================================================
    // CHAPTER 8: Pull Complexity Downwards
    // ============================================================
    {
        id: 'pull-complexity-down',
        heading: 'Pull Complexity Downwards',
        content: [
            {
                type: 'paragraph',
                text: 'When you face complexity that must exist somewhere, here\'s Ousterhout\'s rule: <strong>pull it down</strong>. Handle the complexity in the module\'s implementation rather than pushing it onto the user through the interface.'
            },
            {
                type: 'paragraph',
                text: 'This principle follows naturally from deep modules: most modules have far more users than developers. If you push complexity up into the interface, every user pays the cost. If you absorb it in the implementation, the cost is paid once by the module developer rather than repeatedly by every user.'
            },
            {
                type: 'paragraph',
                text: 'A common violation of this principle is <strong>configuration parameters</strong>. Rather than determining a reasonable default, the developer punts the decision to the user: "Hey, what do you want the buffer size to be? What timeout should I use?" Configuration parameters shift complexity upward, making the module shallower. Better to compute reasonable defaults, or make the system adaptive.'
            },
            {
                type: 'red-flag',
                label: 'Red Flag: Configuration Parameters',
                text: 'Configuration parameters are often a sign that the developer is too lazy to determine the right value. They shift complexity upward, making the module shallower.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-pull-down',
                        question: 'What does "pull complexity downwards" mean?',
                        answer: 'Handle complexity in a module\'s implementation rather than pushing it onto users through the interface. The cost is paid once by the developer rather than repeatedly by every user.'
                    },
                    {
                        id: 'card-config-params',
                        question: 'Why does Ousterhout consider configuration parameters a red flag?',
                        answer: 'They shift complexity upward to every user of the module, making the module shallower. It\'s often a sign the developer was too lazy to determine a reasonable default or make the system adaptive.'
                    },
                ]
            },
        ]
    },

    // ============================================================
    // CHAPTER 9: Define Errors Out of Existence  
    // ============================================================
    {
        id: 'errors-out-of-existence',
        heading: 'Define Errors Out of Existence',
        content: [
            {
                type: 'paragraph',
                text: 'Exception handling is one of the worst sources of complexity in software systems. Developers love to throw exceptions — it feels responsible, diligent. But Ousterhout argues it\'s often the opposite: <strong>most exceptions aren\'t necessary</strong>, and defining them creates more problems than it solves.'
            },
            {
                type: 'paragraph',
                text: 'His radical prescription: instead of defining exceptions and then figuring out how to handle them, <strong>redefine the operation so that the error case doesn\'t exist</strong>. Change the semantics so the "normal" behavior handles what used to be an "error."'
            },
            {
                type: 'paragraph',
                text: 'Consider file deletion. In Windows, if a file is in use by another process, the delete operation fails with an error. This sounds "correct," but creates enormous complexity — every caller must handle this case. Unix took the opposite approach: <code>unlink</code> always succeeds immediately, even if the file is open. The file\'s contents are preserved for existing users but the name disappears. The error has been defined out of existence.'
            },
            {
                type: 'paragraph',
                text: 'Another example: Java\'s <code>substring(start, end)</code> method throws <code>IndexOutOfBoundsException</code> if the indices are out of range. Python takes the opposite approach — slicing beyond the string\'s bounds simply returns what\'s available. Fewer exceptions, fewer bugs, simpler code.'
            },
            {
                type: 'paragraph',
                text: 'Ousterhout also describes three other techniques for reducing exception complexity:'
            },
            {
                type: 'list',
                items: [
                    '<strong>Exception masking</strong> — handle exceptions at a low level so they\'re never seen by callers (e.g., TCP automatically retransmits lost packets)',
                    '<strong>Exception aggregation</strong> — handle many different exceptions with a single piece of code rather than individual handlers',
                    '<strong>Just crash</strong> — for truly unexpected errors, sometimes the simplest correct response is to crash and restart',
                ]
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-define-errors-out',
                        question: 'What does "define errors out of existence" mean?',
                        answer: 'Instead of defining exceptions and handling them, redefine the operation\'s semantics so the error case doesn\'t exist — the normal behavior handles what used to be an error.'
                    },
                    {
                        id: 'card-unlink-example',
                        question: 'How does Unix\'s file deletion illustrate "defining errors out of existence"?',
                        answer: 'Unix\'s unlink always succeeds immediately, even if the file is open — the name disappears but contents are preserved for existing users. Unlike Windows, which fails with an error if the file is in use, Unix eliminates the error case entirely.'
                    },
                    {
                        id: 'card-exception-techniques',
                        question: 'Besides defining errors out of existence, what are three other techniques for reducing exception complexity?',
                        answer: 'Exception masking (handle at low level so callers never see them), exception aggregation (one handler for many exception types), and just crash (restart on truly unexpected errors).'
                    },
                ]
            },
        ]
    },

    // ============================================================
    // CHAPTER 10: Design it Twice
    // ============================================================
    {
        id: 'design-it-twice',
        heading: 'Design It Twice',
        content: [
            {
                type: 'paragraph',
                text: 'Ousterhout recommends one of the simplest yet most underused practices in software engineering: <strong>design it twice</strong>. For any important design decision, consider at least two different approaches before committing.'
            },
            {
                type: 'paragraph',
                text: 'The two approaches should be <em>radically different</em>, not minor variations. If you\'re designing a class, sketch two completely different interfaces. If you\'re designing a data structure, consider two fundamentally different representations. Then compare them on factors like simplicity, generality, performance, and ease of modification.'
            },
            {
                type: 'paragraph',
                text: 'This practice works because your first idea is rarely your best. Even if you end up choosing something close to your first design, the exercise of comparing it to a radically different alternative sharpens your understanding of the trade-offs and often leads to a hybrid that\'s better than either original.'
            },
            {
                type: 'paragraph',
                text: 'It also develops your design sense over time. Designing it twice is how you build the intuition that separates great engineers from merely competent ones.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-design-twice',
                        question: 'What does "design it twice" mean, and how different should the alternatives be?',
                        answer: 'For important design decisions, consider at least two approaches before committing. The alternatives should be radically different, not minor variations — fundamentally different interfaces, representations, or structures.'
                    },
                    {
                        id: 'card-design-twice-why',
                        question: 'Why does the "design it twice" practice lead to better designs?',
                        answer: 'Your first idea is rarely your best. Comparing it to a radically different alternative sharpens your understanding of trade-offs and often leads to a hybrid that\'s better than either original.'
                    },
                ]
            },
        ]
    },

    // ============================================================
    // CHAPTER 11: Naming
    // ============================================================
    {
        id: 'naming',
        heading: 'The Power of Names',
        content: [
            {
                type: 'paragraph',
                text: 'Good names are a form of documentation and a form of abstraction. A well-chosen name communicates the purpose and behavior of a variable, method, or class without requiring the reader to dig into the implementation. <strong>Bad names cause bugs.</strong>'
            },
            {
                type: 'paragraph',
                text: 'Ousterhout\'s first rule: <strong>names should create a vivid image</strong> in the reader\'s mind. When someone reads the name, they should immediately have a clear picture of what the thing represents, without ambiguity. If a name requires reading the implementation to understand, it has failed.'
            },
            {
                type: 'paragraph',
                text: 'His second rule: <strong>names should be precise</strong>. Vague names like <code>result</code>, <code>data</code>, <code>tmp</code>, and <code>info</code> are red flags. They tell you nothing specific. Consider the difference between <code>count</code> and <code>numActiveUsers</code>, or between <code>get</code> and <code>fetchFromRemoteServerIfNotCached</code>.'
            },
            {
                type: 'paragraph',
                text: 'He also emphasizes <strong>consistency</strong>: use the same name for the same purpose everywhere, and never use the same name for different purposes. If you call it <code>block</code> in one module and <code>chunk</code> in another for the same concept, you\'re creating unnecessary cognitive load.'
            },
            {
                type: 'red-flag',
                label: 'Red Flag: Vague Name',
                text: 'If a variable or method name is broad enough to be used for many different things, it\'s too vague. Names like result, data, tmp, or info are almost always red flags.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-name-image',
                        question: 'What should a good name do, according to Ousterhout?',
                        answer: 'A good name should create a vivid image in the reader\'s mind — they should immediately have a clear picture of what it represents, without ambiguity or needing to read the implementation.'
                    },
                    {
                        id: 'card-name-precise',
                        question: 'Why does Ousterhout consider names like "result," "data," and "tmp" to be red flags?',
                        answer: 'They are too vague — they could apply to many different things and tell you nothing specific. Names should be precise enough to communicate the exact purpose and behavior.'
                    },
                    {
                        id: 'card-name-consistency',
                        question: 'What is the naming consistency rule?',
                        answer: 'Use the same name for the same purpose everywhere, and never use the same name for different purposes. Inconsistent naming (e.g., "block" vs "chunk" for the same concept) creates unnecessary cognitive load.'
                    },
                ]
            },
        ]
    },

    // ============================================================
    // CHAPTER 12: Code Should be Obvious
    // ============================================================
    {
        id: 'obvious-code',
        heading: 'Code Should Be Obvious',
        content: [
            {
                type: 'paragraph',
                text: 'The ultimate test of good software design: <strong>can someone reading the code quickly understand what it does?</strong> If they can, the code is obvious. If they can\'t — if they need to spend time puzzling, guessing, or reading external documentation — the code is obscure.'
            },
            {
                type: 'paragraph',
                text: 'Obviousness is the single most important quality of code. Not cleverness. Not brevity. Not performance. <em>Obviousness.</em> Obvious code is easier to debug, easier to extend, easier to review, and produces fewer bugs.'
            },
            {
                type: 'paragraph',
                text: 'Things that make code <strong>more</strong> obvious: good names (as we discussed), consistency in coding style, judicious use of whitespace and formatting, and comments that explain things not obvious from the code itself.'
            },
            {
                type: 'paragraph',
                text: 'Things that make code <strong>less</strong> obvious: event-driven programming (control flow is hard to follow), generic containers (what type of data is in this <code>Map</code>?), code that violates the reader\'s expectations, and different coding styles in different parts of the same system.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-obvious-test',
                        question: 'What is the ultimate test of good software design?',
                        answer: 'Can someone reading the code quickly understand what it does? If yes, the code is obvious. If they need to puzzle, guess, or read external documentation, the code is obscure.'
                    },
                    {
                        id: 'card-most-important-quality',
                        question: 'What does Ousterhout consider the most important quality of code?',
                        answer: 'Obviousness — not cleverness, brevity, or performance. Obvious code is easier to debug, extend, review, and produces fewer bugs.'
                    },
                ]
            },
        ]
    },

    // ============================================================
    // EPILOGUE: Principles Summary
    // ============================================================
    {
        id: 'principles-summary',
        heading: 'The Principles, Distilled',
        content: [
            {
                type: 'paragraph',
                text: 'Every principle in this essay is a weapon in the fight against complexity. Here they are, distilled:'
            },
            {
                type: 'list',
                items: [
                    '<strong>Complexity is the enemy.</strong> Everything you do should reduce it.',
                    '<strong>Working code isn\'t enough.</strong> Be a strategic programmer, not a tactical one.',
                    '<strong>Modules should be deep.</strong> Simple interface, complex implementation.',
                    '<strong>Hide information.</strong> Design decisions should be encapsulated, not leaked.',
                    '<strong>General-purpose interfaces are simpler.</strong> Specialize the functionality, not the interface.',
                    '<strong>Pull complexity downwards.</strong> The module developer pays once; the users pay never.',
                    '<strong>Define errors out of existence.</strong> Fewer exceptions = fewer bugs.',
                    '<strong>Design it twice.</strong> Your first idea is probably not your best.',
                    '<strong>Names create images.</strong> Precise, vivid, consistent.',
                    '<strong>Code should be obvious.</strong> If it requires puzzling, redesign it.',
                ]
            },
            {
                type: 'paragraph',
                text: 'These principles are not rules to follow mechanically. They are a way of seeing — a lens through which every design decision can be evaluated. The more you practice them, the more natural they become, until one day they are simply how you think about code.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-deep-vs-shallow',
                        question: 'Compare a deep module to a shallow one using a concrete example.',
                        answer: 'Deep: Unix file I/O — 5 simple calls hide enormous complexity. Shallow: Java\'s I/O — FileInputStream → BufferedInputStream → ObjectInputStream — three classes to do what Unix does with open + read.'
                    },
                    {
                        id: 'card-strategic-investment',
                        question: 'What is the minimum investment Ousterhout recommends for a strategic approach to design?',
                        answer: '10-20% of total development time spent on improving design quality — enough to prevent the system from degenerating into tactical complexity.'
                    },
                ]
            },
        ]
    },
];

// Compute total card count
let _totalCards = 0;
for (const section of essaySections) {
    for (const block of section.content) {
        if (block.type === 'cards') {
            _totalCards += block.cards.length;
        }
    }
}
essayMeta.cardCount = _totalCards;

/**
 * Get all card IDs for this essay.
 */
export function getAllCardIds() {
    const ids = [];
    for (const section of essaySections) {
        for (const block of section.content) {
            if (block.type === 'cards') {
                for (const card of block.cards) {
                    ids.push(card.id);
                }
            }
        }
    }
    return ids;
}

/**
 * Get all cards as a flat array (for review session).
 */
export function getAllCards() {
    const cards = [];
    for (const section of essaySections) {
        for (const block of section.content) {
            if (block.type === 'cards') {
                for (const card of block.cards) {
                    cards.push({ ...card, sectionId: section.id, sectionHeading: section.heading });
                }
            }
        }
    }
    return cards;
}
