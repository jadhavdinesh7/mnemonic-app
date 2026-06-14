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
    title: 'A Philosophy of Software Design — Original (Highlights)',
    subtitle: 'The original hand-made highlights edition · 33 cards, 11 chapters',
    author: 'Based on the book by John Ousterhout',
    description: 'The first, hand-written highlights edition. The full pipeline-generated edition (all 21 chapters, every card linked to the book) is the other one.',
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
