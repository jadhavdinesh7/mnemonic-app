# A Philosophy of Software Design — mnemonic edition

> **Source:** A Philosophy of Software Design, John Ousterhout
> **Goal:** design simpler software at work

## How to read this
Read normally. Try each "Before you read" guess in your head first. At each card, try to answer before opening it. Don't try to memorize — answering the cards and reviewing them later is enough.

## S1. The Fight Against Complexity

*Before you read:* What makes one program "complex" and another "simple" — is it size?

All of software design comes down to one fight: the fight against **complexity**. Ousterhout argues that "the greatest limitation in writing software is our ability to understand the systems we are creating." There are two broad ways to fight back: **eliminate** complexity by making code simpler and more obvious, and **encapsulate** it — hide it inside independent pieces. That second approach is called **modular design**.

He defines the enemy precisely. **Complexity is anything about the structure of a system that makes it hard to understand and change.** It is *not* about size: a tiny program can be deeply complex, and a huge one can be simple. And complexity is judged by the reader, not the author — if others find your code confusing, it is complex, even if it feels clear to you.

**In short:** Complexity is whatever makes a system hard to understand and change — and readers, not writers, are the judge.

#### Try to recall — S1

> [!card] posd-S1-01 | definition | recall | - | - | 2.1 "hard to understand and modify the system"
> **Q:** How does Ousterhout define complexity?
> <details><summary>Answer</summary>
>
> Anything about a system's structure that makes it hard to understand and change.
>
> </details>
>
> **V1:** In one phrase, what counts as "complexity" in this book?

> [!card] posd-S1-02 | concept | recall | contrast | - | 2.1 "small and unsophisticated system to be quite complex"
> **Q:** A 200-line module with tangled flags vs a clean 5,000-line one — which is more complex, and why?
> <details><summary>Answer</summary>
>
> The small one. Complexity is about how hard it is to understand and change, not size.
>
> </details>
>
> **V1:** Can a tiny program be more complex than a large one?

> [!card] posd-S1-03 | concept | recall | contrast | - | 2.1 "more apparent to readers than writers"
> **Q:** Your code feels simple to you, but teammates find it confusing. Who decides if it's complex?
> <details><summary>Answer</summary>
>
> They do. Complexity is more apparent to readers than writers — their confusion is the real signal.
>
> </details>
>
> **V1:** Is "it's obvious to me" a good defense against a complexity complaint?

> [!card] posd-S1-04 | concept | recall | mechanism | - | 1 "making code simpler and more obvious"
> **Q:** What are Ousterhout's two general approaches to fighting complexity?
> <details><summary>Answer</summary>
>
> Eliminate it (make code simpler and more obvious) and encapsulate it (modular design).
>
> </details>
>
> **V1:** Besides making code simpler, what is the other way to fight complexity?

*Reflect:* Where in your current project do small "simple" pieces of code feel hardest to change?

## S2. The Three Symptoms of Complexity

*Before you read:* How would you *notice* that a codebase has become complex?

Complexity shows itself in three ways. **Change amplification:** a seemingly simple change requires edits in many different places. **Cognitive load:** how much a developer must hold in their head to finish a task. **Unknown unknowns:** it is not even obvious what you need to know or change — the most dangerous kind, because you only discover the problem when a bug appears later. Change amplification is annoying but visible; cognitive load is heavy but known; unknown unknowns are silent.

**In short:** Complexity appears as change amplification, cognitive load, and the worst one — unknown unknowns.

#### Try to recall — S2

> [!card] posd-S2-01 | list | recall | - | - | 2.2 "Change amplification"
> **Q:** Name the three symptoms of complexity: change amplification, ____, and unknown unknowns.
> <details><summary>Answer</summary>
>
> Cognitive load.
>
> </details>
>
> **V1:** The three symptoms are change amplification, unknown unknowns, and what third one?

