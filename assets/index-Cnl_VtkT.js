(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();const A={id:"philosophy-software-design",title:"A Philosophy of Software Design",subtitle:"The most important ideas, presented in a mnemonic medium",author:"Based on the book by John Ousterhout",description:"Learn the foundational principles of software design through an interactive essay that makes memory a choice.",cardCount:0,readingTime:"35 min"},T=[{id:"the-problem",heading:"The Problem of Complexity",content:[{type:"paragraph",text:"All of software design can be reduced to one fight: the fight against <strong>complexity</strong>. It is the great monster of software engineering. It slows you down. It makes bugs hide. It makes simple changes feel terrifyingly risky. Every great principle in this essay — every technique, every heuristic — is ultimately a weapon in this fight."},{type:"paragraph",text:"John Ousterhout, a professor of computer science at Stanford and the creator of the Tcl scripting language, wrote <em>A Philosophy of Software Design</em> to distill decades of teaching and practice into a single, coherent philosophy. His central argument is both simple and profound: <strong>the most fundamental problem in computer science is managing complexity</strong>. The purpose of design is to make systems easy to understand and modify."},{type:"paragraph",text:"This is not a book about algorithms or data structures. It's about something harder to teach and more important to master: how to <em>decompose problems</em> so that the resulting system is simple, not just working."},{type:"blockquote",text:'"The greatest limitation in writing software is our ability to understand the systems we are creating." — John Ousterhout'}]},{id:"complexity-defined",heading:"What Is Complexity?",content:[{type:"paragraph",text:"Ousterhout defines complexity with unusual precision. <strong>Complexity is anything related to the structure of a software system that makes it hard to understand and modify.</strong> It is not about the size of the codebase or the sophistication of the algorithms. A small system can be deeply complex; a large system can be simple."},{type:"paragraph",text:"Complexity manifests in three concrete symptoms that every developer has felt:"},{type:"list",items:["<strong>Change amplification</strong> — a simple change requires modifications in many different places. You change one thing and must chase it across ten files.","<strong>Cognitive load</strong> — a developer must hold too much information in their head to complete a task. The mental juggling act becomes unbearable.","<strong>Unknown unknowns</strong> — the most dangerous symptom. It's not obvious what you need to know, or what could break. You don't even know what questions to ask."]},{type:"paragraph",text:"Of these three, <strong>unknown unknowns are the worst</strong>. Change amplification is annoying but visible — you'll notice the work. Cognitive load is heavy but at least you know you're carrying it. Unknown unknowns are silent. They cause bugs that appear in production weeks later, in code you didn't think was related."},{type:"cards",cards:[{id:"card-complexity-def",question:"How does Ousterhout define complexity in a software system?",answer:"Anything related to the structure of a software system that makes it hard to understand and modify. It's not about size or sophistication — a small system can be deeply complex if it's hard to change."},{id:"card-complexity-app",question:"A 200-line module has 3 configuration flags with subtle interactions. A 2,000-line module has a clean API and no surprises. Which is more complex in Ousterhout's definition?",answer:"The 200-line module. Complexity is not about size — it's about how hard the system is to understand and modify."},{id:"card-unknown-unknowns",question:"Why are unknown unknowns the most dangerous symptom of complexity?",answer:"Because you don't know what you don't know — there's no way to discover the problem until a bug appears. Change amplification is visible; cognitive load is heavy but known. Unknown unknowns are silent."},{id:"card-unknown-unknowns-reverse",question:`"I changed one line and it broke something in a completely different file I didn't know was related." Which symptom of complexity is this?`,answer:"Unknown unknowns — you didn't know what you needed to know. The dependency was invisible."}]}]},{id:"causes-of-complexity",heading:"The Two Causes of Complexity",content:[{type:"paragraph",text:"Complexity has exactly two causes: <strong>dependencies</strong> and <strong>obscurity</strong>."},{type:"paragraph",text:"A <strong>dependency</strong> exists when a piece of code cannot be understood or modified in isolation — it relates to some other code, and the other code must be considered or changed if the first is changed. Dependencies are fundamental; you can never eliminate them entirely. The goal of design is to <em>reduce the number of dependencies</em> and to <em>make remaining dependencies obvious</em>."},{type:"paragraph",text:"<strong>Obscurity</strong> occurs when important information is not obvious. It might be a variable name that is too generic, or a dependency that is not documented, or a side effect that is not apparent from the interface. If a developer looking at the code cannot quickly determine what is relevant, the system is obscure."},{type:"paragraph",text:`Here's the crucial insight: <strong>complexity is incremental</strong>. No single dependency or obscurity, by itself, makes a system complex. Complexity accumulates from hundreds of small decisions. Each shortcut seems reasonable in isolation — "it's just a small hack" — but they pile up relentlessly. This is why good software design requires a zero-tolerance philosophy toward complexity, applied consistently in every change.`},{type:"cards",cards:[{id:"card-obscurity-reverse",question:`"A developer looking at the code cannot quickly determine what is relevant." What is Ousterhout's term for this cause of complexity?`,answer:"Obscurity — when important information is not obvious. It creates unknown unknowns and contributes to cognitive load."},{id:"card-incremental",question:'Why does Ousterhout say complexity is "incremental"?',answer:"No single shortcut makes a system complex. Complexity accumulates from hundreds of small dependencies and obscurities that each seem harmless in isolation."},{id:"card-incremental-app",question:`A team adds a small workaround to hit a deadline. The code review passes — it's "just one small hack." What principle explains why this is still dangerous?`,answer:'Complexity is incremental — each small hack seems individually harmless, but hundreds of them make the system unmaintainable. This is why Ousterhout demands a "zero tolerance" philosophy.'}]}]},{id:"strategic-vs-tactical",heading:"Working Code Isn't Enough",content:[{type:"paragraph",text:"Ousterhout identifies two fundamentally different mindsets for software development, and argues that choosing between them will determine the long-term quality of your code."},{type:"subheading",text:"The Tactical Programmer"},{type:"paragraph",text:'<strong>Tactical programming</strong> treats getting something working as the primary goal. Ship the feature. Fix the bug. Hit the deadline. It feels very productive in the moment. But the tactical programmer introduces complexity with each task — "just a small kludge here, a quick workaround there." Over time, the codebase becomes a minefield.'},{type:"subheading",text:"The Strategic Programmer"},{type:"paragraph",text:"<strong>Strategic programming</strong> is the opposite mindset. Your primary goal is not just to make code work, but to produce a <em>great design</em>. Working code is a given — the bar is higher. You invest time upfront to find the cleanest solution, knowing this investment will pay for itself many times over as the project evolves."},{type:"paragraph",text:"Ousterhout suggests investing about <strong>10-20% of your development time</strong> on improving the design of the system. This is not a luxury; it's the minimum investment to prevent the system from degenerating into a tactical disaster. Think of it as paying down technical debt with every commit."},{type:"blockquote",text:`"The best way to lower development costs is to hire great engineers: they don't cost much more than mediocre engineers but have tremendously higher productivity... The most important factor in their productivity is the quality of the codebase they work in."`},{type:"cards",cards:[{id:"card-tactical-reverse",question:`"Just a small kludge here, a quick workaround there — it won't matter." What programming mindset produces this attitude?`,answer:"Tactical programming — prioritizing working code over clean design. Each shortcut adds incremental complexity that accumulates into an unmaintainable codebase."},{id:"card-strategic-def",question:"In strategic programming, what is your primary goal?",answer:"To produce a great design — not just working code. Working code is a given; the bar is higher. You invest time upfront knowing the payoff comes as the project evolves."},{id:"card-invest-pct",question:"How much development time does Ousterhout suggest investing in design improvement, and why does this pay for itself?",answer:"About 10-20%. Within a few months, the benefits from past investments save enough time to cover future investments — so the 10-20% becomes free."}]}]},{id:"deep-modules",heading:"Modules Should Be Deep",content:[{type:"paragraph",text:"This is perhaps the most important idea in the entire book. Ousterhout introduces a visual metaphor that, once you see it, changes how you think about every class and function you write."},{type:"paragraph",text:"Every module (class, function, service) has two parts: an <strong>interface</strong> and an <strong>implementation</strong>. The interface is what you must know to use the module. The implementation is how it does its job. A module's depth is determined by the ratio between these two."},{type:"paragraph",text:"A <strong>deep module</strong> has a simple interface but hides a complex implementation. It provides powerful functionality with minimal cognitive cost to its users. Think of the Unix file I/O system: five basic calls (<code>open</code>, <code>read</code>, <code>write</code>, <code>lseek</code>, <code>close</code>) hide an enormously complex implementation dealing with disk blocks, caching, device drivers, and permissions."},{type:"paragraph",text:"A <strong>shallow module</strong> is the opposite: its interface is complicated relative to the functionality it provides. Shallow modules don't help much in the fight against complexity because they don't do enough work to justify the cognitive cost of learning their interface."},{type:"red-flag",label:"Red Flag: Shallow Module",text:"A shallow module is one whose interface is complicated relative to the functionality it provides. Shallow modules don't reduce overall system complexity."},{type:"paragraph",text:`Ousterhout warns against <strong>"classitis"</strong> — the disease of creating too many small, shallow classes on the mistaken belief that "classes should be small." Java's I/O system is his canonical example: to read a file with buffering, you must create a <code>FileInputStream</code>, wrap it in a <code>BufferedInputStream</code>, then wrap that in an <code>ObjectInputStream</code>. Three classes to do what Unix does with <code>open</code> plus <code>read</code>.`},{type:"cards",cards:[{id:"card-deep-module-def",question:'What makes a module "deep"?',answer:"It has a simple interface but hides a complex implementation — providing powerful functionality with minimal cognitive cost to users. Think of module depth as the ratio of hidden functionality to interface complexity."},{id:"card-deep-module-app",question:"Unix file I/O has 5 calls (open, read, write, lseek, close) hiding 100K+ lines. Java requires FileInputStream → BufferedInputStream → ObjectInputStream just to read a buffered file. Which is deeper, and why?",answer:"Unix is deep — simple interface, massive hidden complexity. Java's I/O is shallow — the interface complexity (3 classes, specific wiring order) is nearly as great as what it provides."},{id:"card-classitis-reverse",question:'"Each class is individually simple, but there are so many small classes that the system-level interface complexity is enormous." What does Ousterhout call this disease?',answer:`Classitis — the mistaken belief that "classes should be small." Small classes don't contribute much functionality, so you need many of them, and their interfaces accumulate into tremendous system-level complexity.`}]}]},{id:"information-hiding",heading:"Information Hiding and Leakage",content:[{type:"paragraph",text:"If deep modules are the goal, then <strong>information hiding</strong> is the primary technique for achieving them. This idea, first articulated by David Parnas in 1971, remains one of the most powerful principles in all of software engineering."},{type:"paragraph",text:"The basic idea: each module should encapsulate a few pieces of knowledge — design decisions — within its implementation. These details should <em>not appear in its interface</em>, and should therefore be invisible to other modules. Examples of information that can be hidden:"},{type:"list",items:["How to store information in a B-tree and access it efficiently","How to identify which physical disk block corresponds to each logical block in a file","How to implement the TCP network protocol","How to parse JSON documents"]},{type:"paragraph",text:"Information hiding reduces complexity in two ways. First, it <strong>simplifies the interface</strong> — users of the module don't need to know the hidden details. Second, it <strong>makes the system easier to evolve</strong> — since no external code depends on the hidden details, those details can be changed without affecting anything else."},{type:"paragraph",text:"The opposite of information hiding is <strong>information leakage</strong>. This occurs when a design decision is reflected in multiple modules. If a change to that design decision requires modifications to several modules, information has leaked. One common cause is <strong>temporal decomposition</strong> — structuring code around the order operations happen in time rather than around units of knowledge."},{type:"red-flag",label:"Red Flag: Information Leakage",text:"If a design decision is reflected in multiple modules, information has leaked. When a change to that decision requires modifications to several places, you have a design problem."},{type:"cards",cards:[{id:"card-info-hiding-relationship",question:"What is the relationship between information hiding and deep modules?",answer:'Information hiding is "the most important technique for achieving deep modules." Each module encapsulates design decisions in its implementation, keeping them out of the interface — which makes the interface simpler and the module deeper.'},{id:"card-info-leakage-app",question:"Two classes both know the format of a JSON config file — one reads it, the other writes it. If the format changes, both need modification. What design problem is this?",answer:"Information leakage — knowledge of the file format has leaked into two modules instead of being encapsulated in one. The fix: merge the reading/writing into a single class that owns the format knowledge."},{id:"card-temporal-decomp-reverse",question:'"We structured the code into three classes — one for reading the file, one for modifying it, one for writing it — matching the order of operations." What anti-pattern is this?',answer:"Temporal decomposition — structuring code around time order instead of units of knowledge. Reading and writing both need knowledge of the file format, causing information leakage between the classes."}]}]},{id:"general-purpose",heading:"General-Purpose Modules Are Deeper",content:[{type:"paragraph",text:"One of the most common design questions is: should I make this module general-purpose or special-purpose? Ousterhout's answer is nuanced but powerful: <strong>make classes somewhat general-purpose</strong>."},{type:"paragraph",text:"The key insight is that general-purpose interfaces tend to be <em>simpler</em> than special-purpose ones. This seems counterintuitive — wouldn't a general-purpose module need to do more? Yes, but its <strong>interface</strong> can actually be simpler because it expresses a few powerful operations rather than many specific ones."},{type:"paragraph",text:"Ousterhout provides a litmus test. Ask yourself:"},{type:"list",items:["What is the simplest interface that will cover all my current needs?","In how many situations will this method be useful? (If only one, it's probably too specific.)","Is this API easy to use for my current needs? (If you have to write a lot of additional code, it's too general.)"]},{type:"paragraph",text:"The sweet spot: the module's <em>functionality</em> should reflect current needs, but its <em>interface</em> should be general enough to support multiple uses. This approach also leads to better information hiding — the special-purpose knowledge gets pushed up to the caller, where it belongs."},{type:"cards",cards:[{id:"card-general-purpose",question:"Why do general-purpose interfaces tend to be <em>simpler</em> than special-purpose ones?",answer:"They express a few powerful operations rather than many situation-specific ones — fewer methods, each deeper. This also produces better information hiding, since special-purpose knowledge stays in the caller."},{id:"card-general-purpose-app",question:"A text editor class has separate methods: backspace(cursor), delete(cursor), deleteSelection(selection). A redesign replaces all three with delete(start, end). Why is the redesign better?",answer:"The general-purpose delete(start, end) is simpler (one method instead of three), deeper (hides nothing the user needs), and reusable for any future operation. The special-purpose methods leaked UI concepts into the text class."},{id:"card-sweet-spot-reverse",question:`"The module's functionality should reflect current needs, but its interface should not be tied to them." What design principle is this describing?`,answer:`"Somewhat general-purpose" — the sweet spot where you implement for today's needs but design the interface to support multiple uses.`}]}]},{id:"pull-complexity-down",heading:"Pull Complexity Downwards",content:[{type:"paragraph",text:"When you face complexity that must exist somewhere, here's Ousterhout's rule: <strong>pull it down</strong>. Handle the complexity in the module's implementation rather than pushing it onto the user through the interface."},{type:"paragraph",text:"This principle follows naturally from deep modules: most modules have far more users than developers. If you push complexity up into the interface, every user pays the cost. If you absorb it in the implementation, the cost is paid once by the module developer rather than repeatedly by every user."},{type:"paragraph",text:'A common violation of this principle is <strong>configuration parameters</strong>. Rather than determining a reasonable default, the developer punts the decision to the user: "Hey, what do you want the buffer size to be? What timeout should I use?" Configuration parameters shift complexity upward, making the module shallower. Better to compute reasonable defaults, or make the system adaptive.'},{type:"red-flag",label:"Red Flag: Configuration Parameters",text:"Configuration parameters are often a sign that the developer is too lazy to determine the right value. They shift complexity upward, making the module shallower."},{type:"cards",cards:[{id:"card-pull-down",question:'What does "pull complexity downwards" mean?',answer:"Handle complexity in the module's implementation rather than pushing it onto users through the interface. One developer suffers so that many users don't have to."},{id:"card-pull-down-app",question:"A network library exposes a retryTimeout config parameter, requiring every user to determine the right value. How could you pull this complexity down?",answer:"Compute the timeout automatically by measuring response times — the module determines a reasonable value internally instead of punting the decision to every user."},{id:"card-config-params-reverse",question:`"The developer didn't know what value to pick, so they made it a configuration parameter." This is shifting complexity in which direction?`,answer:"Upwards — configuration parameters push decisions onto users, making the module shallower. The developer should compute reasonable defaults or make the system adaptive."}]}]},{id:"errors-out-of-existence",heading:"Define Errors Out of Existence",content:[{type:"paragraph",text:"Exception handling is one of the worst sources of complexity in software systems. Developers love to throw exceptions — it feels responsible, diligent. But Ousterhout argues it's often the opposite: <strong>most exceptions aren't necessary</strong>, and defining them creates more problems than it solves."},{type:"paragraph",text:`His radical prescription: instead of defining exceptions and then figuring out how to handle them, <strong>redefine the operation so that the error case doesn't exist</strong>. Change the semantics so the "normal" behavior handles what used to be an "error."`},{type:"paragraph",text:`Consider file deletion. In Windows, if a file is in use by another process, the delete operation fails with an error. This sounds "correct," but creates enormous complexity — every caller must handle this case. Unix took the opposite approach: <code>unlink</code> always succeeds immediately, even if the file is open. The file's contents are preserved for existing users but the name disappears. The error has been defined out of existence.`},{type:"paragraph",text:"Another example: Java's <code>substring(start, end)</code> method throws <code>IndexOutOfBoundsException</code> if the indices are out of range. Python takes the opposite approach — slicing beyond the string's bounds simply returns what's available. Fewer exceptions, fewer bugs, simpler code."},{type:"paragraph",text:"Ousterhout also describes three other techniques for reducing exception complexity:"},{type:"list",items:["<strong>Exception masking</strong> — handle exceptions at a low level so they're never seen by callers (e.g., TCP automatically retransmits lost packets)","<strong>Exception aggregation</strong> — handle many different exceptions with a single piece of code rather than individual handlers","<strong>Just crash</strong> — for truly unexpected errors, sometimes the simplest correct response is to crash and restart"]},{type:"cards",cards:[{id:"card-define-errors-out",question:'What does "define errors out of existence" mean?',answer:`Instead of defining exceptions and handling them, redefine the operation's semantics so the error case simply doesn't exist. The normal behavior handles what used to be an "error."`},{id:"card-define-errors-app",question:"A deleteVariable(name) function throws an error if the variable doesn't exist. Developers wrap every call in try/catch since they don't always know which variables exist. How would you fix this?",answer:`Redefine it as "ensure this variable no longer exists." If it's already gone, the work is done — no error case. This is exactly the mistake Ousterhout made with Tcl's unset command.`},{id:"card-unlink-reverse",question:`"Unix's unlink always succeeds, even if the file is open. The name disappears but existing processes keep reading normally." What technique does this illustrate?`,answer:"Defining errors out of existence — the operation is redefined so there's nothing to fail. It also illustrates pulling complexity downward, since the OS handles the hard case instead of making every caller deal with it."}]}]},{id:"design-it-twice",heading:"Design It Twice",content:[{type:"paragraph",text:"Ousterhout recommends one of the simplest yet most underused practices in software engineering: <strong>design it twice</strong>. For any important design decision, consider at least two different approaches before committing."},{type:"paragraph",text:"The two approaches should be <em>radically different</em>, not minor variations. If you're designing a class, sketch two completely different interfaces. If you're designing a data structure, consider two fundamentally different representations. Then compare them on factors like simplicity, generality, performance, and ease of modification."},{type:"paragraph",text:"This practice works because your first idea is rarely your best. Even if you end up choosing something close to your first design, the exercise of comparing it to a radically different alternative sharpens your understanding of the trade-offs and often leads to a hybrid that's better than either original."},{type:"paragraph",text:"It also develops your design sense over time. Designing it twice is how you build the intuition that separates great engineers from merely competent ones."},{type:"cards",cards:[{id:"card-design-twice",question:'What does "design it twice" require, and how different should the alternatives be?',answer:"Consider at least two approaches before committing, and they must be radically different — not minor variations. Compare on simplicity, generality, performance, and ease of modification."},{id:"card-design-twice-app",question:"You're designing a text storage class. You sketch a character-oriented API and a line-oriented API, but both are awkward for the UI. What should you do?",answer:"Try a third, radically different approach. The problems with the first two reveal what the interface really needs — operations on arbitrary ranges of characters. The design-it-twice process often leads to a hybrid better than any original."},{id:"card-design-twice-reverse",question:'"Smart people discover their first quick idea is sufficient for a good grade, so they never consider alternatives." What bad habit does Ousterhout say this creates?',answer:'Insisting on implementing the first idea that comes to mind — believing "smart people get it right the first time." But software design is hard enough that no one gets it right on the first try.'}]}]},{id:"naming",heading:"The Power of Names",content:[{type:"paragraph",text:"Good names are a form of documentation and a form of abstraction. A well-chosen name communicates the purpose and behavior of a variable, method, or class without requiring the reader to dig into the implementation. <strong>Bad names cause bugs.</strong>"},{type:"paragraph",text:"Ousterhout's first rule: <strong>names should create a vivid image</strong> in the reader's mind. When someone reads the name, they should immediately have a clear picture of what the thing represents, without ambiguity. If a name requires reading the implementation to understand, it has failed."},{type:"paragraph",text:"His second rule: <strong>names should be precise</strong>. Vague names like <code>result</code>, <code>data</code>, <code>tmp</code>, and <code>info</code> are red flags. They tell you nothing specific. Consider the difference between <code>count</code> and <code>numActiveUsers</code>, or between <code>get</code> and <code>fetchFromRemoteServerIfNotCached</code>."},{type:"paragraph",text:"He also emphasizes <strong>consistency</strong>: use the same name for the same purpose everywhere, and never use the same name for different purposes. If you call it <code>block</code> in one module and <code>chunk</code> in another for the same concept, you're creating unnecessary cognitive load."},{type:"red-flag",label:"Red Flag: Vague Name",text:"If a variable or method name is broad enough to be used for many different things, it's too vague. Names like result, data, tmp, or info are almost always red flags."},{type:"cards",cards:[{id:"card-block-bug",question:'What happened because of the variable named "block" in the Sprite operating system?',answer:"The same name was used for both physical disk blocks and logical file blocks. A logical block number was accidentally used where a physical one was needed, silently corrupting data. It took 6 months to find the bug."},{id:"card-naming-consistency-app",question:`Your codebase uses "count" in some files to mean "number of users" and in others to mean "number of retries." A new developer reads "if (count > 10)" and assumes it's users, but it's retries. What naming principle was violated?`,answer:"Consistency — the same name was used for different purposes, creating obscurity. Consistency requires: always use the same name for the same purpose, and never use it for anything else."},{id:"card-precision-reverse",question:'"If someone sees this name in isolation, without seeing its declaration or documentation, how closely will they guess what it refers to?" What property of good names is this testing?',answer:'Precision — a good name creates a vivid, unambiguous image of what the entity is (and what it is not). Names like "result," "data," and "tmp" fail this test.'}]}]},{id:"obvious-code",heading:"Code Should Be Obvious",content:[{type:"paragraph",text:"The ultimate test of good software design: <strong>can someone reading the code quickly understand what it does?</strong> If they can, the code is obvious. If they can't — if they need to spend time puzzling, guessing, or reading external documentation — the code is obscure."},{type:"paragraph",text:"Obviousness is the single most important quality of code. Not cleverness. Not brevity. Not performance. <em>Obviousness.</em> Obvious code is easier to debug, easier to extend, easier to review, and produces fewer bugs."},{type:"paragraph",text:"Things that make code <strong>more</strong> obvious: good names (as we discussed), consistency in coding style, judicious use of whitespace and formatting, and comments that explain things not obvious from the code itself."},{type:"paragraph",text:"Things that make code <strong>less</strong> obvious: event-driven programming (control flow is hard to follow), generic containers (what type of data is in this <code>Map</code>?), code that violates the reader's expectations, and different coding styles in different parts of the same system."},{type:"cards",cards:[{id:"card-obvious-test",question:"What does Ousterhout consider the single most important quality of code?",answer:"Obviousness — not cleverness, brevity, or performance. If someone reading the code can quickly understand what it does, the code is obvious. If they need to puzzle or guess, it's obscure."}]}]},{id:"principles-summary",heading:"The Principles, Distilled",content:[{type:"paragraph",text:"Every principle in this essay is a weapon in the fight against complexity. Here they are, distilled:"},{type:"list",items:["<strong>Complexity is the enemy.</strong> Everything you do should reduce it.","<strong>Working code isn't enough.</strong> Be a strategic programmer, not a tactical one.","<strong>Modules should be deep.</strong> Simple interface, complex implementation.","<strong>Hide information.</strong> Design decisions should be encapsulated, not leaked.","<strong>General-purpose interfaces are simpler.</strong> Specialize the functionality, not the interface.","<strong>Pull complexity downwards.</strong> The module developer pays once; the users pay never.","<strong>Define errors out of existence.</strong> Fewer exceptions = fewer bugs.","<strong>Design it twice.</strong> Your first idea is probably not your best.","<strong>Names create images.</strong> Precise, vivid, consistent.","<strong>Code should be obvious.</strong> If it requires puzzling, redesign it."]},{type:"paragraph",text:"These principles are not rules to follow mechanically. They are a way of seeing — a lens through which every design decision can be evaluated. The more you practice them, the more natural they become, until one day they are simply how you think about code."},{type:"cards",cards:[{id:"card-synthesis-fight",question:"How do all of the book's principles — deep modules, information hiding, pulling complexity down, defining errors out — relate to each other?",answer:"They are all weapons in the fight against complexity. Deep modules are the goal; information hiding is the primary technique to achieve them; pulling complexity down and defining errors out are specific strategies that make modules deeper."}]}]}];let O=0;for(const e of T)for(const t of e.content)t.type==="cards"&&(O+=t.cards.length);A.cardCount=O;function Y(){const e=[];for(const t of T)for(const s of t.content)if(s.type==="cards")for(const i of s.cards)e.push(i.id);return e}function F(){const e=[];for(const t of T)for(const s of t.content)if(s.type==="cards")for(const i of s.cards)e.push({...i,sectionId:t.id,sectionHeading:t.heading});return e}const y={title:"Why You Forget Everything You Read (And How This Medium Fixes It)",subtitle:"The science behind this reading experience, explained simply",content:[{type:"paragraph",text:`You've probably had this experience: you read a book, loved it, told people about it... and three months later, you can barely remember the key ideas. Maybe you remember a vague feeling — "it was about software complexity" — but the specifics have vanished.`},{type:"paragraph",text:"This is normal. <strong>Forgetting is the default behavior of the human brain.</strong> It's not a bug; it's a feature. Your brain is ruthlessly efficient about storage — if you don't actively signal that a memory is important, it gets quietly discarded."},{type:"heading",text:"The Forgetting Curve"},{type:"paragraph",text:'In 1885, a German psychologist named Hermann Ebbinghaus discovered something shocking. He memorized lists of nonsense syllables (things like "ZOL" and "DAX") and then measured how quickly he forgot them. He found that memory decays <em>exponentially</em> — you lose about 50% within an hour, 70% within a day, and nearly everything within a week. He called this the <strong>forgetting curve</strong>.'},{type:"paragraph",text:"This curve applies to everything you read, hear, or learn. That brilliant insight from a book? Gone in a week. That interesting fact from a podcast? Gone in three days. Your brain simply doesn't hold onto things by default."},{type:"heading",text:"The Trick That Beats the Curve"},{type:"paragraph",text:"But over the last century, cognitive scientists discovered something else: there's a simple trick that <em>flattens</em> the forgetting curve. It's called <strong>spaced repetition</strong>."},{type:"paragraph",text:"Here's how it works: if you test yourself on something at just the right moment — right before you're about to forget — your brain consolidates that memory more deeply. Each time you do this, the memory lasts longer. The intervals between tests grow exponentially:"},{type:"list",items:["First test: <strong>5 days</strong> after you first learn it","Second test: <strong>2 weeks</strong> later","Third test: <strong>1 month</strong> later","Fourth test: <strong>3 months</strong> later","Fifth test: <strong>6+ months</strong> later"]},{type:"paragraph",text:"After just 5 tests — taking maybe <strong>30 seconds each</strong> — you'll remember that fact for <em>years</em>. The total time investment is about 2-3 minutes per fact, spread over months. That's it. That's the whole trick."},{type:"heading",text:"Why Don't More People Use This?"},{type:"paragraph",text:"There are tools like <strong>Anki</strong> that implement spaced repetition with flashcards, and they work incredibly well. Medical students use them to memorize thousands of facts. Language learners use them to acquire vocabulary."},{type:"paragraph",text:"But there's a problem: <strong>creating good flashcards is hard work</strong>. You have to read a book, decide what's important, write good questions, and then maintain a separate flashcard habit. Most people give up. The friction is too high."},{type:"heading",text:"The Mnemonic Medium: Memory Built Into Reading"},{type:"paragraph",text:"This is the core innovation behind what you're experiencing right now. The <strong>mnemonic medium</strong> — created by Andy Matuschak and Michael Nielsen — takes a different approach: instead of making <em>you</em> create flashcards, the <em>author</em> embeds review cards directly into the text."},{type:"paragraph",text:"Think about what this means:"},{type:"list",items:["<strong>The author writes the questions.</strong> They know the material deeply and can craft questions that test genuine understanding, not just recall of surface facts.","<strong>The cards appear in context.</strong> You encounter them right after reading the relevant concept, when your understanding is freshest.","<strong>There's zero friction.</strong> No separate app. No card creation. No export/import. You just read normally, and the memory reinforcement happens alongside the reading.","<strong>The computer schedules everything.</strong> You don't have to remember to review. The system tracks what you've seen and when you need to see it again."]},{type:"heading",text:"Memory as a Choice"},{type:"paragraph",text:"Here's the profound part: normally, remembering what you read is left to chance. You might remember some things if they're dramatic enough or if you happen to use them soon. But mostly, the knowledge evaporates."},{type:"paragraph",text:"The mnemonic medium turns memory into a <strong>choice</strong>. You decide you want to remember the key ideas of this essay, and the medium guarantees it. That's a fundamentally different relationship with text than we've ever had before."},{type:"paragraph",text:'The first real implementation of this idea is <a href="https://quantum.country" target="_blank">Quantum Country</a>, a free textbook on quantum computing. Readers who engaged with the review cards demonstrated retention of key concepts for <strong>months and years</strong>, with a total review time investment of less than <strong>2 hours</strong> across more than 100 questions. The return is exponential — every extra minute of review provides more and more benefit.'},{type:"heading",text:"How This App Works"},{type:"paragraph",text:"As you read the essays here, you'll encounter review cards embedded between sections. Here's what to do:"},{type:"list",items:["<strong>Try to answer before revealing.</strong> Even if you're not sure, the act of trying to recall strengthens your memory far more than passively reading the answer.",`<strong>Be honest.</strong> If you didn't remember, click "Didn't remember." The system will show you this card again sooner. There's no penalty for forgetting — it's information your brain needs to consolidate.`,"<strong>Come back for reviews.</strong> The real magic happens not during first reading, but during review sessions. Each review takes just a few minutes but extends your retention by weeks or months."]},{type:"paragraph",text:`The scheduling algorithm used here is adapted from <a href="https://github.com/andymatuschak/orbit" target="_blank">Orbit</a>, Matuschak's open-source spaced repetition platform. It uses a growth factor of 2.3x — meaning each successful review more than doubles the time until the next one. After just 5-6 reviews, you're testing at intervals of months.`},{type:"paragraph",text:"This is not a gimmick. It's one of the most robust findings in cognitive science, backed by over a century of research. The only question is: <strong>do you want to remember what you read?</strong>"},{type:"paragraph",text:"<em>If yes, just keep reading. The medium will handle the rest.</em>"}]},h=[{id:"philosophy-software-design",meta:A,sections:T,getCardIds:Y,getCards:F}];function L(e){return h.find(t=>t.id===e)||null}function R(){const e=[];for(const t of h)e.push(...t.getCardIds());return e}function _(){const e=[];for(const t of h){const s=t.getCards().map(i=>({...i,essayId:t.id,essayTitle:t.meta.title}));e.push(...s)}return e}const C=2.3,k=1e3*60*60*24*5,U=1e3*60*10,H=1e3*60*60*16,J=50,v=Object.freeze({Remembered:"remembered",Forgotten:"forgotten",Skipped:"skipped"}),c=["in-text","5 days","~2 weeks","~1 month","~3 months","~6 months","long-term"];function W(e){if(e<=0)return c[0];const t=e/(1e3*60*60*24);return t<3?c[0]:t<10?c[1]:t<21?c[2]:t<60?c[3]:t<150?c[4]:t<270?c[5]:c[6]}function I(e){if(e<=0)return 0;const t=e/(1e3*60*60*24);return t<3?0:t<10?1:t<21?2:t<60?3:t<150?4:t<270?5:6}const G=c.length;function V(e,t,s){const i=Math.max(0,t-(e.lastRepetitionTimestampMillis??e.createdAtTimestampMillis));let a;s===v.Remembered||s===v.Skipped?i<e.intervalMillis?a=Math.max(e.intervalMillis,k,Math.floor(i*C)):a=Math.max(k,Math.floor(i*C)):e.intervalMillis<k?a=e.intervalMillis:a=Math.max(k,Math.floor(e.intervalMillis/C));const o=t%1e3*600;return{dueTimestampMillis:t+o+(s===v.Forgotten?U:a),intervalMillis:a}}const q="mnemonic_card_states";function f(){try{const e=localStorage.getItem(q);return e?JSON.parse(e):{}}catch{return{}}}function M(e){localStorage.setItem(q,JSON.stringify(e))}function B(e){return f()[e]||null}function Z(e){const t=f();if(!t[e]){const s=Date.now();t[e]={createdAtTimestampMillis:s,lastRepetitionTimestampMillis:null,intervalMillis:0,dueTimestampMillis:s,reviewCount:0},M(t)}return t[e]}function j(e,t){const s=f(),i=Date.now();s[e]||(s[e]={createdAtTimestampMillis:i,lastRepetitionTimestampMillis:null,intervalMillis:0,dueTimestampMillis:i,reviewCount:0});const a=s[e],{dueTimestampMillis:o,intervalMillis:r}=V(a,i,t);return a.lastRepetitionTimestampMillis=i,a.dueTimestampMillis=o,a.intervalMillis=r,a.reviewCount=(a.reviewCount||0)+1,s[e]=a,M(s),a}function K(e){const t=f(),s=Date.now()+H;return e.filter(a=>{const o=t[a];return o&&o.reviewCount>0&&o.dueTimestampMillis<=s}).map(a=>({id:a,state:t[a]})).sort((a,o)=>a.state.dueTimestampMillis-o.state.dueTimestampMillis).slice(0,J)}function g(e){const t=f();let s=e.length,i=0,a=0,o=0;const r=Date.now();for(const l of e){const n=t[l];n&&(n.reviewCount>0&&i++,I(n.intervalMillis)>=4&&a++,n.dueTimestampMillis<=r+H&&n.reviewCount>0&&o++)}return{totalCards:s,reviewed:i,mastered:a,dueNow:o}}function Q(e){const t=f();for(const s of e)delete t[s];M(t)}function X(){localStorage.removeItem(q)}const u=document.getElementById("app");function ee(){return window.location.hash||"#/"}function te(e){const t=e.replace("#/","").split("/").filter(Boolean);return{page:t[0]||"home",id:t[1]||null}}function se(e){window.location.hash=e}function w(){const e=ee(),{page:t,id:s}=te(e);switch(u.innerHTML="",window.scrollTo(0,0),t){case"essay":ie(s||h[0]?.id);break;case"review":he(s);break;case"about":pe();break;default:ae()}}window.addEventListener("hashchange",w);window.addEventListener("DOMContentLoaded",w);function ae(){const e=R(),t=g(e);u.innerHTML=`
    <div class="landing animate-fade-in">
      <div class="landing-hero">
        <div class="landing-hero-badge">✦  The Mnemonic Medium</div>
        <h1 class="landing-hero-title">Read it once.<br>Remember it forever.</h1>
        <p class="landing-hero-subtitle">
          An interactive reading experience that embeds spaced-repetition review into the text itself — so remembering what you read becomes a choice, not chance.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="#/essay/${h[0]?.id}" class="btn btn-primary">Start Reading →</a>
          <a href="#/about" class="btn btn-secondary">How does this work?</a>
        </div>
      </div>

      <div class="landing-essays">
        <div class="landing-section-title">Essays</div>

        ${h.map((i,a)=>{const o=g(i.getCardIds());return`
            <a href="#/essay/${i.id}" class="essay-card">
              <div class="essay-card-number">${String(a+1).padStart(2,"0")}</div>
              <div class="essay-card-content">
                <div class="essay-card-title">${i.meta.title}</div>
                <div class="essay-card-description">${i.meta.description}</div>
                <div class="essay-card-meta">
                  <span>📖 ${i.meta.readingTime} read</span>
                  <span>🧠 ${i.meta.cardCount} review cards</span>
                  ${o.reviewed>0?`<span>✅ ${o.reviewed}/${o.totalCards} reviewed</span>`:""}
                  ${o.dueNow>0?`<span style="color: var(--color-primary); font-weight: 600;">🔔 ${o.dueNow} due</span>`:""}
                </div>
              </div>
              <div class="essay-card-arrow">→</div>
            </a>
          `}).join("")}

        <a href="#/about" class="essay-card">
          <div class="essay-card-number">✦</div>
          <div class="essay-card-content">
            <div class="essay-card-title">${y.title}</div>
            <div class="essay-card-description">${y.subtitle}</div>
            <div class="essay-card-meta">
              <span>📖 8 min read</span>
              <span>🔬 The science, simplified</span>
            </div>
          </div>
          <div class="essay-card-arrow">→</div>
        </a>

        ${t.dueNow>0?`
          <div style="margin-top: var(--space-2xl);">
            <div class="landing-section-title">Review</div>
            <a href="#/review" class="essay-card" style="border-color: var(--color-primary-glow); background: linear-gradient(135deg, #faf8ff, #f0eeff);">
              <div class="essay-card-number" style="opacity: 0.6;">🧠</div>
              <div class="essay-card-content">
                <div class="essay-card-title">Review Session</div>
                <div class="essay-card-description">${t.dueNow} cards are due for review across all essays. A few minutes now will strengthen your memory for weeks.</div>
              </div>
              <div class="essay-card-arrow">→</div>
            </a>
          </div>
        `:""}

        ${t.reviewed>0?`
          <div style="margin-top: var(--space-2xl); padding-top: var(--space-lg); border-top: 1px solid rgba(0,0,0,0.08);">
            <div class="landing-section-title">Settings</div>
            <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: var(--space-md);">
              <button class="btn btn-secondary" id="reset-all-btn" style="font-size: var(--font-size-xs);">
                ↻ Reset all progress
              </button>
            </div>
          </div>
        `:""}
      </div>
    </div>
  `;const s=document.getElementById("reset-all-btn");s&&s.addEventListener("click",()=>{confirm("Reset all progress across every essay? This cannot be undone. Your spaced-repetition schedules will start fresh.")&&(X(),w())})}function ie(e){const t=L(e);if(!t){u.innerHTML=`
      <div class="about-page animate-fade-in">
        <a href="#/" class="about-back-link">← Back to essays</a>
        <h1 class="essay-title">Essay not found</h1>
        <p class="essay-paragraph">The essay "${e}" doesn't exist.</p>
      </div>
    `;return}t.getCardIds().forEach(i=>Z(i)),u.innerHTML=`
    <div class="app-layout">
      <div class="main-content">
        <div class="essay-container animate-fade-in">
          ${oe(t)}
          ${t.sections.map(i=>re(i)).join("")}
          ${ne(t)}
        </div>
      </div>
      ${ce(t)}
      <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar">☰</button>
      <div class="sidebar-overlay" id="sidebar-overlay"></div>
    </div>
  `,fe(),ye(),me(t)}function oe(e){return`
    <header class="essay-header">
      <a href="#/" class="about-back-link">← Back to essays</a>
      <div class="essay-chapter-label">A Mnemonic Medium Essay</div>
      <h1 class="essay-title">${e.meta.title}</h1>
      <p class="essay-author">
        ${e.meta.subtitle}<br>
        <span style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-top: 4px; display: inline-block;">
          Presented in a <a href="#/about">mnemonic medium</a> which makes it almost effortless to remember what you read
        </span>
      </p>
    </header>
  `}function ne(e){const t=g(e.getCardIds());return`
    <div style="margin-top: var(--space-4xl); padding-top: var(--space-2xl); border-top: 1px solid rgba(0,0,0,0.08); text-align: center;">
      <h2 style="font-family: var(--font-serif); font-size: var(--font-size-xl); margin-bottom: var(--space-md);">You've read the essay</h2>
      <p style="font-family: var(--font-sans); font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-xl); max-width: 480px; margin-left: auto; margin-right: auto;">
        You've encountered ${e.meta.cardCount} review cards. The spaced-repetition schedule will begin tracking them.
        Come back for review sessions to lock these ideas into long-term memory.
      </p>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        ${t.dueNow>0?`<a href="#/review/${e.id}" class="btn btn-primary">Review ${t.dueNow} due cards</a>`:""}
        <a href="#/" class="btn btn-secondary">← Back to home</a>
        <button class="btn btn-secondary" id="reset-essay-btn" style="font-size: var(--font-size-xs); color: var(--color-forgot);">
          ↻ Reset progress for this essay
        </button>
      </div>
    </div>
  `}function re(e){return`
    <section class="essay-section" id="section-${e.id}">
      <h2 class="essay-section-heading">${e.heading}</h2>
      ${e.content.map(t=>z(t)).join("")}
    </section>
  `}function z(e){switch(e.type){case"paragraph":return`<p class="essay-paragraph">${e.text}</p>`;case"heading":return`<h2 class="essay-section-heading">${e.text}</h2>`;case"subheading":return`<h3 class="essay-subsection-heading">${e.text}</h3>`;case"blockquote":return`<blockquote class="essay-blockquote">${e.text}</blockquote>`;case"list":return`<ul class="essay-list">${e.items.map(t=>`<li>${t}</li>`).join("")}</ul>`;case"red-flag":return`
        <div class="red-flag">
          <div class="red-flag-label">🚩 ${e.label}</div>
          <div class="red-flag-text">${e.text}</div>
        </div>
      `;case"cards":return de(e.cards);default:return""}}function de(e){return`
    <div class="review-card-set">
      <div class="review-card-header">
        <div class="review-card-header-label">
          <span style="font-size: 1.1em;">🧠</span> Review Cards
        </div>
        <div class="review-card-counter">${e.length} question${e.length>1?"s":""}</div>
      </div>
      ${e.map((t,s)=>le(t,s,e.length)).join("")}
    </div>
  `}function le(e,t,s){const i=B(e.id),a=i?W(i.intervalMillis):"in-text",o=i?I(i.intervalMillis):0;return`
    <div class="review-card ${i&&i.reviewCount>0?"reviewed":""}" data-card-id="${e.id}">
      <div class="review-card-question">${e.question}</div>
      <div class="review-card-answer-area" data-card-id="${e.id}">
        <div class="review-card-answer-hidden" data-action="reveal">
          Click anywhere to reveal answer
        </div>
      </div>
      <div class="review-card-answer-content" style="display: none;" data-card-id="${e.id}">
        <div class="review-card-answer-text review-card-answer-revealed">${e.answer}</div>
        <div class="review-card-feedback">
          <button class="btn-feedback btn-forgot" data-card-id="${e.id}" data-outcome="forgotten">
            <span class="icon">↻</span> Didn't remember
          </button>
          <button class="btn-feedback btn-remembered" data-card-id="${e.id}" data-outcome="remembered">
            <span class="icon">✓</span> Remembered
          </button>
        </div>
      </div>
      <div class="review-card-level">
        ${N(o)}
        <span style="margin-left: 4px;">${a}</span>
      </div>
    </div>
  `}function N(e){let t="";for(let s=0;s<G;s++)t+=`<span class="dot ${s<=e?"filled":"empty"}"></span>`;return t}function ce(e){const t=g(e.getCardIds());return`
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-brand-icon">M</div>
        <div class="sidebar-brand-text">Mnemonic</div>
      </div>

      <div class="sidebar-essay-title">${e.meta.title}</div>

      <ul class="sidebar-toc">
        ${e.sections.map(s=>`
          <li class="sidebar-toc-item">
            <a href="#section-${s.id}" class="sidebar-toc-link" data-section="${s.id}">
              ${s.heading}
            </a>
          </li>
        `).join("")}
      </ul>

      <div class="sidebar-retention">
        <div class="sidebar-retention-title">Memory Schedule</div>
        ${D(e)}
      </div>

      <div class="sidebar-stats">
        <div class="stat-row">
          <span class="stat-label">Cards seen</span>
          <span class="stat-value">${t.reviewed} / ${t.totalCards}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Mastered</span>
          <span class="stat-value">${t.mastered}</span>
        </div>
        ${t.dueNow>0?`
          <div class="stat-row" style="margin-top: var(--space-md);">
            <a href="#/review/${e.id}" style="color: var(--color-primary-light); text-decoration: none; font-size: var(--font-size-xs); font-weight: 600;">
              🔔 ${t.dueNow} cards due for review →
            </a>
          </div>
        `:""}
      </div>

      ${h.length>1?`
        <div style="margin-top: var(--space-xl); padding-top: var(--space-lg); border-top: 1px solid rgba(255,255,255,0.08);">
          <div class="sidebar-retention-title">Other Essays</div>
          ${h.filter(s=>s.id!==e.id).map(s=>`
            <a href="#/essay/${s.id}" class="sidebar-toc-link" style="display: block; margin-bottom: 4px;">
              ${s.meta.title}
            </a>
          `).join("")}
        </div>
      `:""}
    </aside>
  `}function D(e){const t=g(e.getCardIds()),s=[{x:20,y:110,label:"in-text"},{x:60,y:95,label:"5 days"},{x:110,y:72,label:"3 weeks"},{x:160,y:42,label:"3 months"},{x:220,y:15,label:"long-term"}],i=s.map((n,d)=>`${d===0?"M":"L"} ${n.x} ${n.y}`).join(" "),a=e.getCardIds();let o=0,r=0;for(const n of a){const d=B(n);d&&d.reviewCount>0&&(o+=I(d.intervalMillis),r++)}o=r>0?Math.round(o/r):0;const l=s[Math.min(o,s.length-1)];return`
    <svg class="retention-curve-svg" viewBox="0 0 240 130">
      <line x1="20" y1="110" x2="220" y2="110" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
      <line x1="20" y1="72" x2="220" y2="72" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="4" />
      <line x1="20" y1="42" x2="220" y2="42" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="4" />
      <path d="${i}" fill="none" stroke="rgba(99, 102, 241, 0.4)" stroke-width="2" stroke-linecap="round" />
      <path d="${i} L 220 110 L 20 110 Z" fill="rgba(99, 102, 241, 0.06)" />
      ${s.map((n,d)=>`
        <circle cx="${n.x}" cy="${n.y}" r="${d===o?6:3.5}" 
          class="retention-dot ${d===o?"active":""}"
          fill="${d<=o?"#818cf8":"rgba(255,255,255,0.15)"}" />
      `).join("")}
      ${s.map(n=>`
        <text x="${n.x}" y="126" class="retention-label" text-anchor="middle">${n.label}</text>
      `).join("")}
      ${r>0?`
        <text x="${l.x}" y="${l.y-12}" class="retention-label" text-anchor="middle" fill="#f59e0b" font-weight="600" font-size="8">
          ${t.reviewed} cards
        </text>
      `:`
        <text x="120" y="70" class="retention-label" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="10">
          Start reading to begin
        </text>
      `}
    </svg>
  `}function he(e){let t,s;if(e){const n=L(e);if(!n){se("#/");return}t=n.getCardIds(),s=n.getCards().map(d=>({...d,essayId:n.id,essayTitle:n.meta.title})),n.meta.title}else t=R(),s=_();const i=K(t);if(i.length===0){u.innerHTML=`
      <div class="review-session animate-fade-in">
        <div class="review-complete">
          <div class="review-complete-icon">🎉</div>
          <h1 class="review-complete-title">All caught up!</h1>
          <p class="review-complete-stats">No cards are due right now. Come back later to review.</p>
          <a href="#/" class="btn btn-primary">← Back to home</a>
        </div>
      </div>
    `;return}const a=i.map(n=>s.find(d=>d.id===n.id)).filter(Boolean);let o=0,r={remembered:0,forgotten:0};function l(){if(o>=a.length){ue(r,a.length,e);return}const n=a[o],d=o/a.length*100,b=n.essayTitle?`from "${n.sectionHeading}" • ${n.essayTitle}`:`from "${n.sectionHeading}"`,m=document.querySelector(".review-session-card-wrapper"),p=document.querySelector(".review-session-progress-fill"),x=document.querySelector(".review-session-subtitle");if(p&&(p.style.width=`${d}%`),x&&(x.textContent=`Card ${o+1} of ${a.length} • ${b}`),m){m.innerHTML=`
        <div class="review-card animate-fade-in" data-card-id="${n.id}">
          <div class="review-card-question">${n.question}</div>
          <div class="review-card-answer-area review-session-answer" data-card-id="${n.id}">
            <div class="review-card-answer-hidden" data-action="reveal">
              Click anywhere to reveal answer
            </div>
          </div>
          <div class="review-card-answer-content" style="display: none;" data-card-id="${n.id}">
            <div class="review-card-answer-text review-card-answer-revealed">${n.answer}</div>
            <div class="review-card-feedback">
              <button class="btn-feedback btn-forgot review-btn" data-outcome="forgotten">
                <span class="icon">↻</span> Didn't remember
              </button>
              <button class="btn-feedback btn-remembered review-btn" data-outcome="remembered">
                <span class="icon">✓</span> Remembered
              </button>
            </div>
          </div>
        </div>
      `;const $=m.querySelector(".review-session-answer"),P=m.querySelector(".review-card-answer-content");$&&$.addEventListener("click",()=>{$.style.display="none",P.style.display="block"}),m.querySelectorAll(".review-btn").forEach(E=>{E.addEventListener("click",()=>{const S=E.dataset.outcome;j(n.id,S),S===v.Remembered?r.remembered++:r.forgotten++,o++,l()})})}}u.innerHTML=`
    <div class="review-session animate-fade-in">
      <div class="review-session-header">
        <a href="#/" class="about-back-link" style="justify-content: center; margin-bottom: var(--space-lg);">← Back to home</a>
        <h1 class="review-session-title">Review Session</h1>
        <p class="review-session-subtitle">Card 1 of ${a.length}</p>
      </div>
      <div class="review-session-progress">
        <div class="review-session-progress-fill" style="width: 0%"></div>
      </div>
      <div class="review-session-card-wrapper"></div>
    </div>
  `,l()}function ue(e,t,s){u.innerHTML=`
    <div class="review-session animate-fade-in">
      <div class="review-complete">
        <div class="review-complete-icon">✨</div>
        <h1 class="review-complete-title">Review Complete!</h1>
        <p class="review-complete-stats">
          You reviewed ${t} cards.<br>
          <span style="color: var(--color-remembered);">✓ ${e.remembered} remembered</span>
          ${e.forgotten>0?`<span style="margin-left: 12px; color: var(--color-forgot);">↻ ${e.forgotten} need more practice</span>`:""}
        </p>
        <p style="font-family: var(--font-sans); font-size: var(--font-size-xs); color: var(--color-text-muted); margin-bottom: var(--space-xl); max-width: 400px;">
          Cards you remembered have been promoted to the next level of the spaced-repetition schedule. 
          They'll come back for review at longer intervals, strengthening your long-term memory.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          ${s?`<a href="#/essay/${s}" class="btn btn-primary">Continue reading</a>`:""}
          <a href="#/" class="btn btn-secondary">← Home</a>
        </div>
      </div>
    </div>
  `}function pe(){u.innerHTML=`
    <div class="about-page animate-fade-in">
      <a href="#/" class="about-back-link">← Back to essays</a>
      <header class="essay-header">
        <div class="essay-chapter-label">Understanding the Medium</div>
        <h1 class="essay-title">${y.title}</h1>
        <p class="essay-author">${y.subtitle}</p>
      </header>
      ${y.content.map(e=>z(e)).join("")}
      <div style="margin-top: var(--space-3xl); padding-top: var(--space-xl); border-top: 1px solid rgba(0,0,0,0.08); text-align: center;">
        <a href="#/essay/${h[0]?.id}" class="btn btn-primary">Start reading the essay →</a>
      </div>
    </div>
  `}function me(e){document.addEventListener("click",function(s){const i=s.target.closest('[data-action="reveal"]');if(i){const r=i.closest(".review-card-answer-area"),n=i.closest(".review-card").querySelector(".review-card-answer-content");r&&n&&(r.style.display="none",n.style.display="block")}const a=s.target.closest(".btn-feedback[data-card-id]");if(a){const r=a.dataset.cardId,l=a.dataset.outcome,n=j(r,l),d=a.closest(".review-card");if(d){const b=d.querySelector(".review-card-level");if(b){const p=I(n.intervalMillis),x=W(n.intervalMillis);b.innerHTML=N(p)+`<span style="margin-left: 4px;">${x}</span>`}d.style.transition="all 0.3s ease",l===v.Remembered?(d.style.borderLeft="3px solid var(--color-remembered)",setTimeout(()=>{d.style.opacity="0.6"},300)):d.style.borderLeft="3px solid var(--color-forgot)",d.querySelectorAll(".btn-feedback").forEach(p=>{p.disabled=!0,p.style.opacity="0.4"})}ge(e)}s.target.closest("#reset-essay-btn")&&e&&confirm(`Reset all progress for "${e.meta.title}"? This will clear your spaced-repetition schedules for this essay. You'll start over with all ${e.meta.cardCount} cards.`)&&(Q(e.getCardIds()),w())})}function ge(e){const t=g(e.getCardIds()),s=document.querySelector(".sidebar-stats");s&&(s.innerHTML=`
      <div class="stat-row">
        <span class="stat-label">Cards seen</span>
        <span class="stat-value">${t.reviewed} / ${t.totalCards}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Mastered</span>
        <span class="stat-value">${t.mastered}</span>
      </div>
      ${t.dueNow>0?`
        <div class="stat-row" style="margin-top: var(--space-md);">
          <a href="#/review/${e.id}" style="color: var(--color-primary-light); text-decoration: none; font-size: var(--font-size-xs); font-weight: 600;">
            🔔 ${t.dueNow} cards due for review →
          </a>
        </div>
      `:""}
    `);const i=document.querySelector(".sidebar-retention");i&&(i.innerHTML=`
      <div class="sidebar-retention-title">Memory Schedule</div>
      ${D(e)}
    `)}function fe(){const e=document.getElementById("sidebar-toggle"),t=document.getElementById("sidebar"),s=document.getElementById("sidebar-overlay");e&&t&&e.addEventListener("click",()=>{t.classList.toggle("open"),s.classList.toggle("active")}),s&&s.addEventListener("click",()=>{t.classList.remove("open"),s.classList.remove("active")})}function ye(){const e=document.querySelectorAll(".essay-section"),t=document.querySelectorAll(".sidebar-toc-link");function s(){let i="";const a=window.scrollY+120;e.forEach(o=>{o.offsetTop<=a&&(i=o.id.replace("section-",""))}),t.forEach(o=>{o.classList.toggle("active",o.dataset.section===i)})}window.addEventListener("scroll",s,{passive:!0}),s(),t.forEach(i=>{i.addEventListener("click",a=>{a.preventDefault();const o=document.getElementById(`section-${i.dataset.section}`);o&&o.scrollIntoView({behavior:"smooth",block:"start"}),document.getElementById("sidebar")?.classList.remove("open"),document.getElementById("sidebar-overlay")?.classList.remove("active")})})}w();
