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
    subtitle: 'The most important ideas, explained like a friend would',
    author: 'Based on the book by John Ousterhout',
    description: 'Learn the foundational principles of software design through a brain-friendly essay with built-in memory superpowers.',
    cardCount: 0, // will be computed
    readingTime: '40 min',
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
                text: 'Picture this: you open a codebase to make a "simple" change. Three hours later, you\'re still at it — touching files you didn\'t know existed, scared you\'ll break something. Sound familiar?'
            },
            {
                type: 'paragraph',
                text: 'That feeling? It has a name. It\'s called <strong>complexity</strong>. And it\'s the single biggest enemy in all of software engineering. Every technique in this essay — every principle, every trick — is a weapon to fight it.'
            },
            {
                type: 'paragraph',
                text: '<a href="https://en.wikipedia.org/wiki/John_Ousterhout" target="_blank">John Ousterhout</a>, a Stanford professor who created the <a href="https://en.wikipedia.org/wiki/Tcl" target="_blank">Tcl programming language</a>, spent decades watching students write code. He noticed something: <strong>the hardest part of programming isn\'t algorithms or data structures — it\'s managing complexity.</strong>'
            },
            {
                type: 'paragraph',
                text: 'So he wrote <em>A Philosophy of Software Design</em> to answer one question: how do you <a href="https://en.wikipedia.org/wiki/Decomposition_(computer_science)" target="_blank">decompose problems</a> so the resulting system stays simple — not just today, but as it evolves?'
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
                text: 'Here\'s the thing most developers get wrong about complexity: they think it means "big codebase" or "fancy <a href="https://en.wikipedia.org/wiki/Algorithm" target="_blank">algorithms</a>." It doesn\'t.'
            },
            {
                type: 'paragraph',
                text: 'Ousterhout\'s definition is surprisingly simple: <strong>complexity is anything that makes your code hard to understand or change.</strong> That\'s it. A 200-line module with three config flags that interact in weird ways? That\'s complex. A 2,000-line module with a clean <a href="https://en.wikipedia.org/wiki/API" target="_blank">API</a>? That might actually be simple.'
            },
            {
                type: 'paragraph',
                text: 'You\'ll feel complexity in three ways — and you\'ve probably already experienced all three:'
            },
            {
                type: 'list',
                items: [
                    '<strong>Change amplification</strong> — you change one thing, then have to chase it across ten files. Like pulling one thread and having the whole sweater unravel.',
                    '<strong>Cognitive load</strong> — you need to hold so many details in your head just to make a change. It\'s like juggling ten balls at once while someone keeps throwing more.',
                    '<strong>Unknown unknowns</strong> — the scary one. You don\'t even know what you don\'t know. You make a change, it works fine in tests, then production breaks two weeks later.'
                ]
            },
            {
                type: 'paragraph',
                text: 'Of these three, <strong>unknown unknowns are the worst</strong> — and it\'s not close. Change amplification is annoying, but at least you can see the work. Cognitive load is exhausting, but at least you know you\'re struggling. Unknown unknowns? They\'re silent. They\'re bugs hiding in code you didn\'t even think was related to your change.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-complexity-def',
                        question: 'How does Ousterhout define complexity in a software system?',
                        answer: 'Anything related to the structure of a software system that makes it hard to understand and modify. It\'s not about size or sophistication — a small system can be deeply complex if it\'s hard to change.'
                    },
                    {
                        id: 'card-complexity-app',
                        question: 'A 200-line module has 3 configuration flags with subtle interactions. A 2,000-line module has a clean API and no surprises. Which is more complex in Ousterhout\'s definition?',
                        answer: 'The 200-line module. Complexity is not about size — it\'s about how hard the system is to understand and modify.'
                    },
                    {
                        id: 'card-unknown-unknowns',
                        question: 'Why are unknown unknowns the most dangerous symptom of complexity?',
                        answer: 'Because you don\'t know what you don\'t know — there\'s no way to discover the problem until a bug appears. Change amplification is visible; cognitive load is heavy but known. Unknown unknowns are silent.'
                    },
                    {
                        id: 'card-unknown-unknowns-reverse',
                        question: '"I changed one line and it broke something in a completely different file I didn\'t know was related." Which symptom of complexity is this?',
                        answer: 'Unknown unknowns — you didn\'t know what you needed to know. The dependency was invisible.'
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
                text: 'So where does complexity actually come from? Ousterhout boils it down to just two things: <strong>dependencies</strong> and <strong>obscurity</strong>.'
            },
            {
                type: 'paragraph',
                text: 'A <strong><a href="https://en.wikipedia.org/wiki/Coupling_(computer_programming)" target="_blank">dependency</a></strong> means you can\'t understand or change one piece of code without considering another. Think of it like a chain — pull one link, and the rest moves too. You can\'t eliminate dependencies entirely (code has to talk to other code), but you can <em>reduce them</em> and <em>make the remaining ones obvious</em>.'
            },
            {
                type: 'paragraph',
                text: '<strong>Obscurity</strong> is when important information is hiding. Maybe a variable name is too vague. Maybe there\'s a side effect that isn\'t obvious from the interface. You look at the code and think "I get it" — but you\'re actually missing something critical.'
            },
            {
                type: 'paragraph',
                text: 'Now here\'s the really scary part: <strong>complexity is incremental.</strong> No single hack makes a system complex. It\'s death by a thousand paper cuts. Each shortcut feels harmless — "it\'s just one small workaround" — but they pile up. This is why Ousterhout demands <em>zero tolerance</em> toward complexity, in every single commit.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-obscurity-reverse',
                        question: '"A developer looking at the code cannot quickly determine what is relevant." What is Ousterhout\'s term for this cause of complexity?',
                        answer: 'Obscurity — when important information is not obvious. It creates unknown unknowns and contributes to cognitive load.'
                    },
                    {
                        id: 'card-incremental',
                        question: 'Why does Ousterhout say complexity is "incremental"?',
                        answer: 'No single shortcut makes a system complex. Complexity accumulates from hundreds of small dependencies and obscurities that each seem harmless in isolation.'
                    },
                    {
                        id: 'card-incremental-app',
                        question: 'A team adds a small workaround to hit a deadline. The code review passes — it\'s "just one small hack." What principle explains why this is still dangerous?',
                        answer: 'Complexity is incremental — each small hack seems individually harmless, but hundreds of them make the system unmaintainable. This is why Ousterhout demands a "zero tolerance" philosophy.'
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
                text: 'Here\'s a question that will change how you write code: <strong>what\'s your primary goal when you sit down to program?</strong> Your answer reveals which of two mindsets you operate in — and Ousterhout argues it determines everything about your code\'s future.'
            },
            {
                type: 'subheading',
                text: 'The Tactical Programmer'
            },
            {
                type: 'paragraph',
                text: 'The tactical programmer\'s goal? <strong>Get it working.</strong> Ship the feature. Fix the bug. Hit the deadline. It feels productive — you\'re cranking out tickets! But each task leaves behind a little mess. "Just a small kludge here, a quick workaround there." Over a few months, the codebase turns into a minefield where nobody wants to touch anything.'
            },
            {
                type: 'subheading',
                text: 'The Strategic Programmer'
            },
            {
                type: 'paragraph',
                text: 'The strategic programmer\'s goal? <strong>Produce a great design</strong> — not just working code. Working code is the bare minimum. You invest time to find the <em>cleanest</em> solution, because you know that investment pays for itself as the project grows.'
            },
            {
                type: 'paragraph',
                text: 'How much time? Ousterhout says <strong>10-20% of your development time</strong> should go toward improving design. Sounds expensive, right? But here\'s the magic: within a few months, the benefits from past investments save more time than future investments cost. Think of it like compound interest, but for <a href="https://en.wikipedia.org/wiki/Technical_debt" target="_blank">technical debt</a>.'
            },
            {
                type: 'blockquote',
                text: '"The best way to lower development costs is to hire great engineers: they don\'t cost much more than mediocre engineers but have tremendously higher productivity... The most important factor in their productivity is the quality of the codebase they work in."'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-tactical-reverse',
                        question: '"Just a small kludge here, a quick workaround there — it won\'t matter." What programming mindset produces this attitude?',
                        answer: 'Tactical programming — prioritizing working code over clean design. Each shortcut adds incremental complexity that accumulates into an unmaintainable codebase.'
                    },
                    {
                        id: 'card-strategic-def',
                        question: 'In strategic programming, what is your primary goal?',
                        answer: 'To produce a great design — not just working code. Working code is a given; the bar is higher. You invest time upfront knowing the payoff comes as the project evolves.'
                    },
                    {
                        id: 'card-invest-pct',
                        question: 'How much development time does Ousterhout suggest investing in design improvement, and why does this pay for itself?',
                        answer: 'About 10-20%. Within a few months, the benefits from past investments save enough time to cover future investments — so the 10-20% becomes free.'
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
                text: 'This is the big idea — the one concept that, once you get it, changes how you look at every class and function you write.'
            },
            {
                type: 'paragraph',
                text: 'Every <a href="https://en.wikipedia.org/wiki/Modular_programming" target="_blank">module</a> (class, function, service — anything you can use as a building block) has two parts: its <strong>interface</strong> (what you need to know to use it) and its <strong>implementation</strong> (how it actually works inside). The magic number is the <em>ratio</em> between these two.'
            },
            {
                type: 'paragraph',
                text: 'Imagine a vending machine. You press a button, you get a drink. Simple interface. But inside, there\'s a mini-factory: refrigeration, coin counting, inventory tracking. That\'s a <strong>deep module</strong> — simple to use, powerful inside.'
            },
            {
                type: 'paragraph',
                text: '<a href="https://en.wikipedia.org/wiki/Unix" target="_blank">Unix</a> file I/O is the classic software example: just five calls (<code>open</code>, <code>read</code>, <code>write</code>, <code>lseek</code>, <code>close</code>) hide over 100,000 lines dealing with disk blocks, <a href="https://en.wikipedia.org/wiki/Cache_(computing)" target="_blank">caching</a>, device drivers, and permissions. That\'s deep.'
            },
            {
                type: 'paragraph',
                text: 'A <strong>shallow module</strong> is the opposite — its interface is almost as complicated as what it does. It\'s like a vending machine where you have to select the shelf number, the column number, insert the exact change in a specific coin order, and then pull a lever. Not worth the effort.'
            },
            {
                type: 'red-flag',
                label: 'Red Flag: Shallow Module',
                text: 'A shallow module is one whose interface is complicated relative to the functionality it provides. Shallow modules don\'t reduce overall system complexity.'
            },
            {
                type: 'paragraph',
                text: 'And here\'s a trap many developers fall into: <strong>"classitis"</strong> — creating tons of tiny classes because someone told them "classes should be small." <a href="https://en.wikipedia.org/wiki/Java_(programming_language)" target="_blank">Java</a>\'s I/O system is the textbook example: to read a file with buffering, you need <code>FileInputStream</code> → <code>BufferedInputStream</code> → <code>ObjectInputStream</code>. Three classes to do what Unix does with <code>open</code> + <code>read</code>. Each class is shallow — the real cost is in learning how to wire them together.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-deep-module-def',
                        question: 'What makes a module "deep"?',
                        answer: 'It has a simple interface but hides a complex implementation — providing powerful functionality with minimal cognitive cost to users. Think of module depth as the ratio of hidden functionality to interface complexity.'
                    },
                    {
                        id: 'card-deep-module-app',
                        question: 'Unix file I/O has 5 calls (open, read, write, lseek, close) hiding 100K+ lines. Java requires FileInputStream → BufferedInputStream → ObjectInputStream just to read a buffered file. Which is deeper, and why?',
                        answer: 'Unix is deep — simple interface, massive hidden complexity. Java\'s I/O is shallow — the interface complexity (3 classes, specific wiring order) is nearly as great as what it provides.'
                    },
                    {
                        id: 'card-classitis-reverse',
                        question: '"Each class is individually simple, but there are so many small classes that the system-level interface complexity is enormous." What does Ousterhout call this disease?',
                        answer: 'Classitis — the mistaken belief that "classes should be small." Small classes don\'t contribute much functionality, so you need many of them, and their interfaces accumulate into tremendous system-level complexity.'
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
                text: 'So we know deep modules are the goal. But how do you <em>actually build</em> one? The answer: <strong><a href="https://en.wikipedia.org/wiki/Information_hiding" target="_blank">information hiding</a></strong>. This idea was first described by <a href="https://en.wikipedia.org/wiki/David_Parnas" target="_blank">David Parnas</a> back in 1971, and it\'s still one of the most powerful concepts in software.'
            },
            {
                type: 'paragraph',
                text: 'The core idea is straightforward: each module should keep its <em>design decisions</em> locked inside its implementation. They shouldn\'t leak out into the interface. Think of it like a restaurant kitchen — as a customer, you just order from the menu. You don\'t need to know the chef\'s recipes, the supplier\'s delivery schedule, or how the dishwasher works.'
            },
            {
                type: 'paragraph',
                text: 'What kind of stuff should be hidden? Things like:'
            },
            {
                type: 'list',
                items: [
                    'How data is stored in a <a href="https://en.wikipedia.org/wiki/B-tree" target="_blank">B-tree</a> and accessed efficiently',
                    'How physical disk blocks map to logical file blocks',
                    'How the <a href="https://en.wikipedia.org/wiki/Transmission_Control_Protocol" target="_blank">TCP</a> network protocol works under the hood',
                    'How to parse <a href="https://en.wikipedia.org/wiki/JSON" target="_blank">JSON</a> documents',
                ]
            },
            {
                type: 'paragraph',
                text: 'Why does this help? Two reasons. First, it <strong>simplifies the interface</strong> — you don\'t need to know the hidden stuff to use the module. Second, it <strong>makes the system easier to evolve</strong> — since nothing outside depends on those hidden details, you can change them freely without breaking anything.'
            },
            {
                type: 'paragraph',
                text: 'The opposite of information hiding is <strong>information leakage</strong> — and it\'s sneaky. It happens when a design decision shows up in multiple modules. If changing that decision means editing several files, information has leaked. A common cause? <strong>Temporal decomposition</strong> — organizing code by the <em>order things happen</em> (first read, then modify, then write) instead of by <em>what knowledge they share</em>.'
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
                        id: 'card-info-hiding-relationship',
                        question: 'What is the relationship between information hiding and deep modules?',
                        answer: 'Information hiding is "the most important technique for achieving deep modules." Each module encapsulates design decisions in its implementation, keeping them out of the interface — which makes the interface simpler and the module deeper.'
                    },
                    {
                        id: 'card-info-leakage-app',
                        question: 'Two classes both know the format of a JSON config file — one reads it, the other writes it. If the format changes, both need modification. What design problem is this?',
                        answer: 'Information leakage — knowledge of the file format has leaked into two modules instead of being encapsulated in one. The fix: merge the reading/writing into a single class that owns the format knowledge.'
                    },
                    {
                        id: 'card-temporal-decomp-reverse',
                        question: '"We structured the code into three classes — one for reading the file, one for modifying it, one for writing it — matching the order of operations." What anti-pattern is this?',
                        answer: 'Temporal decomposition — structuring code around time order instead of units of knowledge. Reading and writing both need knowledge of the file format, causing information leakage between the classes.'
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
                text: 'You\'re designing a new class and you hit the classic question: should it be <a href="https://en.wikipedia.org/wiki/Generalization" target="_blank">general-purpose</a> or special-purpose? Ousterhout\'s answer: <strong>make it somewhat general-purpose</strong>. And here\'s the surprising reason why.'
            },
            {
                type: 'paragraph',
                text: 'You\'d think a general-purpose module needs a <em>bigger</em> interface, right? Actually, it\'s the opposite. General-purpose interfaces tend to be <em>simpler</em> because they offer a few powerful operations instead of many specific ones. Fewer buttons, more power — like a Swiss Army knife vs. a drawer full of single-use gadgets.'
            },
            {
                type: 'paragraph',
                text: 'Here\'s Ousterhout\'s litmus test — ask yourself these three questions:'
            },
            {
                type: 'list',
                items: [
                    'What is the simplest interface that will cover all my current needs?',
                    'In how many situations will this method be useful? (If only one, it\'s probably too specific.)',
                    'Is this API easy to use for my current needs? (If you have to write a lot of glue code, it\'s too general.)',
                ]
            },
            {
                type: 'paragraph',
                text: 'The sweet spot: build what you need <em>today</em>, but design the interface so it works for <em>tomorrow\'s</em> needs too. Bonus: this naturally pushes special-purpose knowledge up to the caller, where it belongs — making your module deeper.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-general-purpose',
                        question: 'Why do general-purpose interfaces tend to be <em>simpler</em> than special-purpose ones?',
                        answer: 'They express a few powerful operations rather than many situation-specific ones — fewer methods, each deeper. This also produces better information hiding, since special-purpose knowledge stays in the caller.'
                    },
                    {
                        id: 'card-general-purpose-app',
                        question: 'A text editor class has separate methods: backspace(cursor), delete(cursor), deleteSelection(selection). A redesign replaces all three with delete(start, end). Why is the redesign better?',
                        answer: 'The general-purpose delete(start, end) is simpler (one method instead of three), deeper (hides nothing the user needs), and reusable for any future operation. The special-purpose methods leaked UI concepts into the text class.'
                    },
                    {
                        id: 'card-sweet-spot-reverse',
                        question: '"The module\'s functionality should reflect current needs, but its interface should not be tied to them." What design principle is this describing?',
                        answer: '"Somewhat general-purpose" — the sweet spot where you implement for today\'s needs but design the interface to support multiple uses.'
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
                text: 'Sometimes complexity has to live <em>somewhere</em>. The question is: where? Ousterhout\'s rule: <strong>pull it down.</strong> Put the hard stuff inside the module, not in the interface.'
            },
            {
                type: 'paragraph',
                text: 'Think about it with simple math: your module probably has dozens (or thousands) of users but only one developer. If you push complexity up into the interface, <em>every single user</em> pays the cost. If you absorb it inside, you pay once — they pay never. One developer suffers so everyone else can relax.'
            },
            {
                type: 'paragraph',
                text: 'The #1 violation of this principle? <strong>Configuration parameters.</strong> Instead of figuring out the right buffer size or timeout, the developer slaps in a config option: "Hey user, you decide!" That\'s not being flexible — that\'s being lazy. It shifts complexity upward. Better to compute reasonable defaults or make the system <a href="https://en.wikipedia.org/wiki/Adaptive_system" target="_blank">adaptive</a>.'
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
                        answer: 'Handle complexity in the module\'s implementation rather than pushing it onto users through the interface. One developer suffers so that many users don\'t have to.'
                    },
                    {
                        id: 'card-pull-down-app',
                        question: 'A network library exposes a retryTimeout config parameter, requiring every user to determine the right value. How could you pull this complexity down?',
                        answer: 'Compute the timeout automatically by measuring response times — the module determines a reasonable value internally instead of punting the decision to every user.'
                    },
                    {
                        id: 'card-config-params-reverse',
                        question: '"The developer didn\'t know what value to pick, so they made it a configuration parameter." This is shifting complexity in which direction?',
                        answer: 'Upwards — configuration parameters push decisions onto users, making the module shallower. The developer should compute reasonable defaults or make the system adaptive.'
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
                text: 'Here\'s something counterintuitive: <a href="https://en.wikipedia.org/wiki/Exception_handling" target="_blank">exception handling</a> is one of the <em>worst</em> sources of complexity. You\'d think throwing exceptions is the responsible thing to do. Ousterhout says it\'s often the opposite: <strong>most exceptions aren\'t necessary</strong>, and defining them creates more problems than it solves.'
            },
            {
                type: 'paragraph',
                text: 'His radical idea: instead of defining an error and then writing code to handle it, <strong>redefine the operation so the error case simply doesn\'t exist.</strong> Change the rules of the game.'
            },
            {
                type: 'paragraph',
                text: 'Real-world example: you try to delete a file on Windows, but another program is using it. Windows says "Error! File in use." Now every caller has to handle that case. <a href="https://en.wikipedia.org/wiki/Unix" target="_blank">Unix</a> took the opposite approach: <code>unlink</code> always succeeds, even if the file is open. The name disappears, but existing processes keep reading the file just fine. The error? Defined out of existence.'
            },
            {
                type: 'paragraph',
                text: 'Another example: Java\'s <code>substring(start, end)</code> throws an <code>IndexOutOfBoundsException</code> if you go past the end. <a href="https://en.wikipedia.org/wiki/Python_(programming_language)" target="_blank">Python</a>\'s approach? Slicing past the end just gives you what\'s available. No exception. No error. Fewer bugs.'
            },
            {
                type: 'paragraph',
                text: 'Ousterhout also describes three more techniques for taming exception complexity:'
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
                        answer: 'Instead of defining exceptions and handling them, redefine the operation\'s semantics so the error case simply doesn\'t exist. The normal behavior handles what used to be an "error."'
                    },
                    {
                        id: 'card-define-errors-app',
                        question: 'A deleteVariable(name) function throws an error if the variable doesn\'t exist. Developers wrap every call in try/catch since they don\'t always know which variables exist. How would you fix this?',
                        answer: 'Redefine it as "ensure this variable no longer exists." If it\'s already gone, the work is done — no error case. This is exactly the mistake Ousterhout made with Tcl\'s unset command.'
                    },
                    {
                        id: 'card-unlink-reverse',
                        question: '"Unix\'s unlink always succeeds, even if the file is open. The name disappears but existing processes keep reading normally." What technique does this illustrate?',
                        answer: 'Defining errors out of existence — the operation is redefined so there\'s nothing to fail. It also illustrates pulling complexity downward, since the OS handles the hard case instead of making every caller deal with it.'
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
                text: 'This one sounds almost too simple to be useful: <strong>before you commit to a design, come up with at least two approaches.</strong> And not small tweaks — they should be <em>radically</em> different.'
            },
            {
                type: 'paragraph',
                text: 'Designing a class? Sketch two completely different interfaces. Building a <a href="https://en.wikipedia.org/wiki/Data_structure" target="_blank">data structure</a>? Consider two fundamentally different representations. Then compare them: which is simpler? More general? Faster? Easier to change later?'
            },
            {
                type: 'paragraph',
                text: 'Why does this work? Because your first idea is almost never your best. Even if you end up choosing something close to it, the act of comparing it to a radically different alternative sharpens your understanding. You often end up with a hybrid that\'s better than either original.'
            },
            {
                type: 'paragraph',
                text: 'There\'s a bonus: doing this over time builds your design intuition. It\'s the practice reps that separate great engineers from merely competent ones.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-design-twice',
                        question: 'What does "design it twice" require, and how different should the alternatives be?',
                        answer: 'Consider at least two approaches before committing, and they must be radically different — not minor variations. Compare on simplicity, generality, performance, and ease of modification.'
                    },
                    {
                        id: 'card-design-twice-app',
                        question: 'You\'re designing a text storage class. You sketch a character-oriented API and a line-oriented API, but both are awkward for the UI. What should you do?',
                        answer: 'Try a third, radically different approach. The problems with the first two reveal what the interface really needs — operations on arbitrary ranges of characters. The design-it-twice process often leads to a hybrid better than any original.'
                    },
                    {
                        id: 'card-design-twice-reverse',
                        question: '"Smart people discover their first quick idea is sufficient for a good grade, so they never consider alternatives." What bad habit does Ousterhout say this creates?',
                        answer: 'Insisting on implementing the first idea that comes to mind — believing "smart people get it right the first time." But software design is hard enough that no one gets it right on the first try.'
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
                text: 'This might seem like a small thing, but <strong>bad names cause real bugs.</strong> A good name is like a tiny piece of documentation built right into the code. A bad name is a trap waiting to catch the next developer.'
            },
            {
                type: 'paragraph',
                text: 'Ousterhout\'s first rule: <strong>a name should create a vivid picture</strong> in the reader\'s mind. When you read <code>numActiveUsers</code>, you instantly know what it is. When you read <code>count</code>, you have no idea — count of what?'
            },
            {
                type: 'paragraph',
                text: 'His second rule: <strong>names should be precise.</strong> Vague names like <code>result</code>, <code>data</code>, <code>tmp</code>, and <code>info</code> are red flags. They\'re so generic they could mean anything. Compare <code>get</code> vs. <code>fetchFromRemoteServerIfNotCached</code> — which one tells you what\'s actually happening?'
            },
            {
                type: 'paragraph',
                text: 'And then there\'s <strong>consistency</strong>: always use the same name for the same purpose, and <em>never</em> use the same name for different purposes. If you call it <code>block</code> in one module and <code>chunk</code> in another for the same concept, you\'re quietly building a maze for the next person who reads your code.'
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
                        id: 'card-block-bug',
                        question: 'What happened because of the variable named "block" in the Sprite operating system?',
                        answer: 'The same name was used for both physical disk blocks and logical file blocks. A logical block number was accidentally used where a physical one was needed, silently corrupting data. It took 6 months to find the bug.'
                    },
                    {
                        id: 'card-naming-consistency-app',
                        question: 'Your codebase uses "count" in some files to mean "number of users" and in others to mean "number of retries." A new developer reads "if (count > 10)" and assumes it\'s users, but it\'s retries. What naming principle was violated?',
                        answer: 'Consistency — the same name was used for different purposes, creating obscurity. Consistency requires: always use the same name for the same purpose, and never use it for anything else.'
                    },
                    {
                        id: 'card-precision-reverse',
                        question: '"If someone sees this name in isolation, without seeing its declaration or documentation, how closely will they guess what it refers to?" What property of good names is this testing?',
                        answer: 'Precision — a good name creates a vivid, unambiguous image of what the entity is (and what it is not). Names like "result," "data," and "tmp" fail this test.'
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
                text: 'Here\'s Ousterhout\'s final test — the one that trumps everything else: <strong>can someone read your code and quickly understand what it does?</strong> If yes, your code is obvious. If they need to puzzle, guess, or open another file to figure it out — it\'s obscure.'
            },
            {
                type: 'paragraph',
                text: '<strong>Obviousness is the #1 quality of good code.</strong> Not cleverness (nobody cares how smart you are). Not brevity (short ≠ readable). Not performance (premature optimization is the root of all evil). Just: can someone read it and get it?'
            },
            {
                type: 'paragraph',
                text: 'Things that make code <strong>more</strong> obvious: good names (as we just covered), consistent coding style, smart use of whitespace, and comments that explain the <em>why</em> — not the <em>what</em>.'
            },
            {
                type: 'paragraph',
                text: 'Things that make code <strong>less</strong> obvious: <a href="https://en.wikipedia.org/wiki/Event-driven_programming" target="_blank">event-driven programming</a> (control flow becomes a maze), generic containers (what\'s actually in this <code>Map</code>?), code that surprises readers by doing something unexpected, and mixing different coding styles within the same project.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-obvious-test',
                        question: 'What does Ousterhout consider the single most important quality of code?',
                        answer: 'Obviousness — not cleverness, brevity, or performance. If someone reading the code can quickly understand what it does, the code is obvious. If they need to puzzle or guess, it\'s obscure.'
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
                text: 'You\'ve made it through the whole essay! Here\'s your cheat sheet — every weapon in the fight against complexity, in one place:'
            },
            {
                type: 'list',
                items: [
                    '<strong>Complexity is the enemy.</strong> Every design decision should reduce it.',
                    '<strong>Working code isn\'t enough.</strong> Be strategic, not tactical.',
                    '<strong>Modules should be deep.</strong> Simple interface, powerful implementation.',
                    '<strong>Hide information.</strong> Encapsulate design decisions — don\'t leak them.',
                    '<strong>General-purpose interfaces are simpler.</strong> Fewer buttons, more power.',
                    '<strong>Pull complexity downwards.</strong> You pay once; your users pay never.',
                    '<strong>Define errors out of existence.</strong> Fewer exceptions = fewer bugs.',
                    '<strong>Design it twice.</strong> Your first idea is almost never your best.',
                    '<strong>Names create images.</strong> Precise, vivid, consistent.',
                    '<strong>Code should be obvious.</strong> If it requires puzzling, redesign it.',
                ]
            },
            {
                type: 'paragraph',
                text: 'These aren\'t rules to follow mechanically. They\'re a way of <em>seeing</em> — a lens for every design decision you\'ll ever make. Practice them enough, and they\'ll become second nature. One day, you won\'t even think about them — they\'ll just be how you write code.'
            },
            {
                type: 'cards',
                cards: [
                    {
                        id: 'card-synthesis-fight',
                        question: 'How do all of the book\'s principles — deep modules, information hiding, pulling complexity down, defining errors out — relate to each other?',
                        answer: 'They are all weapons in the fight against complexity. Deep modules are the goal; information hiding is the primary technique to achieve them; pulling complexity down and defining errors out are specific strategies that make modules deeper.'
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