> [!card] posd-S2-02 | definition | recall | - | - | 2.2 "code modifications in many different places"
> **Q:** What is "change amplification"?
> <details><summary>Answer</summary>
>
> When a small change forces code edits in many different places.
>
> </details>
>
> **V1:** You change one color and must edit fifty files. Which symptom is that?

> [!card] posd-S2-03 | definition | recall | - | - | 2.2 "how much a developer needs to know"
> **Q:** What does "cognitive load" measure?
> <details><summary>Answer</summary>
>
> How much a developer needs to know to complete a task.
>
> </details>
>
> **V1:** A function that makes the caller remember to free memory increases what?

> [!card] posd-S2-04 | concept | recall | mechanism | - | 2.2 "unknown unknowns are the worst"
> **Q:** Why are "unknown unknowns" the worst symptom of complexity?
> <details><summary>Answer</summary>
>
> You don't know what you must change or know, so you only find out when a bug appears.
>
> </details>
>
> **V1:** Which symptom can't even be seen until something breaks, and why?

> [!card] posd-S2-05 | concept | recall | contrast | - | 2.2 "Change amplification is annoying"
> **Q:** A change is tedious across many files but you can see exactly which ones. Which symptom — and why not "unknown unknowns"?
> <details><summary>Answer</summary>
>
> Change amplification. It's visible and clear; unknown unknowns are hidden until they bite.
>
> </details>
>
> **V1:** How is change amplification less dangerous than unknown unknowns?

*Reflect:* Which of the three symptoms slows you down most in your own work?

## S3. The Two Causes — and Why Complexity Creeps In

*Before you read:* If those are the symptoms, what actually *causes* complexity?

Complexity has exactly two causes: **dependencies** and **obscurity**. A **dependency** exists when a piece of code cannot be understood or changed on its own — it relates to other code that must be considered or changed too. **Obscurity** is when important information is not obvious — a vague name like `time`, or an undocumented rule. The mapping is neat: dependencies cause change amplification and cognitive load; obscurity creates unknown unknowns. And complexity is **incremental** — it accumulates in lots of small chunks, each one looking harmless, until the system is a swamp. That is why good design needs a "zero tolerance" attitude.

**In short:** Complexity is caused by dependencies and obscurity, piling up in tiny harmless-looking steps.

#### Try to recall — S3

> [!card] posd-S3-01 | list | recall | - | - | 2.3 "dependencies and obscurity"
> **Q:** What are the two causes of complexity?
> <details><summary>Answer</summary>
>
> Dependencies and obscurity.
>
> </details>
>
> **V1:** Complexity comes from obscurity and what other root cause?

> [!card] posd-S3-02 | definition | recall | - | - | 2.3 "cannot be understood and modified in isolation"
> **Q:** What is a "dependency" in Ousterhout's sense?
> <details><summary>Answer</summary>
>
> When code can't be understood or changed on its own because it ties to other code.
>
> </details>
>
> **V1:** Sender and receiver code that must change together is an example of what?

> [!card] posd-S3-03 | concept | recall | contrast | - | 2.3 "important information is not obvious"
> **Q:** What is "obscurity", and how is it different from a dependency?
> <details><summary>Answer</summary>
>
> Obscurity is when important information isn't obvious. A dependency links code; obscurity hides information.
>
> </details>
>
> **V1:** A variable named `time` with no units shown — which cause of complexity is that?

> [!card] posd-S3-04 | concept | recall | mechanism | - | 2.3 "Dependencies lead to change amplification"
> **Q:** Which symptoms do dependencies cause, and which does obscurity cause?
> <details><summary>Answer</summary>
>
> Dependencies cause change amplification and cognitive load; obscurity creates unknown unknowns.
>
> </details>
>
> **V1:** Unknown unknowns come mainly from which of the two causes?

> [!card] posd-S3-05 | concept | recall | mechanism | - | 2.4 "accumulates in lots of small chunks"
> **Q:** Why does Ousterhout say complexity is "incremental", and what attitude does that demand?
> <details><summary>Answer</summary>
>
> It builds up from many tiny, harmless-looking bits, so you need a zero-tolerance attitude.
>
> </details>
>
> **V1:** Why isn't "just one small hack" actually harmless?

*Reflect:* What is one "small hack" in your codebase you've been telling yourself is harmless?

## S4. Working Code Isn't Enough

*Before you read:* Is code that passes all tests "good enough"? Why might that not be true?

Ousterhout contrasts two mindsets. **Tactical** programming: your main focus is to get something working — ship the feature, fix the bug, hit the deadline. It feels productive but quietly adds complexity with every shortcut. (The extreme is the **tactical tornado**: someone who produces code fast but leaves a mess others must clean up.) **Strategic** programming: your primary goal is to produce a *great design* that also happens to work. It takes an investment mindset — he suggests spending about 10–20% of your development time improving the design. That investment slows you slightly now and pays back later, because clean systems stay fast to change.

**In short:** Don't just make it work — invest ~10–20% in good design, or complexity wins over time.

#### Try to recall — S4

> [!card] posd-S4-01 | definition | recall | - | - | 3.1 "get something working"
> **Q:** What is the main goal of a "tactical" programmer?
> <details><summary>Answer</summary>
>
> Just to get something working quickly; design comes second.
>
> </details>
>
> **V1:** "A small kludge here to hit the deadline" — which mindset is that?

> [!card] posd-S4-02 | concept | recall | contrast | - | 3.2 "produce a great design"
> **Q:** In "strategic" programming, what is the primary goal — and how does it differ from tactical?
> <details><summary>Answer</summary>
>
> To produce a great design that also works. Tactical settles for merely working.
>
> </details>
>
> **V1:** What does a strategic programmer aim for beyond "it works"?

> [!card] posd-S4-03 | fact | recall | - | - | 3.3 "your total development time on investments"
> **Q:** How much development time does Ousterhout suggest investing in design?
> <details><summary>Answer</summary>
>
> About 10–20%, spread out as small continuous investments.
>
> </details>
>
> **V1:** What fraction of your time should go to ongoing design improvement?

> [!card] posd-S4-04 | concept | recall | failure | - | 3.1 "tactical tornado"
> **Q:** What is a "tactical tornado"?
> <details><summary>Answer</summary>
>
> A prolific coder who ships fast but leaves a mess others must clean up.
>
> </details>
>
> **V1:** Who looks like a hero for shipping fast but creates work for everyone after?

*Reflect:* Where could you spend 10–20% more time on design this week without missing your deadline?

## S5. Modules Should Be Deep

*Before you read:* What makes a class or function genuinely *good* to use?

Every module (a class, function, or service) has two parts: an **interface** (everything you must know to use it) and an **implementation** (how it does its job). A module is a good **abstraction** — a simplified view that omits unimportant details. A **deep** module provides powerful functionality through a simple interface: lots of benefit, little cost. The classic example is Unix file I/O — five basic system calls hide a huge implementation. A **shallow** module is the opposite: its interface is about as complex as what it provides, so it hides almost nothing. Ousterhout warns against **classitis** — the belief that more, smaller classes are always better, which piles up interface complexity. Java's I/O (FileInputStream → BufferedInputStream → ObjectInputStream just to read a file) is his shallow counter-example.

**In short:** The best modules are deep — a simple interface hiding powerful functionality; shallow modules and "classitis" do the reverse.

#### Try to recall — S5

> [!card] posd-S5-01 | definition | recall | parts | - | 4.1 "an interface and an implementation"
> **Q:** What are the two parts of any module?
> <details><summary>Answer</summary>
>
> Its interface (what you must know to use it) and its implementation (how it works).
>
> </details>
>
> **V1:** A module is divided into which two parts?

> [!card] posd-S5-02 | concept | recall | mechanism | - | 4.4 "powerful functionality yet have simple interfaces"
> **Q:** What makes a module "deep"?
> <details><summary>Answer</summary>
>
> A simple interface that hides powerful functionality — much benefit for little cost.
>
> </details>
>
> **V1:** Five tiny calls hiding 100,000 lines — what kind of module is that?

> [!card] posd-S5-03 | concept | recall | contrast | - | 4.5 "interface is relatively complex in comparison"
> **Q:** What is a "shallow" module, and why doesn't it help fight complexity?
> <details><summary>Answer</summary>
>
> Its interface is nearly as complex as what it does, so it hides almost nothing.
>
> </details>
>
> **V1:** Why is a class whose interface is as big as its behavior unhelpful?

> [!card] posd-S5-04 | definition | recall | - | - | 4.3 "simplified view of an entity"
> **Q:** What is an abstraction, and when is it a "false" abstraction?
> <details><summary>Answer</summary>
>
> A simplified view that omits unimportant details; false when it hides details that actually matter.
>
> </details>
>
> **V1:** An abstraction that leaves out something important is called what?

> [!card] posd-S5-05 | concept | recall | failure | - | 4.6 "classes are good, so more classes are better"
> **Q:** What is "classitis", and why is it harmful?
> <details><summary>Answer</summary>
>
> The wrong belief that more, smaller classes are always better; their interfaces pile up complexity.
>
> </details>
>
> **V1:** What disease does "classes are good, so more classes are better" describe?

> [!card] posd-S5-06 | concept | recall | contrast | - | 4.4 "five basic system calls for I/O"
> **Q:** Unix I/O uses 5 calls; Java needs three wrapped classes to read a file. Which is deeper, and why?
> <details><summary>Answer</summary>
>
> Unix — a tiny interface hiding huge complexity. Java's I/O is shallow: complex interface, little hidden.
>
> </details>
>
> **V1:** Which is the deep design — Unix's five calls or Java's stream wrappers?

*Reflect:* Which module in your code has an interface almost as complicated as what it does?

## S6. Information Hiding and Leakage

*Before you read:* If deep modules are the goal, what is the main technique for making one?

**Information hiding** is the main way to get deep modules: each module hides its design decisions inside its implementation, so they never appear in the interface. Because those decisions stay hidden, the interface gets simpler — and "simpler interfaces tend to correlate with better information hiding." The opposite is **information leakage**: a design decision is reflected in multiple modules, so changing it means editing several places. One common cause is **temporal decomposition** — structuring code around the *order* things happen (read, then modify, then write) instead of around units of knowledge, which spreads one decision across many pieces.

**In short:** Hide each design decision inside one module; when a decision shows up in several modules, that's leakage.

#### Try to recall — S6

> [!card] posd-S6-01 | concept | recall | mechanism | - | 5.1 "Information hiding and deep modules are closely related"
> **Q:** How does information hiding make a module deeper?
> <details><summary>Answer</summary>
>
> It keeps design decisions out of the interface, so the interface stays simple while the module does a lot.
>
> </details>
>
> **V1:** Why is information hiding the main technique for deep modules?

> [!card] posd-S6-02 | definition | recall | - | - | 5.2 "design decision is reflected in multiple modules"
> **Q:** What is "information leakage"?
> <details><summary>Answer</summary>
>
> When one design decision shows up in several modules, so a change forces edits in all of them.
>
> </details>
>
> **V1:** Two classes both know a file's format. What design problem is that?

> [!card] posd-S6-03 | concept | recall | contrast | - | 5.1 "simpler interfaces tend to correlate with better information hiding"
> **Q:** Information hiding vs information leakage — state the difference in one line.
> <details><summary>Answer</summary>
>
> Hiding keeps a decision inside one module; leakage spreads the same decision across several.
>
> </details>
>
> **V1:** What is the opposite of information hiding?

> [!card] posd-S6-04 | concept | recall | failure | - | 5.3 "Temporal decomposition"
> **Q:** What is "temporal decomposition", and why does it cause leakage?
> <details><summary>Answer</summary>
>
> Structuring code by the order of operations instead of by knowledge; one decision then spreads across the steps.
>
> </details>
>
> **V1:** Splitting code into read / modify / write classes risks which problem?

*Reflect:* Which design decision in your code is currently known by more than one module?

## S7. General-Purpose Modules Are Deeper

*Before you read:* Should you build a module for exactly today's need, or for every possible future need?

Ousterhout's answer is the middle: make modules **somewhat general-purpose**. The functionality should reflect your *current* needs, but the *interface* should be general enough to support more than one use. The surprising result is that a general-purpose interface is usually *simpler* (and so deeper) than a special-purpose one, because it offers a few powerful operations instead of many specific ones. To find the sweet spot he asks questions like "What is the simplest interface that will cover all my current needs?" And generality pays a bonus: it leads to better information hiding, because special-purpose knowledge is pushed up to the caller where it belongs.

**In short:** Build for today's needs but with a general interface — it ends up simpler, deeper, and hides more.

#### Try to recall — S7

> [!card] posd-S7-01 | definition | recall | - | - | 6.1 "functionality should reflect your current needs"
> **Q:** What does "somewhat general-purpose" mean?
> <details><summary>Answer</summary>
>
> Implement for today's needs, but make the interface general enough to support other uses.
>
> </details>
>
> **V1:** Where should a module be specific (functionality) and where general (interface)?

> [!card] posd-S7-02 | concept | recall | mechanism | - | 6.1 "somewhat general-purpose fashion"
> **Q:** Why is a general-purpose interface often simpler and deeper than a special-purpose one?
> <details><summary>Answer</summary>
>
> It offers a few powerful operations instead of many specific ones, so the interface is smaller.
>
> </details>
>
> **V1:** Replacing backspace/delete/deleteSelection with one delete(start,end) — why is that deeper?

> [!card] posd-S7-03 | concept | recall | mechanism | - | 6.4 "Generality leads to better information hiding"
> **Q:** How does making a module more general-purpose improve information hiding?
> <details><summary>Answer</summary>
>
> Special-purpose knowledge moves up to the caller, so the module hides more inside.
>
> </details>
>
> **V1:** Why does pushing special-case knowledge to the caller help hiding?

> [!card] posd-S7-04 | procedure | recall | - | - | 6.1 "simplest interface that will cover all my current needs"
> **Q:** What question does Ousterhout ask to find the right amount of generality?
> <details><summary>Answer</summary>
>
> "What is the simplest interface that will cover all my current needs?"
>
> </details>
>
> **V1:** Name one test for whether an interface is general enough but not too general.

*Reflect:* Which special-purpose method in your code could become one simpler general operation?

## S8. Different Layer, Different Abstraction

*Before you read:* If two layers of your system look almost the same, is that good design?

In a well-designed system, **different layers provide different abstractions**. If adjacent layers have the *same* abstraction, that's a red flag — the layers aren't earning their keep. The classic symptom is a **pass-through method**: a method that does almost nothing except pass its arguments to another method, usually with the same signature. Pass-through methods add interface (one more thing to learn) without adding functionality, so they make modules shallower. The fix is to give each layer a genuinely different job, or to remove the redundant layer.

**In short:** Each layer should add a new abstraction; a method that just forwards its arguments is a warning sign.

#### Try to recall — S8

> [!card] posd-S8-01 | concept | recall | mechanism | - | 7 "Different Layer, Different Abstraction"
> **Q:** What should adjacent layers of a system provide, and what's the warning sign?
> <details><summary>Answer</summary>
>
> Different abstractions. If two adjacent layers have the same abstraction, that's a red flag.
>
> </details>
>
> **V1:** Two stacked layers with the same abstraction — what does that signal?

> [!card] posd-S8-02 | definition | recall | - | - | 7 "pass its arguments to another"
> **Q:** What is a "pass-through method"?
> <details><summary>Answer</summary>
>
> A method that does little but pass its arguments on to another method with nearly the same signature.
>
> </details>
>
> **V1:** A method whose whole body just calls another method with the same args is called what?

> [!card] posd-S8-03 | concept | recall | contrast | - | 7 "pass-through method"
> **Q:** Why does a pass-through method make a module shallower, not deeper?
> <details><summary>Answer</summary>
>
> It adds interface to learn but no new functionality — cost without benefit, the opposite of depth.
>
> </details>
>
> **V1:** How is a pass-through method the opposite of a deep module?

*Reflect:* Is there a layer in your code that just forwards calls without adding anything?

## S9. Pull Complexity Downwards

*Before you read:* When some complexity is unavoidable, who should bear it — the module or its users?

When complexity must exist somewhere, **pull it downwards**: handle it inside the module's implementation rather than exposing it through the interface. The reason is leverage — a module has many users but few developers, so it's better for one developer to absorb the complexity than for every user to. A good way to express the whole idea: "it is more important for a module to have a simple interface than a simple implementation." A common violation is **configuration parameters** — instead of the module deciding a sensible value, it pushes the decision up to every user. Better to compute a reasonable default; if a module can adjust itself, that "is better than exposing configuration parameters." Like all rules, this one can be taken too far, so use discretion.

**In short:** Absorb complexity inside the module so users don't pay for it — a simple interface beats a simple implementation.

#### Try to recall — S9

> [!card] posd-S9-01 | definition | recall | - | - | 8 "Pull Complexity Downwards"
> **Q:** What does "pull complexity downwards" mean?
> <details><summary>Answer</summary>
>
> Handle unavoidable complexity inside the module's implementation instead of exposing it in the interface.
>
> </details>
>
> **V1:** Where should you put complexity that has to exist somewhere?

> [!card] posd-S9-02 | concept | recall | mechanism | - | 8 "simple interface than a simple implementation"
> **Q:** Why is it worth making the implementation harder to keep the interface simple?
> <details><summary>Answer</summary>
>
> A module has many users but few developers; one developer's pain saves every user's.
>
> </details>
>
> **V1:** Simple interface or simple implementation — which matters more, and why?

> [!card] posd-S9-03 | concept | recall | failure | - | 8 "better than exposing configuration parameters"
> **Q:** Why are configuration parameters often a sign of pushing complexity the wrong way?
> <details><summary>Answer</summary>
>
> They make every user decide a value the module should figure out itself; a sensible default is better.
>
> </details>
>
> **V1:** A network library exposes a retry-timeout parameter. What's the better design?

> [!card] posd-S9-04 | concept | recall | contrast | - | 8 "can easily be overdone"
> **Q:** Can pulling complexity downward be taken too far?
> <details><summary>Answer</summary>
>
> Yes. Use discretion — cramming every hard case into one module can bloat it. Balance, not extremes.
>
> </details>
>
> **V1:** What's the limit on pulling complexity down?

*Reflect:* Which config option in your code could be replaced by a sensible automatic default?

## Glossary

| term | plain English |
|------|---------------|
| complexity | anything that makes a system hard to understand or change |
| change amplification | one small change forces edits in many places |
| cognitive load | how much you must keep in your head to do a task |
| unknown unknowns | you don't even know what you need to know or change |
| dependency | code that can't be understood or changed on its own |
| obscurity | important information that isn't obvious |
| interface | everything you must know to use a module |
| deep module | simple interface hiding powerful functionality |
| shallow module | interface almost as complex as what it does |
| classitis | the mistaken belief that more, smaller classes are always better |
| information hiding | hiding a module's design decisions inside its implementation |
| information leakage | one design decision showing up in several modules |
| temporal decomposition | structuring code by order of operations instead of knowledge |
| general-purpose module | built for today's need but with a general interface |
| pass-through method | a method that just forwards its arguments to another |
| configuration parameter | a setting pushed onto the user instead of decided by the module |
